"use strict";

const morgan = require("morgan"),
  bodyParser = require("body-parser");

module.exports = function(app) {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
