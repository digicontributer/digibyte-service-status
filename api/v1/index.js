const express = require('express');
const dwsRoutes = require('./dws/');
const explorerRoutes = require('./explorer/');
const poolRoutes = require('./pool/');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/dws', dwsRoutes);
router.use('/explorer', explorerRoutes);
router.use('/pool', poolRoutes);

module.exports = router;