import curry from 'ramda/src/curry';
import path from 'ramda/src/path';
import config from '../config/services';

const DEFAULT_SMOKE_VALUE = true;

export default curry((pageType, service) =>
  Cypress.env('SMOKE')
    ? path([service, 'pageTypes', pageType, 'smoke'], config)
    : DEFAULT_SMOKE_VALUE,
);
