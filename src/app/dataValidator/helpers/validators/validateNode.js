const { log } = require('../../utilities/messaging');
const { validateRequired } = require('./validateRequired');
const { validateType } = require('./validateType');
const { validateEnum } = require('./validateEnum');
const { validateOneOf } = require('./validateOneOf');
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

  See the dataValidator/README.md for more detail
*/

/* eslint-disable no-use-before-define */

const validateBlock = (dataToValidate, schemaName, parentSchemaName = '') => {
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
    handleSchemaItems(schemaNode.items, dataNode, parentSchemaName);
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

      validateProperty(propertySchema, dataNode, property, parentSchemaName);
    } else {
      log(`\nOptional Property '${property}' not in '${schemaName}'`);
    }
  });
};

const validateProperty = (
  propertySchema,
  dataNode,
  property,
  parentSchemaName,
) => {
  if (referencesSchemaDefinition(propertySchema)) {
    recursivelyCallValidateBlock(
      dataNode[property],
      getSchemaRefName(propertySchema),
      parentSchemaName,
    );
  } else {
    recursivelyCallValidateNode(
      propertySchema,
      dataNode[property],
      property,
      `${parentSchemaName}:${property}`,
    );
  }
};

const handleSchemaItems = (referencedItems, dataNode, parentSchemaName) => {
  // if the value is null and not an array EG: article:promo:tags:about
  if (dataNode) {
    // oneOf declaration require $ref inside
    if (referencedItems.oneOf) {
      dataNode.forEach(dataItem => {
        validateOneOf(referencedItems.oneOf, dataItem, parentSchemaName);

        recursivelyCallValidateBlock(
          dataItem,
          dataItem.type,
          `${parentSchemaName}`,
        );
      });
    } else {
      dataNode.forEach((item, index) => {
        validateItem(referencedItems, item, index, parentSchemaName);
      });
    }
  } else {
    log(`The data node ${parentSchemaName} is null`);
  }
};

const validateItem = (itemSchema, dataItem, index, parentSchemaName) => {
  log(`\nValidating Item at index ${index} in the array ${parentSchemaName}`);

  recursivelyCallValidateNode(
    itemSchema,
    dataItem,
    'item',
    `${parentSchemaName}:item`,
  );
};

// proxy methods to be overly explicit of which methods recursively call a running method
const recursivelyCallValidateBlock = (dataNode, schemaName, parentSchemaName) =>
  module.exports.validateBlock(dataNode, schemaName, parentSchemaName);

const recursivelyCallValidateNode = (
  schemaNode,
  dataNode,
  schemaName,
  parentSchemaName,
) =>
  module.exports.validateNode(
    schemaNode,
    dataNode,
    schemaName,
    parentSchemaName,
  );

module.exports = { validateNode, validateProperties, validateBlock };
