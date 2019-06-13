const { log, throwError } = require('../../utilities/messaging');

module.exports.validateEnum = (schemaEnums, dataNode, parentSchemaName) => {
  if (schemaEnums.includes(dataNode)) {
    log(`- Valid enum of ${dataNode}`);
  } else {
    throwError(
      `Error: Value does not exist in enum array for '${parentSchemaName}' - expected values [${schemaEnums}] got '${dataNode}'`,
    );
  }
};
