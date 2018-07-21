# Serverless: Feedbin Content to Pinboard Bookmark

## Purpose

Provide a reliable service that will look at a [Feedbin.com](https://feedbin.com/) account for starred articles and create bookmarks on the user's [Pinboard.in](https://pinboard.in) account.

## What it does

### 1. Get Feedbin item IDs from a feed such as starred

[Feedbin API docs](https://github.com/feedbin/feedbin-api)

Feedbin will give us an array of IDs. We can then use this to fetch each one.

[Get starred entry IDs](https://github.com/feedbin/feedbin-api/blob/master/content/starred-entries.md)

### 2. Get individual Feedbin items

[Get entries](https://github.com/feedbin/feedbin-api/blob/master/content/entries.md)

**Feedbin Content:**

```
[
  {
    "id": 2077,
    "feed_id": 135,
    "title": "Objective-C Runtime Releases",
    "url": "http:\/\/mjtsai.com\/blog\/2013\/02\/02\/objective-c-runtime-releases\/",
    "author": "Michael Tsai",
    "content": "<p><a href=\"https:\/\/twitter.com\/bavarious\/status\/297851496945577984\">Bavarious<\/a> created a <a href=\"https:\/\/github.com\/bavarious\/objc4\/commits\/master\">GitHub repository<\/a> that shows the differences between versions of <a href=\"http:\/\/www.opensource.apple.com\/source\/objc4\/\">Apple\u2019s Objective-C runtime<\/a> that shipped with different versions of Mac OS X.<\/p>",
    "summary": "Bavarious created a GitHub repository that shows the differences between versions of Apple\u2019s Objective-C runtime that shipped with different versions of Mac OS X.",
    "published": "2013-02-03T01:00:19.000000Z",
    "created_at": "2013-02-04T01:00:19.127893Z"
  }
]
```

### 3. Create Pinboard bookmarks

[Pinboard API](https://pinboard.in/api/)

Supported options for bookmarking
```
options = {
  description: 'The title of the bookmark',
  url: 'http://github.com',
  toread: 'yes',
  tags: 'devtools, git',
  shared: 'yes'
};
```

### 4. Unstar or delete starred Feedbin entries

If we successfully bookmark an item we want to unstar it in Feedbin.

[Delete starred entries](https://github.com/feedbin/feedbin-api/blob/master/content/starred-entries.md#delete-starred-entries-unstar)

This project uses the [Serverless framework](https://serverless.com).
You can get started by following this [guide](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

## Setup

You will need to following things set up before you can contribute to this project.

1. An AWS account.
2. The AWS CLI installed. [Guide](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
3. Create an AWS user. [Guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


### Install correct version of Node

`nvm use`

Install all the things

`npm install`

## AWS CLI

For convenience install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).
Then configure your new CLI by following [this guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

## Environment variables

Copy the `example.env.js` to a new file named `.env.js` and add your own settings there.

## Local development

Run `npm run sls offline start`

## Testing Locally

`npm run sls -- invoke -f functionName -l`

## Watching Log for a Function

`npm run sls -- logs -f hello -s dev -t`
Tail the logs on dev for function named hello.


## Deployment

### Deploy all project code

`npm run sls -- deploy`

### Deploy one function

`npm run sls -- deploy -f functionName -s dev`
Deploys the function named functionName to the dev environment.


### Deploy to specific environments

The default environment we use is dev so if you wanted to deploy to prod environment you would do `-s prod`.

`npm run sls -- deploy -s prod`
