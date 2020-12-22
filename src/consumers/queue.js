import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';

import Event from '../db/events';

const log = debug('api:consumers:default');

export const compute = async (event) => {
  log('Received event...');

  await Promise.map(event.Records, async (record) => {
    const parsed = JSON.parse(record.body);

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
