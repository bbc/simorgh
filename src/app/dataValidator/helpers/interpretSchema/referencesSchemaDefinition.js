module.exports.referencesSchemaDefinition = currentSchemaNode =>
  '$ref' in currentSchemaNode;

module.exports.getSchemaRefName = currentSchemaNode =>
  currentSchemaNode.$ref.replace('#/components/schemas/', '');
