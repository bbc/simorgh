// file containing list of polyfills should only be read at run time, not bundled:
const fs = require('fs');

const readCoreJsOutputFile = () => {
  try {
    const filePath = `${fs.realpathSync(
      process.cwd(),
    )}/build/list-feature-checks.json`;
    return JSON.parse(fs.readFileSync(filePath), 'utf8');
  } catch (e) {
    return [];
  }
};

// Outputs Object as a string, including functions:
// (functions code is not wrapped in quotes)
const convertObjectToString = object => {
  let objectString = '{';
  Object.keys(object).forEach(property => {
    objectString += `"${property}": ${object[property].toString()},`;
  });
  objectString += '}';

  return objectString;
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

export { readCoreJsOutputFile, convertObjectToString, filterPolyfillChecks };
