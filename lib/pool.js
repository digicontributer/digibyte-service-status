const Promise = require('bluebird');
const API = require('./api');
const poolInstances = require('../config/').poolInstances;

/**
 * DigiHash doesnt not currently have a 'Status' endpoint so we justs check that we get a 200 response from stats
 */
const getPoolStatus = async (url) => {
  const statusPath = 'api/stats';
  try {
    return await { ...API.getRequest(`${url}/${statusPath}`), status: 'finished' };
  } catch (e) {
    return e;
  }
};

/**
 * Gets the sync status of All Pool services
 */
const getAllPoolStatus = async (url) => {
  try {
    return await Promise.all(poolInstances, async (pool) => {
      return { ...pool, ...await getPoolStatus(pool.url) };
    });
  } catch(e) {
    return e;
  }
}

module.exports = {
  getAllPoolStatus,
  getPoolStatus
}