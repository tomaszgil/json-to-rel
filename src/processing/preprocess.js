import isObject from '../helpers/isObject';
import Logger, { LogMessage } from '../helpers/Logger';
import { generatedAttributeName } from '../../config.json';

const preprocessing = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key]) || isObject(processed[key])) {
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
