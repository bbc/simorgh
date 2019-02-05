/*
 * This file sets up the environment variables based on the value of `process.env.APP_ENV`.
 * These variables are needed at both bundle time and at run time. The variables should be
 * set up at the entry point of the application prior to bundling.
 */
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
