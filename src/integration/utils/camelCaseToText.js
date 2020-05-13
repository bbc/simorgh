module.exports = camelCase => {
  const text = camelCase.replace(/([A-Z])/g, ' $1');

  return text.charAt(0).toUpperCase() + text.slice(1);
};
