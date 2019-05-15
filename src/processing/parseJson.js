import fs from 'fs';
import handleError from '../helpers/handleError';
import Logger, { LogMessage } from '../helpers/Logger';
import config from '../helpers/config';

const parseJson = (path) => {
  Logger.log(new LogMessage(`Reading file (path: '${path}').`));

  const { inputFileEncoding } = config;
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
