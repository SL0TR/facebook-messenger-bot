"use strict";

const logger = require("../util/logger");

module.exports = function() {
  // eslint-disable-next-line no-unused-vars
  return function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send("Oops");
  };
};
