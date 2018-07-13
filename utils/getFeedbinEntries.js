'use strict';

const feedbinRequest = require('./feedbinRequest.js');

module.exports = entries => {

  // Create array of promises.
  // feedbinPromises uses Request promise.
  const feedbinPromises = entries.map(entry => feedbinRequest('https://api.feedbin.com/v2/entries/' + entry + '.json'));

  // Return when all of the promises are all resolved.
  return Promise.all(feedbinPromises);
};

