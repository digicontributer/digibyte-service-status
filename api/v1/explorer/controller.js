const db = require('../../../lib/db');
const logger = require('../../../config/logger');

const ListExplorers = async (req, res) => {
  try {
    const status = await db.getExplorers();
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
    return res.status(400).send("An Error Occurred!");
  }
}

const listFinishedExplorers = async (req, res) => {
  try {
    const dbObjects = await db.getExplorers();
    const status = dbObjects.filter(statusObj => statusObj.status === 'finished')
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
    return res.status(400).send("An Error Occurred!");
  }
}

module.exports = {
  ListExplorers,
  listFinishedExplorers
}