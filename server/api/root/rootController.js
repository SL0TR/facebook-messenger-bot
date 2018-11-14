"use strict";

// Send static site
exports.get = (req, res) => {
  console.log("Request was made from: " + req.url);
  res.sendFile(__dirname + "/public/index.html", err => {
    if (err) {
      res.status(500).send.err;
    }
  });
};
