
const express = require('express');
const db = require('../../lib/db');
const logger = require('../../config/logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const status = await db.getPools();
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
  }
});

router.get('/ready', async (req, res) => {
  try {
    const dbObjects = await db.getPools();
    const status = dbObjects.filter(statusObj => statusObj.status === 'finished')
    return res.status(200).json(status);
  }
  catch(e) {
    logger.error(e);
  }
});

module.exports = router;