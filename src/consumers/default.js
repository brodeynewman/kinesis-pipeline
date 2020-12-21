import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';

import Events from '../db/events';

const log = debug('api:consumers:default');

export const compute = (event) => {
  log('Received event...');

  Promise.map(event.Records, async (record) => {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii');

    const insert = {
      ...payload,
      id: uuidv4(),
    };

    log('Decoded payload: %o', insert);

    const eventRecord = await Events.create(insert);

    log('Created event record: %o', eventRecord);
  });
};
