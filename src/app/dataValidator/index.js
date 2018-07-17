const { log } = require('./utilities/index');
const { validateBlock } = require('./helpers/validators/validateBlock');

const validateData = data => {
  console.time('validateBlock'); // eslint-disable-line no-console
  validateBlock(data);
  log('\n');
  console.timeEnd('validateBlock'); // eslint-disable-line no-console
  log('\nValidation complete!');
};

const data = require('../../../data/test/scenario-01.json');

validateData(data);

module.exports.validateData = validateData;
