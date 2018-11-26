const { log, throwError } = require('../../utilities/messaging');

const validateTypeOf = (schemaType, dataNode, parentSchemaName) => {
  if (schemaType === `${typeof dataNode}`) {
    log(`- Valid type of ${typeof dataNode}`);
  } else {
    throwError(
      `Error: Type does not match for '${parentSchemaName}' - expected '${schemaType}' got '${typeof dataNode}'`,
    );
  }
};

const validateArray = (dataNode, parentSchemaName) => {
  if (Array.isArray(dataNode)) {
    log('- Valid type of array');
  } else {
    throwError(
      `Error: Type does not match for '${parentSchemaName}' - expected 'array'`,
    );
  }
};

module.exports.validateType = (schemaType, dataNode, parentSchemaName) => {
  if (dataNode !== null) {
    if (schemaType === 'array') {
      validateArray(dataNode, parentSchemaName);
    } else {
      validateTypeOf(schemaType, dataNode, parentSchemaName);
    }
  }
};
