const {
  getSchemaRefName,
} = require('../interpretSchema/referencesSchemaDefinition');

module.exports.getRefNameList = referencedItems =>
  referencedItems.map(referencedItem => getSchemaRefName(referencedItem));
