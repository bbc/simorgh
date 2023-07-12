import allServices from './settings';

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');

if (runOnlyService && Object.keys(allServices()).includes(runOnlyService)) {
  servicesToExport = {
    [runOnlyService]: allServices()[runOnlyService],
  };
} else {
  servicesToExport = allServices();
}

export default servicesToExport;
