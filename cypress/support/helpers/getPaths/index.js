import config from '../../config/services';
import getAppEnv from '../getAppEnv';

export default (service, pageType) => {
  const { environments = {}, smoke } = config[service].pageTypes[pageType];
  const environment = environments[getAppEnv()];

  const getEnabledPaths = () => {
    return environment && environment.enabled ? environment.paths : [];
  };

  if (Cypress.env('SMOKE')) {
    return smoke === true ? getEnabledPaths() : [];
  }

  return getEnabledPaths();
};
