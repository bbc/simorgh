const yaml = require('yaml-js'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs'); // eslint-disable-line import/no-extraneous-dependencies
const { log, throwError } = require('../../utilities/messaging');
const { validateNode } = require('./validateNode');

const yamlSchema = fs.readFileSync('./././data/schema.yaml', 'utf8');
const { components } = yaml.load(yamlSchema);
const { schemas } = components;

module.exports.validateBlock = dataToValidate => {
  const schemaName = dataToValidate.type;

  if (!(schemaName in schemas)) {
    throwError(`Error: No schema exists for the block ${dataToValidate.type}`);
  }

  log(`\nValidating block: ${schemaName}`);
  log('----------------------------------------------------------------');

  const blockSchema = schemas[schemaName];
  validateNode(blockSchema, dataToValidate, schemaName);
};
