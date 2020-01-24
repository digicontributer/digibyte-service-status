const Promise = require('bluebird');
const API = require('./api');
const poolInstances = require('../config/').poolInstances;

/**
 * DigiHash doesnt not currently have a 'Status' endpoint so we justs check that we get a 200 response from stats
 */
const getPoolStatus = async (url) => {
  const statusPath = 'api/stats';
  try {
    const response = await API.getRequest(`${url}/${statusPath}`);
    return { ...response, status: 'finished' };
  } catch (e) {
    throw e;
  }
};

/**
 * Gets the sync status of All Pool services
 */
const getAllPoolStatus = async () => {
  try {
    return await Promise.all(poolInstances, async (pool) => {
      const status = await getPoolStatus(pool.url);
      return { ...pool, ...status };
    });
  } catch(e) {
    throw e;
  }
}

module.exports = {
  getAllPoolStatus,
  getPoolStatus
}