import config from '../config/services';

export default (service, pageType) => {
  return config[service].pageTypes[pageType].paths;
};
