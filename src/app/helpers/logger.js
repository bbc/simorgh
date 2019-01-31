// Node.js logger utility using winston
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, label, printf, simple, timestamp } = format;

const LOG_LEVEL = 'debug';
const LOG_FILE = 'app.log';
let LOG_DIR = 'log';

console.log(process.env);

LOG_DIR = process.env.SIMORGH_LOG_DIR || LOG_DIR;

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const logLocation = path.join(LOG_DIR, LOG_FILE);
console.log(`Application outputting logs to file ${logLocation}`);

// prettier-ignore
const fileTransport = new (transports.File)({
  filename: logLocation,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  json: true,
  level: LOG_LEVEL,
  maxFiles: 1,
  maxsize: 104857600, // 100MB
});

// prettier-ignore
const consoleTransport = new (transports.Console)({
  handleExceptions: true,
  humanReadableUnhandledException: true,
  level: LOG_LEVEL,
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
