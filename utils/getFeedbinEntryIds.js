'use strict';

const config = require('./../.env.js');
const feedbinRequest = require('./feedbinRequest.js');

// Returns a list of IDs
module.exports = () => {
  return feedbinRequest(config.feedbin.url);
};
