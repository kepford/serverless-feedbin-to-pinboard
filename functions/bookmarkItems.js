'use strict';

const feedbinRequest = require('./../utils/feedbinRequest.js');
const createBookmark = require('./../utils/createBookmark.js');
const unstarFeedbin = require('./../utils/unstarFeedbin.js');

module.exports.bookmarkItems = (event, context, callback) => {

  // Event source is SQS queue.
  // Batch size is 1.
  const ids = event.Records[0].body;
  const entryContent = feedbinRequest('https://api.feedbin.com/v2/entries/' + ids + '.json');
  entryContent.then(res => res.json())
    .then(item => {
      const options = {
        description: item.title,
        url: item.url,
        toread: process.env.hasOwnProperty('PINBOARD_TOREAD') ? process.env.PINBOARD_TOREAD : 'no',
        tags: process.env.hasOwnProperty('PINBOARD_TAGS') ? process.env.PINBOARD_TAGS : '',
        shared: process.env.hasOwnProperty('PINBOARD_SHARED') ? process.env.PINBOARD_SHARED : 'no'
      };
      const bookmark = createBookmark(options, item.id);
      bookmark.then(pbRes => {

        //Unstar if the bookmark was created.
        if (pbRes.result_code === 'done') {
          const unstar = unstarFeedbin({
            starred_entries: [pbRes.id]
          });
          unstar.then(fbRes => {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                message: `Created bookmark and unstared Item: ${fbRes.id}`
              })
            });
          });

        }
        else {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              message: `Response code ${pbRes.result_code} for Feedbin ID: ${pbRes.id}`
            })
          });
        }
      });
      return item;
    });
};
