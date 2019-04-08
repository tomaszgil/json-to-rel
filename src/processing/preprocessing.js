const preprocess = (json) => {
  for (let key in json) {
    if (Array.isArray(json[key]) || typeof(json[key]) == 'object') {
      preprocess(json[key]);
    } else if (Array.isArray(json)) {
        json[key] = {
          value: json[key]
        };
    } 
  }
}

export default preprocess;
