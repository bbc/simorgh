// Node.js logger utility using winston
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, label, printf, simple, timestamp } = format;

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_FILE = 'app.log';
const LOG_DIR = process.env.LOG_DIR || 'log';

const createLogDirectory = (dirName = 'log') => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

const logLocation = path.join(LOG_DIR, LOG_FILE);

// prettier-ignore
const fileTransport = new (transports.File)({
  filename: logLocation,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  json: true,
  level: LOG_LEVEL,
  maxFiles: 5,
  maxsize: 104857600, // 100MB
  tailable: true
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

const logToFile = callingFile => {
  createLogDirectory(LOG_DIR);

  return createLogger({
    format: combine(
      label({ label: folderAndFilename(callingFile) }),
      simple(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      customFormatting,
    ),
    transports: [fileTransport, consoleTransport],
  });
};

const logEventMessage = (event, message) => {
  const logObject = {
    event,
    message,
  };

  return JSON.stringify(logObject, null, 2);
};

class Logger {
  constructor(callingFile) {
    const fileLogger = logToFile(callingFile);

    this.error = (event, message) => {
      fileLogger.error(logEventMessage(event, message));
    };

    this.warn = (event, message) => {
      fileLogger.warn(logEventMessage(event, message));
    };

    this.info = (event, message) => {
      fileLogger.info(logEventMessage(event, message));
    };

    this.debug = (event, message) => {
      fileLogger.debug(logEventMessage(event, message));
    };

    this.verbose = (event, message) => {
      fileLogger.log(logEventMessage(event, message));
    };
  }
}

const logger = callingFile => new Logger(callingFile);

module.exports = logger;
