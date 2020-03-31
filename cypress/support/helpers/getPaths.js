import config from '../config/services';
import getAppEnv from './getAppEnv';

export default (service, pageType) => {
  const { environments = {}, smoke } = config[service].pageTypes[pageType];
  const environment = environments[getAppEnv()];

  return environment && environment.enabled && smoke === Cypress.env('SMOKE')
    ? environment.paths
    : [];
};
