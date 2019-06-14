const { log, throwError } = require('../../utilities/messaging');

module.exports.validateRequired = (
  requireSchema,
  dataNode,
  parentSchemaName,
) => {
  log('- Required values successfully found:');

  requireSchema.forEach(requiredProp => {
    if (!(requiredProp in dataNode)) {
      throwError(
        `Error: Missing required property '${requiredProp}' for '${parentSchemaName}'`,
      );
    } else {
      log(`  - ${requiredProp}`);
    }
  });
};
