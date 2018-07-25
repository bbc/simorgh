module.exports.referencesSchemaDefinition = currentSchemaNode =>
  '$ref' in currentSchemaNode;

module.exports.getSchemaRef = currentSchemaNode =>
  currentSchemaNode.$ref.replace('#/components/schemas/', '');
