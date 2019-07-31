// Outputs Object as a string, including functions:
// (functions code is not wrapped in quotes)
const convertObjectToStringArray = object => {
  let arrayString = '[';
  Object.keys(object).forEach(property => {
    arrayString += `${object[property].toString()},`;
  });
  arrayString += ']';

  return arrayString;
};

const filterPolyfillChecks = (
  listFeatureChecks,
  overriddenFeatureChecks,
  sharedFeatureChecks,
) => {
  const polyfillsObject = {};

  // we add all the existing polyfill checks:
  listFeatureChecks.forEach(checkName => {
    // first check in overwrite file:
    if (overriddenFeatureChecks && overriddenFeatureChecks[checkName]) {
      polyfillsObject[checkName] = overriddenFeatureChecks[checkName];
    }
    // then if not found, check in shared checks:
    else if (sharedFeatureChecks && sharedFeatureChecks[checkName]) {
      polyfillsObject[checkName] = sharedFeatureChecks[checkName];
    }
    // not found anywhere
  });

  return polyfillsObject;
};

module.exports = {
  convertObjectToStringArray,
  filterPolyfillChecks,
};
