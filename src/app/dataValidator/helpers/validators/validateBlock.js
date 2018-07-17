const { log, throwError } = require('../../utilities/messaging');
const { loadSchema } = require('../../utilities/loadSchema');
const { validateNode } = require('./validateNode');

module.exports.validateBlock = dataToValidate => {
  const schemas = loadSchema();
  const schemaName = dataToValidate.type;

  if (!(schemaName in schemas)) {
    throwError(`Error: No schema exists for the block ${dataToValidate.type}`);
  }

  log(`\nValidating block: ${schemaName}`);
  log('----------------------------------------------------------------');

  const blockSchema = schemas[schemaName];
  validateNode(blockSchema, dataToValidate, schemaName);
};
