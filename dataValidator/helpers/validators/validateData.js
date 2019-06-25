const { log } = require('../../utilities/messaging');
const { validateBlock } = require('./validateNode');

module.exports.validateData = data => {
  console.time('validateBlock'); // eslint-disable-line no-console
  validateBlock(data, 'article');
  log('\n');
  console.timeEnd('validateBlock'); // eslint-disable-line no-console
  log('\nValidation complete!');
};
