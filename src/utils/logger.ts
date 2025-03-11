import winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.combine(winston.format.colorize(), logFormat),
    // }),
    // new winston.transports.File({ filename: 'logs/app.log', level: 'info' }),

    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-app.log', // Logs will be saved in "logs" folder with the date in the filename
      datePattern: 'YYYY-MM-DD', // Log file name will include the date
      zippedArchive: true, // Compress old log files
      maxSize: '20m', // Max file size before rotation (e.g., 20 MB)
      maxFiles: '14d', // Keep logs for the last 14 days
      level: 'info', // Log level for file transport
    }),
  ],
});

const logInfo = (message: string) => {
  logger.info(message);
};

const logWarn = (message: string) => {
  logger.warn(message);
};

const logError = (message: string, error?: Error) => {
  if (error) {
    logger.error(`${message} - ${error.message}`);
    logger.error(error.stack);
  } else {
    logger.error(message);
  }
};

const logDebug = (message: string) => {
  logger.debug(message);
};

export { logger, logInfo, logWarn, logError, logDebug };
