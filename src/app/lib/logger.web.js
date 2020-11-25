/* eslint-disable no-console */

class Logger {
  constructor() {
    this.error = (event, message) => console.error({ event, message });
    this.warn = () => () => {};
    this.info = () => () => {};
    this.verbose = () => () => {};
    this.debug = () => () => {};
    this.silly = () => () => {};
  }
}

const logger = () => new Logger();

module.exports = logger;
