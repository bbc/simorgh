// Node.js logger utility using winston
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const {
  combine,
  printf,
  simple,
  timestamp,
  metadata,
  label,
  json,
  colorize,
  prettyPrint,
} = format;

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_FILE = 'app.log';
const LOG_DIR = process.env.LOG_DIR || 'log';
const LOG_TO_CONSOLE = process.env.LOG_TO_CONSOLE === 'true';
const PLATFORM = process.env.NEXTJS ? 'NEXTJS' : 'EXPRESS';

const createLogDirectory = (dirName = 'log') => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

const logLocation = path.join(LOG_DIR, LOG_FILE);

const consoleLogFormat = printf(data => {
  const logMessage = { ...data.metadata, ...data.message };

  return `${data.timestamp} ${data.level} ${JSON.stringify(logMessage)}`;
});

const expressFormatOptions = [prettyPrint(), colorize(), consoleLogFormat];

const nextJSFormatOptions = [json()];

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
    format:
      PLATFORM === 'NEXTJS'
        ? combine(...nextJSFormatOptions)
        : combine(...expressFormatOptions),
  },
};

// e.g. outputs 'Article/index.jsx'
const folderAndFilename = name => {
  const fileparts = name.split(path.sep);
  return fileparts.splice(-2).join(path.sep);
};

const fileLogger = createLogger({
  format: format.combine(
    simple(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),

    label({
      label: PLATFORM,
    }),

    // creates a metadata object, that uses our custom formatting
    metadata({
      fillExcept: ['timestamp', 'level', 'message'],
    }),
  ),
  transports: [
    // handle a lot of traffic, so we only enable console output in some environments
    ...(LOG_TO_CONSOLE
      ? [new transports.Console(loggerOptions.console)]
      : [new transports.File(loggerOptions.file)]),
  ],
});

class Logger {
  constructor(callingFile) {
    if (!LOG_TO_CONSOLE) {
      createLogDirectory(LOG_DIR);
    }

    const file = folderAndFilename(callingFile);

    this.error = (event, message) => {
      fileLogger.error({ file, event, message });
    };

    this.warn = (event, message) => {
      fileLogger.warn({ file, event, message });
    };

    this.info = (event, message) => {
      fileLogger.info({ file, event, message });
    };

    this.debug = (event, message) => {
      fileLogger.debug({ file, event, message });
    };

    this.verbose = (event, message) => {
      fileLogger.log({ file, event, message });
    };
  }
}

const logger = callingFile => new Logger(callingFile);

module.exports = logger;
