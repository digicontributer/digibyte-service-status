const express = require('express');
const controller = require('./controller');

const router = express.Router();

/**
 * @api {get} /
 * @apiName ListPools
 * @apiVersion 1.0.0
 * @apiGroup Pool
 * @apiSuccess (Success 200) {Array} Array of pool stats.
 * @apiError 400 A problem occured.
 */
router.get('/', controller.ListPools);

/**
 * @api {get} /ready
 * @apiName listFinishedPools
 * @apiVersion 1.0.0
 * @apiGroup Pool
 * @apiSuccess (Success 200) {Array} Array containing only fully synced and 'ready' pool stats.
 * @apiError 400 A problem occured.
 */
router.get('/ready', controller.listFinishedPools);

module.exports = router;