// Node.js logger utility using winston
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const {
  combine,
  label,
  printf,
  simple,
  timestamp,
  metadata,
  json,
  colorize,
  prettyPrint,
} = format;

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_FILE = 'app.log';
const LOG_DIR = process.env.LOG_DIR || 'log';

const createLogDirectory = (dirName = 'log') => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

const logLocation = path.join(LOG_DIR, LOG_FILE);

const logFormat = printf(
  ({ timestamp, level, label: filename, message: event, metadata }) =>
    `${timestamp} ${level} [${filename}]: ${event}, metadata: ${JSON.stringify(
      metadata,
    )}`,
);

const loggerOptions = {
  file: {
    filename: logLocation,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: LOG_LEVEL,
    maxFiles: 5,
    maxsize: 104857600, // 100MB
    tailable: true,
    format: combine(json()),
  },
  console: {
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: LOG_LEVEL,
    timestamp: true,
    format: combine(prettyPrint(), colorize(), logFormat),
  },
};

// e.g. outputs 'Article/index.jsx'
const folderAndFilename = name => {
  const fileparts = name.split(path.sep);
  return fileparts.splice(-2).join(path.sep);
};

const logToFile = callingFile => {
  createLogDirectory(LOG_DIR);

  return createLogger({
    format: format.combine(
      label({ label: folderAndFilename(callingFile) }),
      simple(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),

      // creates a metadata object, that uses our custom formatting
      metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    ),
    transports: [
      new transports.File(loggerOptions.file),
      new transports.Console(loggerOptions.console),
    ],
  });
};

class Logger {
  constructor(callingFile) {
    const fileLogger = logToFile(callingFile);

    this.error = (event, message) => {
      fileLogger.error(event, message);
    };

    this.warn = (event, message) => {
      fileLogger.warn(event, message);
    };

    this.info = (event, message) => {
      fileLogger.info(event, message);
    };

    this.debug = (event, message) => {
      fileLogger.debug(event, message);
    };

    this.verbose = (event, message) => {
      fileLogger.log(event, message);
    };
  }
}

const logger = callingFile => new Logger(callingFile);

module.exports = logger;
