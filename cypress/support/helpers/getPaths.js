import config from '../config/services';
import getAppEnv from './getAppEnv';

export default (service, pageType) => {
  const { envs = {} } = config[service].pageTypes[pageType];
  const environment = envs[getAppEnv()];
  return environment && environment.enabled ? environment.paths : [];
};
