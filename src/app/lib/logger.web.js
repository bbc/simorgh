/* eslint-disable no-console */

class Logger {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.error = (event, message) => {};
      this.warn = () => () => {};
      this.info = () => () => {};
      this.verbose = () => () => {};
      this.debug = () => () => {};
      this.silly = () => () => {};
    } else {
      this.error = (event, message) => {};
      this.warn = (event, message) => {};
      this.info = (event, message) => {};
      this.verbose = (event, message) => {};
      this.debug = (event, message) => {};
      this.silly = (event, message) => {};
    }
  }
}

const logger = () => new Logger();

module.exports = logger;
