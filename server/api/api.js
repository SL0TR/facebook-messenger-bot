var router = require('express').Router();

router.use('/', require('./root/rootRoutes'));
router.use('/webhook', require('./webhook/webhookRoutes'));

module.exports = router;
