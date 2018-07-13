const { log, throwError } = require('./validatorHelper');

module.exports.validateType = (schemaType, dataNode) => {
  if (dataNode !== null && schemaType) {
    if (schemaType === `${typeof dataNode}`) {
      log(`- Valid type of ${typeof dataNode}`);
    } else {
      const nodeName = dataNode.type;
      throwError(
        `Error: Type does not match for ${nodeName} node - expected ${schemaType} got ${typeof dataNode}`,
      );
    }
  }
};
