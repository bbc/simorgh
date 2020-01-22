import allServices from './allServices';

const serviceMapper = appEnv => {
  if (appEnv === 'stage') {
    return 'test';
  }

  return appEnv;
};

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');
const environment = serviceMapper(Cypress.env('APP_ENV'));

if (
  runOnlyService &&
  Object.keys(allServices(environment)).includes(runOnlyService)
) {
  module.exports = {
    [runOnlyService]: allServices(environment)[runOnlyService],
  };
} else {
  module.exports = allServices(environment);
}
