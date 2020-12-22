import debug from 'debug';

import constants from '../constants';
import transports from '../transports';

const { queue } = transports;
const { DDB_WRITE_QUEUE } = constants;

const log = debug('api:consumers:sqs');

export const compute = async (event) => {
  log('Received event...');

  await Promise.map(event.Records, async (record) => {
    log('Stream event: %s', record.kinesis.data);

    const formatted = Buffer.from(record.kinesis.data, 'base64').toString();

    const processed = await queue.transport({
      payload: formatted,
      name: DDB_WRITE_QUEUE,
    });

    log('Created stream record: %o', processed);
  });
};
