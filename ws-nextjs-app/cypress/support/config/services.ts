import { Services } from '#app/models/types/global';
import allServices from './settings';

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');

export default (() => {
  if (runOnlyService && Object.keys(allServices).includes(runOnlyService)) {
    return {
      [runOnlyService]: allServices[runOnlyService as Services],
    };
  }

  return allServices;
})();
