const { log, throwError } = require('./validatorHelper');

module.exports.validateRequired = (requireSchema, dataNode) => {
  log('- Required values successfully found:');

  requireSchema.forEach(requiredProp => {
    if (!(requiredProp in dataNode)) {
      throwError(`Error: Missing required prop for ${requiredProp}`);
    } else {
      log(`  - ${requiredProp}`);
    }
  });
};
