import fs from 'fs';
import handleError from '../helpers/handleError';

import { inputFileEncoding } from '../../config.json';

const parseJson = (path) => {
  const file = fs.readFileSync(path, inputFileEncoding);

  try {
    return JSON.parse(file);
  } catch (error) {
    handleError(error);
  }

  return null;
};

export default parseJson;
