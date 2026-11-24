const fs = require('fs');
const path = require('path');

const writeToNestedFile = (filePath, contents) => {
  const fullFilePath = path.join(__dirname, filePath);
  const folder = path.dirname(fullFilePath);

  fs.mkdirSync(folder, { recursive: true });

  fs.writeFileSync(fullFilePath, contents);

  return fullFilePath;
};

module.exports = writeToNestedFile;
