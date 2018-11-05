"use strict";

const config = require('./server/config/config');
const app = require('./server/server');

// Sets server port and logs message on success
app.listen(config.port, () =>
  console.log(`Server is listening on port ${config.port}`)
);
