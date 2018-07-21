'use strict';
const AWS = require('aws-sdk');

const config = require('./../.env.js');
const feedbinRequest = require('./feedbinRequest.js');
const region = process.env.REGION;
const stage = process.env.STAGE;

// Returns a list of IDs
module.exports = () => {
  const lambda = new AWS.Lambda({
    region
  });
  const contentIds = feedbinRequest(config.feedbin.url);
  contentIds.then(ids => {
    if (ids === '[]') {
      return 'No results';
    }
    const params = {
      FunctionName: 'feedbin-to-pinboard-' + stage + '-get_items',
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify(ids)
    };

    return lambda.invoke(params, function(error, data) {
      if (error) {
        console.error(JSON.stringify(error));
        return new Error(`Error fetching content: ${JSON.stringify(error)}`);
      }
      else if (data) {
        return JSON.stringify(data);
      }
    });
  });
};
