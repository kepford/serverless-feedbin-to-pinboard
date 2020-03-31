'use strict';

const getFeedbinEntryIds = require('./utils/getFeedbinEntryIds.js');
const feedbinRequest = require('./utils/feedbinRequest.js');
const createBookmark = require('./utils/createBookmark.js');
const unstarFeedbin = require('./utils/unstarFeedbin.js');
const config = require('./.env.js');

module.exports.getIds = (event, context, callback) => {

  // Get entries from Feedbin.
  // Calls getItem lambda function.
  getFeedbinEntryIds(event, context);
};

module.exports.getItems = (event, context, callback) => {
  const ids = event.Records[0].body;
  const entryContent = feedbinRequest('https://api.feedbin.com/v2/entries/' + ids + '.json');
  entryContent.then(res => res.json())
    .then(item => {
      const options = {
        description: item.title,
        url: item.url,
        toread: config.pinboard.hasOwnProperty('toread') ? config.pinboard.toread : 'no',
        tags: config.pinboard.hasOwnProperty('tags') ? config.pinboard.tags : '',
        shared: config.pinboard.hasOwnProperty('shared') ? config.pinboard.shared : 'no'
      }
      const bookmark = createBookmark(options, item.id);
      bookmark.then(pbRes => {
        console.log('pbRes', pbRes);

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
