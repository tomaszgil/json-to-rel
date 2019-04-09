import { generatedAttributeName } from '../../config.json';

const preprocess = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key]) || typeof processed[key] === 'object') {
      processed[key] = preprocess(processed[key]);
    } else if (Array.isArray(processed)) {
      const value = processed[key];

      processed[key] = {};
      processed[key][generatedAttributeName] = value;
    }
  });

  return processed;
};

export default preprocess;
