const { log, throwError } = require('../../utilities/messaging');

const isValidType = (schemaType, dataNode) => {
  if (schemaType === 'array' && Array.isArray(dataNode)) {
    return true;
  }
  return schemaType === `${typeof dataNode}`;
};

module.exports.validateType = (schemaType, dataNode, parentSchemaName) => {
  if (dataNode !== null) {
    if (isValidType(schemaType, dataNode)) {
      log(`- Valid type of ${schemaType}`);
    } else {
      throwError(
        `Error: Type does not match for '${parentSchemaName}' - expected '${schemaType}' for: ${JSON.stringify(
          dataNode,
        )}`,
      );
    }
  }
};
