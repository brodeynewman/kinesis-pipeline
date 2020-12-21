import { v4 as uuidv4 } from 'uuid';
import dynamoose from 'dynamoose';

import constants from '../constants';

/**
 * Schema for below table
 */
const Schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: [uuidv4()],
  },
  payload: {
    type: Object,
  },
}, { timestamps: true });

/**
 * Table definition
 */
export default dynamoose.model(constants.EVENT_TABLE_NAME, Schema);
