const fs = require('fs');
const { log } = require('./utilities/messaging');
const { validateBlock } = require('./helpers/validators/validateNode');

const data = JSON.parse(
  fs.readFileSync('./././data/scenario-01.json', 'utf-8'),
);

const validateData = dataToValidate => {
  console.time('validateBlock'); // eslint-disable-line no-console
  validateBlock(dataToValidate);
  log('\n');
  console.timeEnd('validateBlock'); // eslint-disable-line no-console
  log('\nValidation complete!');
};

validateData(data);

module.exports = { validateData };
