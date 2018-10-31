var router = require('express').Router();
var controller = require('./webhookController');


router.route('/')
  .get(controller.get)
  .post(controller.post)

module.exports = router;
