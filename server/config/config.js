"use strict";

require("dotenv").load();

var config = {
  port: process.env.PORT,
  logging: true
};

module.exports = config;
