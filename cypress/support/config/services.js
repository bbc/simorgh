import allServices from './settings.js';

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
// const runOnlyService = Cypress.env('ONLY_SERVICE');

// if (runOnlyService && Object.keys(allServices()).includes(runOnlyService)) {
//   module.exports = {
//     [runOnlyService]: allServices()[runOnlyService],
//   };
// } else {
//   module.exports = allServices();
// }

// export default runOnlyService &&
// Object.keys(allServices()).includes(runOnlyService)
//   ? { [runOnlyService]: allServices()[runOnlyService] }
//   : allServices();

export default allServices();
