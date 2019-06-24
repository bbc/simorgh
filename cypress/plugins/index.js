const envConfig = require('../support/config');

/* eslint-disable no-param-reassign */
module.exports = (on, config) => {
  config.baseUrl = envConfig(config.env.APP_ENV, config.env.UK).baseUrl;

  return config;
};
