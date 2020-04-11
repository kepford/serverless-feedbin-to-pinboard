'use strict';
const AWS = require('aws-sdk');
const feedbinRequest = require('./../utils/feedbinRequest.js');
const region = process.env.REGION;
const accountId = process.env.ACCOUNTID;
const idQueue = process.env.idQueue;
const sqs = new AWS.SQS({region});
const queUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${idQueue}`;

module.exports.getIds = (event, context, callback) => {

  // Returns a list of IDs
  const contentIds = feedbinRequest(process.env.FEEDBIN_URL);
  contentIds.then(res => res.json())
    .then(ids => {
      if (ids === '[]') {
        return 'No results';
      }
      ids.map(id => {
        const params = {
          MessageBody: JSON.stringify(id),
          QueueUrl: queUrl
        };
        sqs.sendMessage(params, function(err, data) {
          if(err) {
            console.log('error:','Fail Send Message' + err);

            // ERROR with message
            context.done('error', 'ERROR Put SQS');
          }
          else{
            console.log('data:',data.MessageId);

            // SUCCESS
            context.done(null,'');
          }
        });
      });
    });
};
