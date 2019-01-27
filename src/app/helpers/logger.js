// Node.js logger utility
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, label, printf, simple, timestamp } = format;

const LOGGING_LEVEL = 'info';
const LOGGING_FILE = 'app.log';
let LOGGING_DIR = '/var/log/simorgh/';
let transport;

if (process.env.SIMORGH_LOGGING_TYPE === 'file') {
  LOGGING_DIR = process.env.SIMORGH_LOGGING_DIR || LOGGING_DIR;
  if (!fs.existsSync(LOGGING_DIR)) {
    fs.mkdirSync(LOGGING_DIR);
  }
  // prettier-ignore
  transport = new (transports.File)({
    filename: path.join(LOGGING_DIR, LOGGING_FILE),
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false, // plain text logs
    level: LOGGING_LEVEL,
  });
} else {
  // prettier-ignore
  transport = new (transports.Console)({
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: LOGGING_LEVEL,
    timestamp: true,
  });
}

const customFormatting = printf(
  data => `${data.timestamp} ${data.level} [${data.label}] ${data.message}`,
);

// e.g. outputs 'Article/index.jsx'
const folderAndFilename = name => {
  const fileparts = name.split(path.sep);
  return fileparts.splice(-2).join(path.sep);
};

const logger = callingFile =>
  createLogger({
    format: combine(
      label({ label: folderAndFilename(callingFile) }),
      simple(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      customFormatting,
    ),
    transports: [transport],
  });

module.exports = logger;
