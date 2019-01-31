// written in ES5 due to need to be used in webpack
const dotenv = require('dotenv');

// A method to return the config, needed for webpack.config.client.js
const getEnv = () => {
  const result = dotenv.config({
    path:
      process.env.APP_ENV && process.env.APP_ENV !== 'local'
        ? `.env.${process.env.APP_ENV}`
        : '.env',
  });

  if (result.error) {
    throw result.error;
  }

  return result;
};

// invoke the above method on a direct import, needed for src/index.js
getEnv();

module.exports = { getEnv };
