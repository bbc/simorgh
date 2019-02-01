// written in ES5 due to need to be used in webpack
const dotenv = require('dotenv');

const result = dotenv.config({
  path:
    process.env.APP_ENV && process.env.APP_ENV !== 'local'
      ? `.env.${process.env.APP_ENV}`
      : '.env',
});

/*
 * return the dotenv config after 'process.env.APP_ENV' is used to define the correct `.env` file to use.
 * currently used within `webpack.config.client.js`
 */
const getEnv = () => {
  if (result.error) {
    throw result.error;
  }

  return result;
};

module.exports = getEnv;
