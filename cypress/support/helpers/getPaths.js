import config from '../config/services';
import getAppEnv from './getAppEnv';

export default (service, pageType) => {
  const { environments = {} } = config[service].pageTypes[pageType];
  const environment = environments[getAppEnv()];
  return environment && environment.enabled ? environment.paths : [];
};
