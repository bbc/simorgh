const envConfig = require('../support/configOld');

/* eslint-disable no-param-reassign */
module.exports = (on, configOld) => {
  configOld.baseUrl = envConfig(
    configOld.env.APP_ENV,
    configOld.env.UK,
  ).baseUrl;

  return configOld;
};
