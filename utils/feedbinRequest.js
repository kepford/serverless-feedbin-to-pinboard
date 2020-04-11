'use strict';

const fetch = require('node-fetch');
const username = process.env.FEEDBIN_USERNAME;
const password = process.env.FEEDBIN_PASSWORD;

// Returns a list of IDs
module.exports = (url, method, body) => {
  const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
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
