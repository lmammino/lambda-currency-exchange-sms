#!/usr/bin/env bash

if [ ! -f .env ]; then
  echo "ERROR: Missing configuration file `.env`"
  exit 1
fi

set -x

source .env
aws cloudformation deploy --template-file .cloudformation/packaged-template.yml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM  --parameter-overrides \
  currencyFrom="$CURRENCY_FROM" \
  currencyTo="$CURRENCY_TO" \
  twilioAccount="$TWILIO_ACCOUNT" \
  twilioApiKey="$TWILIO_API_KEY" \
  sendSmsFrom="$SEND_SMS_FROM" \
  sendSmsTo="$SEND_SMS_TO"

set +x
