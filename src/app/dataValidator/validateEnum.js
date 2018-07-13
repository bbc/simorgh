const { log, throwError } = require('./validatorHelper');

module.exports.validateEnum = (schemaEnums, dataNode) => {
  if (schemaEnums.includes(dataNode)) {
    log(`- Valid enum of ${dataNode}`);
  } else {
    throwError(
      `Error: Type does not exist in enum array for ${dataNode} node - expected values [${schemaEnums}] got ${dataNode}`,
    );
  }
};
