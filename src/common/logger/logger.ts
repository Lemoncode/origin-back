import { createLogger, LoggerOptions } from 'winston';
import Transport from 'winston-transport';
import { console } from './logger.transports';

let transportList: Transport[] = [console];

const options: LoggerOptions = {
  transports: transportList,
  exitOnError: false,
};

export const logger = createLogger(options);
