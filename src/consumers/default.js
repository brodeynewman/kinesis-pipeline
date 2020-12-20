import debug from 'debug';

const log = debug('consumers:default');

export const compute = (event) => {
  log('Received event...');

  event.Records.forEach((record) => {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii');

    log('Decoded payload:', payload);
  });
};
