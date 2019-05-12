import fs from 'fs';
import handleError from '../helpers/handleError';
import Logger, { LogMessage } from '../helpers/Logger';
import { inputFileEncoding } from '../../config.json';

const parseJson = (path) => {
  Logger.log(new LogMessage(`Reading file (path: '${path}').`));
  const file = fs.readFileSync(path, inputFileEncoding);

  try {
    Logger.log(new LogMessage('Parsing file to json object.'));
    return JSON.parse(file);
  } catch (error) {
    handleError(error);
  }

  return null;
};

export default parseJson;
