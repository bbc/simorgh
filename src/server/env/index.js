// written in ES5 due to need to be used in webpack
const dotenv = require('dotenv');

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

module.exports = getEnv;
