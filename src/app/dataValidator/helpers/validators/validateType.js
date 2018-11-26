const { log, throwError } = require('../../utilities/messaging');

module.exports.validateType = (schemaType, dataNode, parentSchemaName) => {
  if (dataNode !== null) {
    if (schemaType === 'array' && Array.isArray(dataNode)) {
      log('- Valid type of array');
    } else if (schemaType === `${typeof dataNode}`) {
      log(`- Valid type of ${typeof dataNode}`);
    } else {
      throwError(
        `Error: Type does not match for '${parentSchemaName}' - expected '${schemaType}' got '${typeof dataNode}'`,
      );
    }
  }
};
