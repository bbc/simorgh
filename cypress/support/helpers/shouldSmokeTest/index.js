import path from 'ramda/src/path.js';
import config from '../../config/services';

const DEFAULT_SMOKE_VALUE = true;

export default (pageType, service) =>
  Cypress.env('SMOKE')
    ? path([service, 'pageTypes', pageType, 'smoke'], config)
    : DEFAULT_SMOKE_VALUE;
