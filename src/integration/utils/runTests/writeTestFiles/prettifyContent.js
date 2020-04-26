const prettier = require('prettier');
const path = require('path');

const prettierConfig = prettier.resolveConfig.sync(path.join(__filename));

module.exports = fileContent =>
  prettier.format(fileContent, {
    ...prettierConfig,
    parser: 'babel',
  });
