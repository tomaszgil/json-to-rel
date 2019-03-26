import Logger from './Logger';
import LogMessage from './LogMessage';

import { logLevel, logFile } from '../../../config';
import args from '../arguments';

const LoggerInstance = new Logger(args.logging, logFile, logLevel);

export {
  LoggerInstance as default,
  LogMessage,
};
