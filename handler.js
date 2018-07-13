'use strict';

const getFeedbinEntryIds = require('./utils/getFeedbinEntryIds.js');
const getFeedbinEntries = require('./utils/getFeedbinEntries.js');
const createBookmark = require('./utils/createBookmark.js');

module.exports.getIds = (event, context, callback) => {

  // Get entries from Feedbin.
  const contentIds = getFeedbinEntryIds(event);
  contentIds.then(entries => {
    const data = JSON.parse(entries);
    console.log('data', Object.keys(data).length);

    // TODO: Call getItem function.
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: data === Object.keys(data).length === 0 ? data : 'No results'
      })
    });
  });
};

module.exports.getItems = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const contentIds = JSON.parse(body.ids);
  const entryContent = getFeedbinEntries(contentIds);
  entryContent.then(data => {

    // Convert strings to objects.
    const items = data.map(item => JSON.parse(item));

    // TODO: Call createBookmark.
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: items
      })
    });
  }
  );
};

module.exports.createBookmark = (event, context, callback) => {
  const options = JSON.parse(event.body);
  const bookmark = createBookmark(options);
  bookmark.then(response => {

    // TODO: Call unstarItems
    response.result_code === 'done'
      ?
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Created bookmark successfully.'
        })
      })
      :
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: `No bookmark was created. Error response from Pinboard: ${response.result_code}`
        })
      });
  });
};

module.exports.unstarItems = (event, context, callback) => {

  // TODO: Implement unstar API call.
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: `Unstared Item ${event.body}`
    })
  });
};

