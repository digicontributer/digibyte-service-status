const db = require('../../../lib/db');
const logger = require('../../../config/logger');

const ListPools = async (req, res) => {
  try {
    const status = await db.getPools();
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
    return res.status(400).send("An Error Occurred!");
  }
}

const listFinishedPools = async (req, res) => {
  try {
    const dbObjects = await db.getPools();
    const status = dbObjects.filter(statusObj => statusObj.status === 'finished')
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
    return res.status(400).send("An Error Occurred!");
  }
}

module.exports = {
  ListPools,
  listFinishedPools
}