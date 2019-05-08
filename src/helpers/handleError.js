import Logger, { LogMessage } from './Logger';

const handleError = (error) => {
  Logger.log(new LogMessage(error.message));
  process.exit(1);
};

export default handleError;
