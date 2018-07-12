const yaml = require('yaml-js'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs'); // eslint-disable-line import/no-extraneous-dependencies
const { log, throwError } = require('./validatorHelper');
const { validateRequired } = require('././validateRequired');
const { validateType } = require('./validateType');
const { validateEnum } = require('./validateEnum');

const yamlSchema = fs.readFileSync('./././data/schema.yaml', 'utf8');

const { components } = yaml.load(yamlSchema);
const { schemas } = components;

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

  log(`\nValidating block: ${schemaName}`);
  log('----------------------------------------------------------------');

  const blockSchema = schemas[schemaName];
  validateNode(blockSchema, dataToValidate);
};

const validateData = data => {
  console.time('validateBlock'); // eslint-disable-line no-console
  validateBlock(data);
  log('\n');
  console.timeEnd('validateBlock'); // eslint-disable-line no-console
  log('\nValidation complete!');
};

// invoke the validator for WIP purposes
const data = require('../../../data/test/scenario-01.json');

validateData(data);

module.exports.validateNode = validateNode;
module.exports.validateBlock = validateBlock;
module.exports.validateData = validateData;
