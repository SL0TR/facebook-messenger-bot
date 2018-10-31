var router = require('express').Router();
var controller = require('./rootController');


router.route('/')
  .get(controller.get)

module.exports = router;
