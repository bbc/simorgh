/* eslint-disable no-console */

class Logger {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.error = (event, message) => console.error({ event, message });
      this.warn = () => () => { };
      this.info = () => () => { };
      this.verbose = () => () => { };
      this.debug = (event, message) => console.debug({ event, message });
      this.silly = () => () => { };
    } else {
      this.error = (event, message) => console.error({ event, message });
      this.warn = (event, message) => console.warn({ event, message });
      this.info = (event, message) => console.info({ event, message });
      this.verbose = (event, message) => console.log({ event, message });
      this.debug = (event, message) => console.debug({ event, message });
      this.silly = (event, message) => console.log({ event, message });
    }
  }
}

const logger = () => new Logger();

module.exports = logger;
