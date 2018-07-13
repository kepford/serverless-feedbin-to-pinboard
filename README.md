# Serverless SQS Example

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

## Local development

Run `npm run serverless offline start`

## Testing Locally

`npm run serverless -- invoke -f functionName -l`

## Watching Log for a Function

`npm run serverless -- logs -f hello -s dev -t`
Tail the logs on dev for function named hello.


## Deployment

### Deploy all project code

`npm run serverless -- deploy`

### Deploy one function

`npm run serverless -- deploy -f functionName -s dev`
Deploys the function named functionName to the dev environment.


### Deploy to specific environments

The default environment we use is dev so if you wanted to deploy to prod environment you would do `-s prod`.

`npm run serverless -- deploy -s prod`

## Testing

Simulate a form post which is what we are doing in jQuery when a user views a page.

*Note: using [HTTPie](https://httpie.org/) in these examples. You could use curl or Postman if you like.*
*Note: You will need to update the URL to be the current one you are testing.*


## Functions

### Get Feedbin item IDs

### Get Feedbin items

`http http://localhost:3000/item ids=[1791355545,1791612624,1791690671,1791783191]`

### Create Pinboard bookmarks

```
http http://localhost:3000/bookmark url='https://github.com/kepford/serverless-feedbin-to-pinboard' \
    description='kepford/serverless-feedbin-to-pinboard' \
    extended='A Serverless project for creating bookmarks from a Feedbin feed.' \
    tags='serverless,node-pinboard,test' toread='yes' shared='yes'
```

### Unstar Feedbin items
