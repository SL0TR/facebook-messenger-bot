"use strict";

const router = require('express').Router();
const controller = require('./rootController');


router.route('/')
  .get(controller.get)

module.exports = router;
