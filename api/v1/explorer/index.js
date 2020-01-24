const express = require('express');
const controller = require('./controller');

const router = express.Router();

/**
 * @api {get} /
 * @apiName ListExplorers
 * @apiVersion 1.0.0
 * @apiGroup Explorer
 * @apiSuccess (Success 200) {Array} Array of explorers stats.
 * @apiError 400 A problem occured.
 */
router.get('/', controller.ListExplorers);

/**
 * @api {get} /ready
 * @apiName listFinishedExplorers
 * @apiVersion 1.0.0
 * @apiGroup Explorer
 * @apiSuccess (Success 200) {Array} Array containing only fully synced and 'ready' explorers stats.
 * @apiError 400 A problem occured.
 */
router.get('/ready', controller.listFinishedExplorers);

module.exports = router;