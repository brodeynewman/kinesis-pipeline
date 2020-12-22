import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';

import Event from '../db/events';

const log = debug('api:consumers:default');

export const compute = (event) => {
  log('Received event...');

  Promise.map(event.Records, async (record) => {
    throw new Error('testing');

    const data = Buffer.from(record.kinesis.data, 'base64').toString();
    const parsed = JSON.parse(data);

    const insert = {
      payload: parsed,
      id: uuidv4(),
    };

    log('Decoded payload: %o', insert);

    const eventModel = new Event(insert);
    const eventRecord = await eventModel.save();

    log('Created event record: %o', eventRecord);
  });
};
