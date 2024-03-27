// logger.ts
import pino, { LoggerOptions } from 'pino';
const loggerOptions: pino.LoggerOptions = {
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty'
  },
};

const logger = pino(loggerOptions);

export default logger;
