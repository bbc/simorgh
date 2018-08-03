const log = message => {
  const debugMode = process.env.npm_config_DEBUG_MODE || false;

  if (debugMode) {
    console.log(message); // eslint-disable-line no-console
  }
};

const throwError = errorMsg => {
  throw errorMsg;
};

module.exports = { log, throwError };
