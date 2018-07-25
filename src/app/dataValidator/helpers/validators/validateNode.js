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

/* eslint-disable no-use-before-define */

const validateNode = (schemaNode, dataNode, schemaName, parentSchemaName) => {
  validateType(schemaNode.type, dataNode, parentSchemaName);

  if (schemaNode.enum) {
    validateEnum(schemaNode.enum, dataNode, parentSchemaName);
  }

  if (schemaNode.required) {
    validateRequired(schemaNode.required, dataNode, parentSchemaName);
  }

  if (schemaNode.properties) {
    validateProperties(schemaNode, dataNode, schemaName, parentSchemaName);
  }

  if (schemaNode.items) {
    loadSchemaReference(
      schemaNode.items.oneOf,
      dataNode,
      schemaName,
      parentSchemaName,
    );
  }
};

const validateProperties = (
  schemaNode,
  dataNode,
  schemaName,
  parentSchemaName,
) => {
  const propertiesSchema = schemaNode.properties;

  Object.keys(propertiesSchema).forEach(property => {
    if (propertyNeedsValidating(schemaNode, dataNode, property)) {
      const propertySchema = propertiesSchema[property];

      log(`\nValidating Property '${property}' in '${parentSchemaName}'`);

      if (referencesSchemaDefinition(propertySchema)) {
        const referenceSchemaName = getSchemaRefName(propertySchema);
        validateBlock(dataNode, referenceSchemaName, parentSchemaName);
      } else {
        validateNode(
          propertySchema,
          dataNode[property],
          schemaName,
          `${parentSchemaName}:${property}`,
        );
      }
    } else {
      log(`\nOptional Property '${property}' not in '${schemaName}'`);
    }
  });
};

const validateBlock = (
  dataToValidate,
  referenceSchemaName = null,
  parentSchemaName = '',
) => {
  const schemaName = referenceSchemaName || dataToValidate.type;
  const blockSchema = getSchemaByName(schemaName);

  log(`\nValidating block: ${parentSchemaName}`);
  log('----------------------------------------------------------------');

  validateNode(
    blockSchema,
    dataToValidate,
    schemaName,
    `${parentSchemaName}:${schemaName}`,
  );
};

const loadSchemaReference = (
  referencedItems,
  dataNode,
  schemaName,
  parentSchemaName,
) => {
  const dataNodeArray = dataNode[schemaName];
  const referencedSchemaNames = referencedItems.map(referencedItem =>
    getSchemaRefName(referencedItem),
  );

  dataNodeArray.forEach(dataItem => {
    if (referencedSchemaNames.includes(dataItem.type)) {
      validateBlock(dataItem, dataItem.type, `${parentSchemaName}`);
    }
  });
};

module.exports = { validateNode, validateProperties, validateBlock };
