# lambda-currency-exchange-sms

This a simple AWS lambda written in Node.js (>= 6.10) that allows you to monitor the exchange rate of a given currency pair and get an SMS every day (through [Twilio](https://www.twilio.com) APIs).

![Sample message received every day (Today you get 1.12 EUR for 1 GBP)](http://www.iphonefaketext.com/screens/MzM2NTA1.jpg)


## Requirements

In order to test and deploy this lambda you will need to have:

- An AWS account (and a user created in it)
- the last version of AWS CLI tool installed and configured to use your AWS account
- Node.js (version >= 6.10) and NPM installed in your machine
- Lambda-local package installed globally in your machine (optional, only for local testing)
- A Twilio *account*, an *Api Key* and a *source phone number* for SMS ([free plan](https://www.twilio.com) should be enough)


## Configuration

Before being able to test and deploy this lambda you need to provided the needed configuration.

Configuration needs to be stored in a `.env` file (you can copy a template from the `.env~SAMPLE` sample file) that will look like this:

```bash
export BUCKET=your-unique-bucket-name
export STACK_NAME=currency-exchange-lambda
export CURRENCY_FROM="GBP"
export CURRENCY_TO="EUR"
export TWILIO_ACCOUNT="abcdefghijklmnopqrstuxywz123456789"
export TWILIO_API_KEY="1234567890abcdef1234567890abcdef"
export SEND_SMS_FROM="+3530123456789"
export SEND_SMS_TO="+3530234567890"
```

Where:

 - `BUCKET`: is the name of your S3 bucket that will contain the code to be deployed to AWS Lambda
 - `STACK_NAME`: the stack name for this project as it will appear in your cloudformation console
 - `CURRENCY_FROM`: The currency code from which you want to fetch the exchanges
 - `CURRENCY_TO`: The curency code to which you want to fetch the exchanges
 - `TWILIO_ACCOUNT`: Your Twilio account id
 - `TWILIO_API_KEY`: Your Twilio api key
 - `SEND_SMS_FROM`: Your Twilio source phone number
 - `SEND_SMS_TO`: Your destination phone number


## Install dependencies

To install all the needed dependencies you simply need to run the following commands:

```bash
cd src
npm install
```


## Local testing

With [lambda-local](https://www.npmjs.com/package/lambda-local) installed and your shell in the root folder of this project, run:

```bash
source .env # will load the current configuration through env variables
lambda-local -l src/index.js -h handler -e event.json
```


## Package and Deploy

### Pre-requisites

Before being able to package and deploy the application you must have created an s3 bucket in your own account. You can do that with:

```bash
aws s3 mb "s3://your-unique-bucket-name"
```

Note: Your bucket needs to have a unique name, so you might need to spend sometime to find a unique one that works for you.

Once you have created your own bucket, be sure to update the `BUCKET` variable in your `.env` file


### Package

The **package process** will generate a zip file containing the project source code all its dependencies and it will upload it on S3. The output of this operation will be a new cloudformation template (stored in `.cloudformation`) that can be used to deploy the application in your AWS account.

To package the application you can use the `package` script contained in this project:

```bash
./package.sh
```

### Deploy

Once your app is packaged you are ready to deploy it on AWS with the `deploy` command:

```bash
./deploy
```


## License

Licensed under [MIT License](/LICENSE). © Luciano Mammino.


## Contributing

Everyone is very welcome to contribute to this repository. Feel free to [raise issues](/issues) or to [submit Pull Requests](/pulls).
