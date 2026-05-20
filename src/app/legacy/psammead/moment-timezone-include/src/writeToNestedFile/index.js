// biome-ignore-all lint/style/noCommonJs: we want this
const fs = require('node:fs');
const mkdirp = require('mkdirp');
const path = require('node:path');

const writeToNestedFile = (filePath, contents) => {
  const fullFilePath = path.join(__dirname, filePath);
  const folder = path.dirname(fullFilePath);

  mkdirp.sync(folder);

  fs.writeFileSync(fullFilePath, contents);

  return fullFilePath;
};

module.exports = writeToNestedFile;
