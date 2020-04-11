'use strict';

const feedbinRequest = require('./feedbinRequest.js');

// Removes the star from a Feedbin entry.
module.exports = ids => {
  return feedbinRequest(process.env.FEEDBIN_URL, 'DELETE', ids);
};
