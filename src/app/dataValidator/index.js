const { readdirSync } = require('./helpers/dataLoader/readdirSync');
const { getScenariosCount } = require('./utilities/countScenarios');

/* eslint-disable no-console */
const validateAllScenarios = () => {
  console.time('validateAllScenarios');
  return readdirSync('./././data').then(() => {
    const scenariosCount = getScenariosCount();
    console.log(`\nAll ${scenariosCount} scenarios validated!`);
    console.timeEnd('validateAllScenarios');
  });
};
/* eslint-enable no-console */

validateAllScenarios();

module.exports = { validateAllScenarios };
