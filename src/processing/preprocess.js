import isObject from '../helpers/isObject';

import { generatedAttributeName } from '../../config.json';

const preprocess = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key]) || isObject(processed[key])) {
      processed[key] = preprocess(processed[key]);
    } else if (Array.isArray(processed)) {
      processed[key] = {
        [generatedAttributeName]: processed[key],
      };
    }
  });

  return processed;
};

export default preprocess;
