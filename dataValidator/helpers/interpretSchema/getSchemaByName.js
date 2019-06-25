const { throwError } = require('../../utilities/messaging');
const { getAllSchemas } = require('../interpretSchema/getAllSchemas');

const schemas = getAllSchemas();

module.exports.getSchemaByName = schemaName => {
  if (!(schemaName in schemas)) {
    throwError(`Error: No schema exists for the block '${schemaName}'`);
  }

  return schemas[schemaName];
};
