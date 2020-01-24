const redis = require('redis');
const Promise = require('bluebird');
const config = require('../config/');
const logger = require('../config/logger');

Promise.promisifyAll(redis.RedisClient.prototype);
const client = redis.createClient();

client.on('connect', function() {
  logger.info('Redis client connected');
});

client.on('error', function (err) {
  logger.error(err.message);
  process.exit(0);
});

const setValue = (key, value) => {
  return client.hmsetAsync(key, value);
}

const getExplorers = async () => {
  try {
    const services = await Promise.map(config.insightInstances, async (service) => {
      return client.hgetallAsync(service.url).then(value => {
        if (!value) return Promise.reject('key has no value saved!');
        return value;        
      });
    })
    return services;
  } catch(e){
    return e;
  }
}

const getDWS = async () => {
  try {
    const services = await Promise.map(config.DWSInstances, async (service) => {
      return client.hgetallAsync(service.url).then(value => {
        if (!value) return Promise.reject('key has no value saved!');
        return value;        
      });
    })
    return services;
  } catch(e){
    return e;
  }
}

const getPools = async () => {
  try {
    const services = await Promise.map(config.poolInstances, async (service) => {
      return client.hgetallAsync(service.url).then(value => {
        if (!value) return Promise.reject('key has no value saved!');
        return value;
      });
    })
    return services;
  } catch(e){
    return e;
  }  
}

module.exports = {
  client,
  getDWS,
  getExplorers,
  getPools,
  setValue
}