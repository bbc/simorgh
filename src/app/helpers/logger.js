// Node.js logger utility using winston
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, label, printf, simple, timestamp } = format;

const LOGGING_LEVEL = 'info';
const LOGGING_FILE = 'app.log';
let LOGGING_DIR = '/var/log/simorgh/';

LOGGING_DIR = process.env.SIMORGH_LOGGING_DIR || LOGGING_DIR;

if (!fs.existsSync(LOGGING_DIR)) {
  fs.mkdirSync(LOGGING_DIR);
}

// prettier-ignore
const fileTransport = new (transports.File)({
  filename: path.join(LOGGING_DIR, LOGGING_FILE),
  handleExceptions: true,
  humanReadableUnhandledException: true,
  json: false, // plain text logs
  level: LOGGING_LEVEL,
});

// prettier-ignore
const consoleTransport = new (transports.Console)({
  handleExceptions: true,
  humanReadableUnhandledException: true,
  level: LOGGING_LEVEL,
  timestamp: true,
});

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
    transports: [fileTransport, consoleTransport],
  });

module.exports = logger;
