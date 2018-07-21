'use strict';

const Pinboard = require('node-pinboard');
const config = require('./../.env.js');
const apiToken = config.pinboard.apiToken;
const pinboard = new Pinboard(apiToken);

module.exports = (options, id) => {
  return new Promise((resolve, reject) => {
    pinboard.add(options, function(err, res) {
      res.id = id;
      resolve(res);
      reject(err);
    });
  });
};
