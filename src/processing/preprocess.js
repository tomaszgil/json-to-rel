import isObject from '../helpers/isObject';
import Logger, { LogMessage } from '../helpers/Logger';
import { generatedAttributeName } from '../../config.json';

const preprocessing = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key])) {
      processed[key] = [].concat(...processed[key]);

      if (processed[key].length === 0) {
        delete processed[key];
        return;
      }

      processed[key] = preprocessing(processed[key]);
    } else if (isObject(processed[key])) {
      processed[key] = preprocessing(processed[key]);
    } else if (Array.isArray(processed)) {
      processed[key] = {
        [generatedAttributeName]: processed[key],
      };
    }
  });

  return processed;
};

const preprocess = (json) => {
  Logger.log(new LogMessage('Preprocessing json object.'));

  return preprocessing(json);
};

export default preprocess;
