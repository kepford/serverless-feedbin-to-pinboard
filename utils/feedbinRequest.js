'use strict';

const fetch = require('node-fetch');
const config = require('./../.env.js');

// Returns a list of IDs
module.exports = (url, method, body) => {
  const auth = 'Basic ' + new Buffer(config.feedbin.username + ':' + config.feedbin.password).toString('base64');
  method = method || 'GET';
  body = JSON.stringify(body) || null;
  return fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': auth
    }
  });
};
