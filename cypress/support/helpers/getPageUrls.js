import path from 'ramda/src/path';

global.Cypress = { env: () => {} }; // Fake Cypress.env
// eslint-disable-next-line import/first
import services from '../config/services';

const getPageTypes = service => path([service, 'pageTypes'], services);

const getPageUrls = ({ pageType, environment, isSmoke }) =>
  Object.keys(services)
    .map(getPageTypes)
    .map(pageTypes => path([pageType], pageTypes))
    .filter(config => (isSmoke ? config.smoke : true))
    .map(config => path(['environments', environment, 'paths'], config))
    .filter(Boolean);

export default getPageUrls;
