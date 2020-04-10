const allServices = require('./settings');

const services = allServices();

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');

if (runOnlyService && Object.keys(services).includes(runOnlyService)) {
  module.exports = {
    [runOnlyService]: services[runOnlyService],
  };
} else {
  module.exports = services;
}
