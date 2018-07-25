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

const validateNode = (currentSchemaNode, dataNode, schemaName, parentSchemaName) => {
  validateType(currentSchemaNode.type, dataNode, parentSchemaName);

  if (currentSchemaNode.enum) {
    validateEnum(currentSchemaNode.enum, dataNode, parentSchemaName);
  }

  if (currentSchemaNode.required) {
    validateRequired(currentSchemaNode.required, dataNode, parentSchemaName);
  }

  if (currentSchemaNode.properties) {
    validateProperties(currentSchemaNode, dataNode, schemaName, parentSchemaName); // eslint-disable-line no-use-before-define
  }

  if (currentSchemaNode.items) {
    loadSchemaReference(currentSchemaNode.items.oneOf, dataNode, schemaName, parentSchemaName); // eslint-disable-line no-use-before-define
  }
};

const validateProperties = (currentSchemaNode, dataNode, schemaName, parentSchemaName) => {
  const propertiesSchema = currentSchemaNode.properties;

  Object.keys(propertiesSchema).forEach(property => {
    if (propertyNeedsValidating(currentSchemaNode, dataNode, property)) {
      const propertySchema = propertiesSchema[property];

      log(`\nValidating Property '${property}' in '${parentSchemaName}'`);

      if (referencesSchemaDefinition(propertySchema)) {
        const referenceSchemaName = getSchemaRefName(propertySchema);
        validateBlock(dataNode, referenceSchemaName, parentSchemaName); // eslint-disable-line no-use-before-define
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

const validateBlock = (dataToValidate, referenceSchemaName = null, parentSchemaName = '') => {
  const schemaName = referenceSchemaName || dataToValidate.type;
  const blockSchema = getSchemaByName(schemaName);

  log(`\nValidating block: ${parentSchemaName}`);
  log('----------------------------------------------------------------');

  validateNode(blockSchema, dataToValidate, schemaName, `${parentSchemaName}:${schemaName}`);
};

const loadSchemaReference = (referencedItems, dataNode, schemaName, parentSchemaName) => {
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
