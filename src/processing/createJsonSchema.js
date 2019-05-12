import generateSchema from 'json-schema-generator';
import Logger, { LogMessage } from '../helpers/Logger';

const createJsonSchema = (obj) => {
  Logger.log(new LogMessage('Creating json schema.'));
  return generateSchema(obj);
};

export default createJsonSchema;
