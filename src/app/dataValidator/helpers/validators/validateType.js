const { log, throwError } = require('../../utilities/messaging');

module.exports.validateType = (schemaType, dataNode, schemaName) => {
  if (dataNode !== null && schemaType) {
    if (schemaType === `${typeof dataNode}`) {
      log(`- Valid type of ${typeof dataNode}`);
    } else {
      throwError(
        `Error: Type does not match for '${schemaName}' - expected '${schemaType}' got '${typeof dataNode}'`,
      );
    }
  }
};
