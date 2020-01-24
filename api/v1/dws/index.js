const express = require('express');
const controller = require('./controller');

const router = express.Router();

/**
 * @api {get} /
 * @apiName ListDWS
 * @apiVersion 1
 * @apiGroup DWS
 * @apiSuccess (Success 200) {Array} Array of dws stats.
 * @apiError 400 A problem occured.
 */
router.get('/', controller.ListDWS);

/**
 * @api {get} /ready
 * @apiName listFinishedDWS
 * @apiVersion 1
 * @apiGroup DWS
 * @apiSuccess (Success 200) {Array} Array containing only fully synced and 'ready' dws stats.
 * @apiError 400 A problem occured.
 */
router.get('/ready', controller.listFinishedDWS);

module.exports = router;