import config from '../config/services';
import getAppEnv from './getAppEnv';

export default (service, pageType) => {
  const { paths } = config[service].pageTypes[pageType];

  let environmentPaths = [];

  if (paths) {
    environmentPaths = paths[getAppEnv()] || [];
  }

  return environmentPaths;
};
