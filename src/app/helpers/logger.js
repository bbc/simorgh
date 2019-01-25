// Node.js logger utility
const winston = require('winston');

const { format } = winston;
const { combine, printf, timestamp } = format;

const LOGGING_LEVEL = 'error';
const LOGGING_FILE = 'app.log';
let LOGGING_DIR = '/var/log/simorgh/';
let transport;

const customFormatting = printf(
  data => `${data.timestamp} level=${data.level} message=${data.message}`,
);

if (process.env.SIMORGH_LOGGING_TYPE === 'file') {
  LOGGING_DIR = process.env.SIMORGH_LOGGING_DIR || LOGGING_DIR;
  // prettier-ignore
  transport = new (winston.transports.File)({ 
    filename: LOGGING_DIR + LOGGING_FILE,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false, // plain text logs
    level: LOGGING_LEVEL,
  });
} else {
  // prettier-ignore
  transport = new (winston.transports.Console)({ 
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: LOGGING_LEVEL,
    timestamp: true,
  });
}

const logger = winston.createLogger({
  format: combine(timestamp(), customFormatting),
  transports: [transport],
});

module.exports = logger;
