const { log } = require('../../utilities/messaging');
const { validateRequired } = require('./validateRequired');
const { validateType } = require('./validateType');
const { validateEnum } = require('./validateEnum');
const { getSchemaByName } = require('../interpretSchema/getSchemaByName');
const { getRefNameList } = require('../interpretSchema/getRefNameList');
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
    module.exports.validateProperties(
      schemaNode,
      dataNode,
      schemaName,
      parentSchemaName,
    );
  }

  if (schemaNode.items) {
    handleSchemaItems(
      schemaNode.items.oneOf,
      dataNode,
      schemaName,
      parentSchemaName,
    );
  }
};

const validateProperty = (
  propertySchema,
  dataNode,
  property,
  schemaName,
  parentSchemaName,
) => {
  if (referencesSchemaDefinition(propertySchema)) {
    module.exports.validateBlock(
      dataNode,
      getSchemaRefName(propertySchema),
      parentSchemaName,
    );
  } else {
    module.exports.validateNode(
      propertySchema,
      dataNode[property],
      schemaName,
      `${parentSchemaName}:${property}`,
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

      validateProperty(
        propertySchema,
        dataNode,
        property,
        schemaName,
        parentSchemaName,
      );
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

  module.exports.validateNode(
    blockSchema,
    dataToValidate,
    schemaName,
    `${parentSchemaName}:${schemaName}`,
  );
};

const handleSchemaItems = (
  referencedItems,
  dataNode,
  schemaName,
  parentSchemaName,
) => {
  const dataNodeArray = dataNode[schemaName];
  const referencedSchemaNames = getRefNameList(referencedItems);

  dataNodeArray.forEach(dataItem => {
    if (referencedSchemaNames.includes(dataItem.type)) {
      module.exports.validateBlock(
        dataItem,
        dataItem.type,
        `${parentSchemaName}`,
      );
    }
  });
};

module.exports = { validateNode, validateProperties, validateBlock };
