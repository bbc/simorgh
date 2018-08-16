const { readdirSync } = require('./helpers/dataLoader/readdirSync');
const { getScenariosCount } = require('./utilities/countScenarios');

const validateAllScenarios = () => {
  console.time('validateAllScenarios'); // eslint-disable-line no-console
  return readdirSync('./././data').then(() => {
    const scenariosCount = getScenariosCount();
    console.log(`\nAll ${scenariosCount} scenarios validated!`); // eslint-disable-line no-console
    console.timeEnd('validateAllScenarios'); // eslint-disable-line no-console
  });
};

validateAllScenarios();

module.exports = { validateAllScenarios };
