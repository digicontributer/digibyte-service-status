const Promise = require('bluebird');
const db = require('./db');
const explorerCalls = require('./explorer');
const dwsCalls = require('./dws');
const poolCalls = require('./pool');
const config = require('../config/');
const mail = require('./email');


const checkAllServices = async () => {
  try {
    const actualServices = [];
    config['serviceList'].forEach(service => config[service].forEach(i => actualServices.push({...i, type: service })));
    return await Promise.map(actualServices, async (service) => {
      let status = {};

      try {
        switch (service.type) {
          case 'insightInstances':
            status = await explorerCalls.getInsightStatus(service.url);
            break;
          case 'DWSInstances':
            status = await dwsCalls.getDWSStatus(service.url);
            break;
          case 'poolInstances':
            status = await poolCalls.getPoolStatus(service.url);
            break;
        }
      } catch(e) {
        console.error(e);
      }

      return {...status, ...service };
    });

  } catch (e) {
    throw e;
  }
}

const getOfflineServices = async () => {
  try {
    return Promise.map(config.getServiceUrls(), async (url) => {
      return db.client.getAsync(url).then(JSON.Parse);
    }).filter(service => service.status !== 'finished');
  } catch (e) {
    throw e;
  }
}

const saveServiceStatus = async () => {
  try {
    const services = await checkAllServices();
    return services.forEach(service => {
      return db.setValue(service.url, service);
    });
  } catch (e) {
    throw e;
  }
}

const alertOfflineServiceMaintainers = async (service) => {
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const timeNow = Math.floor(Date.now() / 1000);
  if (service.lastSentEmail && (timeNow - service.lastSentEmail < SIX_HOURS)) {
    return null;
  }
  await mail.sendOfflineServiceEmail(service);
  service.lastSentEmail = timeNow;
  return db.setValue(service.url, service);
} 

const cron = async () => {
  try {
    await saveServiceStatus();
    const offlineServices = await getOfflineServices();
    if (config.enableEmail) {
      await Promise.each(offlineServices, service => alertOfflineServiceMaintainers(service));
    }
    const timer = setTimeout(() => {
      cron();
    }, config.cronTimer * 60 * 1000);
    return timer;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  cron, 
  checkAllServices,
  getOfflineServices,
  cron
}
