import Logger from './Logger';
import LogMessage from './LogMessage';

import config from '../config';
import args from '../arguments';

const LoggerInstance = new Logger(args.logging, config.logFile, config.logLevel);

export {
  LoggerInstance as default,
  LogMessage,
};
