const preprocess = (json) => {
  const processed = json;

  Object.keys(processed).forEach((key) => {
    if (Array.isArray(processed[key]) || typeof processed[key] === 'object') {
      processed[key] = preprocess(processed[key]);
    } else if (Array.isArray(processed)) {
      processed[key] = {
        value: processed[key],
      };
    }
  });

  return processed;
};

export default preprocess;
