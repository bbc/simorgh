/* eslint-disable no-console */

class Logger {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.error = (_event, _message) => null;
      this.warn = () => () => {};
      this.info = () => () => {};
      this.verbose = () => () => {};
      this.debug = () => () => {};
      this.silly = () => () => {};
    } else {
      this.error = (_event, _message) => null;
      this.warn = (_event, _message) => null;
      this.info = (_event, _message) => null;
      this.verbose = (_event, _message) => null;
      this.debug = (_event, _message) => null;
      this.silly = (_event, _message) => null;
    }
  }
}

const logger = () => new Logger();

module.exports = logger;
