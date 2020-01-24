const express = require('express');
const app = require('./config/express');
const config = require('./config/');
const cron = require('./lib/cron').cron;
const db = require('./lib/db');
const logger = require('./config/logger');

// listen to requests and start the cron process
app.listen(config.expressPort, () => {
  logger.info(`DigiByte Service Status has started on Port: ${config.expressPort}.`);
  cron().catch(err => logger.error(err));
});

/**
* Exports express
* @public
*/
module.exports = app;