'use strict';

const config = require('./../.env.js');
const feedbinRequest = require('./feedbinRequest.js');

// Removes the star from a Feedbin entry.
module.exports = ids => {
  return feedbinRequest(config.feedbin.url, 'DELETE', ids);
};
