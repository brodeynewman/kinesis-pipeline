import uuid from 'uuid';
import dynamoose from 'dynamoose';

import constants from '../constants';

/**
 * Schema for below table
 */
const Schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: [uuid.v4()],
  },
  payload: {
    type: Object,
  },
}, { timestamps: true });

/**
 * Table definition
 */
export default dynamoose.model(constants.EVENT_TABLE_NAME, Schema);
