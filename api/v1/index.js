const express = require('express');
const dwsRoutes = require('./dws.route');
const explorerRoutes = require('./explorer.route');
const poolRoutes = require('./pool.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/dws', dwsRoutes);
router.use('/explorer', explorerRoutes);
router.use('/pool', poolRoutes);

module.exports = router;