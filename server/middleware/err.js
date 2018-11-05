"use strict";

const logger = require('../util/logger');

module.exports = function() {
  return function(err, req, res, next) {

    logger.error(err.stack);
    res.status(500).send('Oops');
  };
}