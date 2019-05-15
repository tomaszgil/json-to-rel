import fs from 'fs';
import config from '../../config';
import args from './arguments';
import isObject from './isObject';

const mergeConfigs = (baseCfg, userCfg) => {
  const mergedCfg = JSON.parse(JSON.stringify(baseCfg));

  Object.keys(baseCfg).forEach((key) => {
    if ((Array.isArray(baseCfg[key]) || isObject(baseCfg[key]))
    && (Array.isArray(userCfg[key]) || isObject(userCfg[key]))) {
      mergedCfg[key] = mergeConfigs(baseCfg[key], userCfg[key]);
    } else {
      mergedCfg[key] = userCfg[key] || baseCfg[key];
    }
  });

  return mergedCfg;
};

const getConfig = () => {
  if (args.config) {
    const userConfig = JSON.parse(fs.readFileSync(args.config).toString());
    const mergedConfig = mergeConfigs(config, userConfig);

    return mergedConfig;
  }

  return config;
};

export default getConfig();
