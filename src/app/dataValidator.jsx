const yaml = require('yaml-js'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs'); // eslint-disable-line import/no-extraneous-dependencies

const yamlSchema = fs.readFileSync('././data/schema.yaml', 'utf8');

const { components } = yaml.load(yamlSchema);
const { schemas } = components;

const log = message => {
  if (process.env.NODE_ENV !== 'test' && typeof jest === 'undefined') {
    console.log(message); // eslint-disable-line no-console
  }
};

const throwError = errorMsg => {
  throw errorMsg;
};

const validateRequired = (requireSchema, dataNode) => {
  log('- Required values successfully found:');

  requireSchema.forEach(requiredProp => {
    if (!(requiredProp in dataNode)) {
      throwError(`Error: Missing required prop for ${requiredProp}`);
    } else {
      log(`  - ${requiredProp}`);
    }
  });
};

const validateEnum = (schemaEnums, dataNode) => {
  if (schemaEnums.includes(dataNode)) {
    log(`- Valid enum of ${dataNode}`);
  } else {
    throwError(
      `Error: Type does not exist in enum array for ${dataNode} node - expected values [${schemaEnums}] got ${dataNode}`,
    );
  }
};

const validateType = (schemaType, dataNode) => {
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

const validateNode = (currentSchemaNode, dataNode) => {
  validateType(currentSchemaNode.type, dataNode);

  if (currentSchemaNode.enum) {
    validateEnum(currentSchemaNode.enum, dataNode);
  }

  if (currentSchemaNode.required) {
    validateRequired(currentSchemaNode.required, dataNode);
  }
};

const validateBlock = dataToValidate => {
  const schemaName = dataToValidate.type;

  if (!(schemaName in schemas)) {
    throwError(`Error: No schema exists for the block ${dataToValidate.type}`);
  }

  log('');
  log('');
  log(`Validating block: ${schemaName}`);
  log('----------------------------------------------------------------');

  const blockSchema = schemas[schemaName];
  validateNode(blockSchema, dataToValidate);
};

const validateData = data => {
  console.time('validateBlock'); // eslint-disable-line no-console
  validateBlock(data);
  log('');
  console.timeEnd('validateBlock'); // eslint-disable-line no-console
  log('');
  log('Validation complete!');
};

// invoke the validator for WIP purposes
const data = require('../../data/test/scenario-01.json');

validateData(data);

module.exports.validateRequired = validateRequired;
module.exports.validateEnum = validateEnum;
module.exports.validateType = validateType;
module.exports.validateNode = validateNode;
module.exports.validateBlock = validateBlock;
module.exports.validateData = validateData;
