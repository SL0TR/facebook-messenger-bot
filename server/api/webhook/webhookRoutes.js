"use strict";

const router = require("express").Router();
const controller = require("./webhookController");

router
  .route("/")
  .get(controller.get)
  .post(controller.post);

module.exports = router;
