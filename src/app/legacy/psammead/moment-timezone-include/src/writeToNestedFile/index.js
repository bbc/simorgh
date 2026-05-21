// biome-ignore-all lint/style/noCommonJs: we want this
// biome-ignore-all lint/style/useNodejsImportProtocol: we want this
const fs = require('fs');
const path = require('path');

const writeToNestedFile = (filePath, contents) => {
  const fullFilePath = path.join(__dirname, filePath);
  const folder = path.dirname(fullFilePath);

  fs.mkdirSync(folder);

  fs.writeFileSync(fullFilePath, contents);

  return fullFilePath;
};

module.exports = writeToNestedFile;
