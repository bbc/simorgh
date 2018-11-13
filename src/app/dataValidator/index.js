const { asyncValidateDir } = require('./helpers/dataLoader/asyncValidateDir');
const { getScenariosCount } = require('./utilities/countScenarios');

const validateAllScenarios = () => {
  console.time('validateAllScenarios'); // eslint-disable-line no-console
  return asyncValidateDir('./././data').then(() => {
    const scenariosCount = getScenariosCount();
    console.log(`\nAll ${scenariosCount} scenarios validated!`); // eslint-disable-line no-console
    console.timeEnd('validateAllScenarios'); // eslint-disable-line no-console
  });
};

validateAllScenarios();

module.exports = { validateAllScenarios };
