import fp from 'lodash/fp';
import AWS from 'aws-sdk';
import debug from 'debug';

import constants from '../constants';
import { throwHttpBadRequest } from '../utils';

const log = debug('api:transport:stream');

const { AVAILABLE_STREAMS } = constants;

const adapter = new AWS.Kinesis();

const validateTransport = (data) => {
  const { stream } = data;

  log('Validating transport body...');

  if (!AVAILABLE_STREAMS[stream]) {
    throwHttpBadRequest(`Stream: [${stream}] is not in avaible stream list.`);
  }
};

const stringBuffer = fp.compose(
  Buffer.from,
  JSON.stringify,
);

const buildParams = ({ stream, payload }) => ({
  PartitionKey: stream,
  StreamName: stream,
  Data: stringBuffer(payload),
});

const putRecord = data => adapter.putRecord(data).promise();

const transport = async (data) => {
  const { stream } = data;

  validateTransport(data);

  const body = buildParams(data);

  log('Pushing to stream: [%s]', stream);

  await putRecord(body);
};

// export adapter interface
export default {
  transport,
};
