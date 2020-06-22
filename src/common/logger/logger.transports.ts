import { transports, format } from 'winston';
import { parseMessage } from './logger.parsers';
const { combine, timestamp, colorize, printf } = format;

export const console = new transports.Console({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `[${level}] [${timestamp}] message: ${parseMessage(message)}`;
    })
  ),
});
