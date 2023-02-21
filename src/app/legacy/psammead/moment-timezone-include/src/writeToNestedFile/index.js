const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const writeToNestedFile = (filePath, contents) => {
  const fullFilePath = path.join(__dirname, filePath);
  const folder = path.dirname(fullFilePath);

  mkdirp.sync(folder);

  fs.writeFileSync(fullFilePath, contents);

  return fullFilePath;
};

module.exports = writeToNestedFile;
