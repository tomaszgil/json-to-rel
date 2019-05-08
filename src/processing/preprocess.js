import isObject from '../helpers/isObject';
import Logger, { LogMessage } from '../helpers/Logger';
import { generatedAttributeName } from '../../config.json';

const handleSimpleTypes = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key]) || isObject(processed[key])) {
      processed[key] = handleSimpleTypes(processed[key]);
    } else if (Array.isArray(processed)) {
      processed[key] = {
        [generatedAttributeName]: processed[key],
      };
    }
  });

  return processed;
};

const flattenArrays = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key])) {
      processed[key] = [].concat(...processed[key]);
    }

    if (Array.isArray(processed[key]) || isObject(processed[key])) {
      processed[key] = flattenArrays(processed[key]);
    }
  });

  return processed;
};

const deleteEmptyArrays = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key]) && processed[key].length === 0) {
      delete processed[key];
      return;
    }

    if (Array.isArray(processed[key]) || isObject(processed[key])) {
      processed[key] = deleteEmptyArrays(processed[key]);
    }
  });

  return processed;
};

const preprocess = (json) => {
  let preprocessedJson = json;

  Logger.log(new LogMessage('Preprocessing json object.'));

  preprocessedJson = handleSimpleTypes(preprocessedJson);
  preprocessedJson = flattenArrays(preprocessedJson);
  preprocessedJson = deleteEmptyArrays(preprocessedJson);

  return preprocessedJson;
};

export default preprocess;
