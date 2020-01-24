const db = require('../../../lib/db');
const logger = require('../../../config/logger');

const ListDWS = async (req, res) => {
  try {
    const status = await db.getDWS();
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
    return res.status(400).send("An Error Occurred!");
  }
}

const listFinishedDWS = async (req, res) => {
  try {
    const dbObjects = await db.getDWS();
    const status = dbObjects.filter(statusObj => statusObj.status === 'finished')
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
    return res.status(400).send("An Error Occurred!");
  }
}

module.exports = {
  ListDWS,
  listFinishedDWS
}