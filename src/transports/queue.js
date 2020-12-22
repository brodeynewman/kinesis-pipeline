import AWS from 'aws-sdk';
import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';

import { throwHttpBadRequest } from '../utils';

const log = debug('api:transport:sqs');

const adapter = new AWS.SQS();

const buildParams = ({ url, payload }) => ({
  MessageGroupId: 'event-ingestion',
  MessageDeduplicationId: uuidv4(),
  MessageBody: payload,
  QueueUrl: url,
});

const putRecord = data => adapter.sendMessage(data).promise();

const transport = async (data) => {
  const { name, payload } = data;

  log('Getting url for queue: %o', name);

  const { QueueUrl: url } = await adapter.getQueueUrl({ QueueName: name }).promise();

  const body = buildParams({ payload, url });

  log('Pushing to queue: [%s] with body: %o', url, body);

  return putRecord(body).catch((e) => {
    // log this so datadog / sentry or whatever can collect this info
    log(e.message);

    // throw valid http response code
    throwHttpBadRequest(e.message);
  });
};

// export adapter interface
export default {
  transport,
};
