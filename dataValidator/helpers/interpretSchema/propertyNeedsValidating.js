const isRequiredProperty = (schema, property) => {
  if (schema.required) {
    if (schema.required.includes(property)) {
      return true;
    }
  }
  return false;
};

const propertyNeedsValidating = (schema, data, property) =>
  isRequiredProperty(schema, property) ||
  Object.prototype.hasOwnProperty.call(data, property);

module.exports = { propertyNeedsValidating };
