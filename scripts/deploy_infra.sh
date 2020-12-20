#!/bin/bash

STACK_NAME=event-ingestion
env=${2:-dev}
file="$(pwd)/cloudformation/resources.yml"

echo "--- Running cloudformation file: [${file}] for env: [${env}] ---"

aws cloudformation deploy --no-fail-on-empty-changeset \
  --template-file ${file} \
  --stack-name ${STACK_NAME}-resources-${env} \
  --parameter-overrides Environment=${env}