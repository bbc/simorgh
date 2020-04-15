/* eslint-disable no-console */

class Logger {
  constructor() {
    this.error = (arg) => console.error(`error - ${arg}`);
    this.warn = (arg) => console.warn(`warn - ${arg}`);
    this.info = (arg) => console.info(`info - ${arg}`);
    this.verbose = (arg) => console.log(`verbose - ${arg}`);
    this.debug = (arg) => console.debug(`debug - ${arg}`);
    this.silly = (arg) => console.log(`silly - ${arg}`);
  }
}

const logger = () => new Logger();

module.exports = logger;
