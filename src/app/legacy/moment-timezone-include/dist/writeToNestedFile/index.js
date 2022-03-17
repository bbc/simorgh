"use strict";

var fs = require('fs');

var mkdirp = require('mkdirp');

var path = require('path');

var writeToNestedFile = function writeToNestedFile(filePath, contents) {
  var fullFilePath = path.join(__dirname, filePath);
  var folder = path.dirname(fullFilePath);
  mkdirp.sync(folder);
  fs.writeFileSync(fullFilePath, contents);
  return fullFilePath;
};

module.exports = writeToNestedFile;