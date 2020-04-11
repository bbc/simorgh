const config = require('../config/services');
const getAppEnv = require('./getAppEnv');

const getPaths = (service, pageType) => {
  const { environments = {} } = config[service].pageTypes[pageType];
  const environment = environments[getAppEnv()];
  return environment && environment.enabled ? environment.paths : [];
};

module.exports = getPaths;
