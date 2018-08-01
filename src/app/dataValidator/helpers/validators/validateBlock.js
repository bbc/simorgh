const { log } = require('../../utilities/messaging');
const { validateNode } = require('./validateNode');
const { getSchemaByName } = require('../interpretSchema/getSchemaByName');

module.exports.validateBlock = dataToValidate => {
  const schemaName = dataToValidate.type || dataToValidate.metadata.type;

  log(`\nValidating block: ${schemaName}`);
  log('----------------------------------------------------------------');

  const blockSchema = getSchemaByName(schemaName);
  validateNode(blockSchema, dataToValidate, schemaName);
};
