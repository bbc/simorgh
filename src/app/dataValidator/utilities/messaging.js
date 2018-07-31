const debugMode = process.env.npm_config_debugMode || false;

module.exports = {
  log: message => {
    if (debugMode) {
      console.log(message); // eslint-disable-line no-console
    }
  },
  throwError: errorMsg => {
    throw errorMsg;
  },
};
