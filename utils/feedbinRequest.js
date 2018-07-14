'use strict';

const request = require('request-promise');
const config = require('./../.env.js');

// Returns a list of IDs
module.exports = (url, method, body) => {
  method = method || 'GET';
  body = JSON.stringify(body) || null;
  return request({
    'auth': {
      'user': config.feedbin.username,
      'pass': config.feedbin.password,
      'sendImmediately': false
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method,
    url,
    body
  });
};
