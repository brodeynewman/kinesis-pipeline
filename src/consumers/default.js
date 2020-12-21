import debug from 'debug';

import Events from '../db/events';

const log = debug('consumers:default');

export const compute = (event) => {
  log('Received event...');

  Promise.map(event.Records, async (record) => {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii');

    log('Decoded payload: %o', payload);

    const eventRecord = await Events.create(payload);

    log('Created event record: %o', eventRecord);
  });
};
