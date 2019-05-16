import Logger from './Logger';
import LogMessage from './LogMessage';

import config from '../config';
import args from '../arguments';

const { logFile } = config;
const LoggerInstance = new Logger(args.logging, logFile);

export {
  LoggerInstance as default,
  LogMessage,
};
