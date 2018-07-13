'use strict';

const request = require('request-promise');
const config = require('./../.env.js');

// Returns a list of IDs
module.exports = (url) => {
  return request({
    'auth': {
      'user': config.feedbin.username,
      'pass': config.feedbin.password,
      'sendImmediately': false
    },
    method: 'GET',
    url: url
  });
};
