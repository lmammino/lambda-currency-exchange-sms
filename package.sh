#!/usr/bin/env bash

if [ ! -f .env ]; then
  echo "ERROR: Missing configuration file `.env`"
  exit 1
fi

set -x

source .env
mkdir -p .cloudformation

rm -f .cloudformation/src.zip

cd src
npm prune
npm install
zip -q -9 -r ../.cloudformation/src.zip .
cd ..

aws cloudformation package --template-file template.yml --s3-bucket $BUCKET --output-template-file .cloudformation/packaged-template.yml

rm -f .cloudformation/src.zip

set +x
