const { log } = require('../../utilities/messaging');
const { validateRequired } = require('./validateRequired');
const { validateType } = require('./validateType');
const { validateEnum } = require('./validateEnum');
const { getSchemaByName } = require('../interpretSchema/getSchemaByName');
const {
  referencesSchemaDefinition,
  getSchemaRefName,
} = require('../interpretSchema/referencesSchemaDefinition');
const {
  propertyNeedsValidating,
} = require('../interpretSchema/propertyNeedsValidating');

/*
  Due to the recursive nature of our data payload this file must contain all the methods that
  are possible of recursively calling each other through the data tree.

  The order of execution/recursion is as follows:
    For recursive validation of the properties field
    - validateBlock -> validateNode -> validateProperties -> validateNode -> validateProperties

    For recursive validation of blocks
    - validateBlock -> validateNode -> validateProperties -> validateBlock -> validateNode ...

  If these methods are not contained within a single file a ReferenceError is throw due to the
  method being required/imported is not yet defined.
*/

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

  if (currentSchemaNode.items) {
    loadSchemaReference(currentSchemaNode.items.oneOf, dataNode, schemaName); // eslint-disable-line no-use-before-define
  }
};

const validateProperties = (currentSchemaNode, dataNode, schemaName) => {
  const propertiesSchema = currentSchemaNode.properties;

  Object.keys(propertiesSchema).forEach(property => {
    if (propertyNeedsValidating(currentSchemaNode, dataNode, property)) {
      const propertySchema = propertiesSchema[property];

      log(`\nValidating Property '${property}' in '${schemaName}'`);

      if (referencesSchemaDefinition(propertySchema)) {
        const referenceSchemaName = getSchemaRefName(propertySchema);
        handleSchemaReference(dataNode, referenceSchemaName); // eslint-disable-line no-use-before-define
      } else {
        validateNode(
          propertySchema,
          dataNode[property],
          `${schemaName}:${property}`,
        );
      }
    } else {
      log(`\nOptional Property '${property}' not in '${schemaName}'`);
    }
  });
};

const validateBlock = (dataToValidate, referenceSchemaName = null) => {
  const schemaName = referenceSchemaName || dataToValidate.type;

  log(`\nValidating block: ${schemaName}`);
  log('----------------------------------------------------------------');

  const blockSchema = getSchemaByName(schemaName);

  validateNode(blockSchema, dataToValidate, schemaName);
};

const loadSchemaReference = (referencedItems, dataNode, schemaName) => {
  const dataNodeArray = dataNode[schemaName];
  const referencedSchemaNames = referencedItems.map(referencedItem =>
    getSchemaRefName(referencedItem),
  );

  dataNodeArray.forEach(dataItem => {
    if (referencedSchemaNames.includes(dataItem.type)) {
      validateBlock(dataItem);
    }
  });
};

const handleSchemaReference = (dataNode, referenceSchemaName) => {
  if (referenceSchemaName) {
    validateBlock(dataNode, referenceSchemaName);
  } else {
    validateBlock(dataNode);
  }
};

module.exports = { validateNode, validateProperties, validateBlock };
