import config from '../config/services';
import getAppEnv from './getAppEnv';

export default (service, pageType) => {
  const { envs = {} } = config[service].pageTypes[pageType];
  return envs[getAppEnv()] ? envs[getAppEnv()].paths : [];
};
