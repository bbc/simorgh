const { log } = require('../../utilities/messaging');
const { validateRequired } = require('./validateRequired');
const { validateType } = require('./validateType');
const { validateEnum } = require('./validateEnum');

const validateNode = (currentSchemaNode, dataNode, schemaName) => {
  validateType(currentSchemaNode.type, dataNode, schemaName);

  if (currentSchemaNode.enum) {
    validateEnum(currentSchemaNode.enum, dataNode, schemaName);
  }

  if (currentSchemaNode.required) {
    validateRequired(currentSchemaNode.required, dataNode, schemaName);
  }

  if (currentSchemaNode.properties) {
    validateProperties(currentSchemaNode, dataNode, schemaName); // eslint-disable-line no-use-before-define
  }
};

const isRequiredProperty = (property, schema) => {
  if (schema.required) {
    if (schema.required.includes(property)) {
      return true;
    }
  }
  return false;
};

/*
  Due to the recursive nature of properties being able to be nested inside of properties
  both validateProperties() and validateNode() need to be contained within a single file
  otherwise a ReferenceError is throw due to the other method not yet being defined
*/
const validateProperties = (currentSchemaNode, dataNode, schemaName) => {
  const propertiesSchema = currentSchemaNode.properties;
  Object.keys(propertiesSchema).forEach(property => {
    if (
      isRequiredProperty(property, currentSchemaNode) ||
      Object.prototype.hasOwnProperty.call(dataNode, property)
    ) {
      const propertySchema = propertiesSchema[property];
      log(`\nValidating Property '${property}' in '${schemaName}'`);
      validateNode(
        propertySchema,
        dataNode[property],
        `${schemaName}:${property}`,
      );
    } else {
      log(`\nOptional Property '${property}' not in '${schemaName}'`);
    }
  });
};

module.exports.validateNode = validateNode;
module.exports.validateProperties = validateProperties;
