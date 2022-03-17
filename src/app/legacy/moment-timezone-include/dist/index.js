"use strict";

var webpack = require('webpack');

var writeNewTimezoneData = require('./writeNewTimezoneData');

var replaceOriginalTimezoneData = require('./replaceOriginalTimezoneData');

function MomentTimezoneInclude() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var startYear = options.startYear || -Infinity;
  var endYear = options.endYear || Infinity;
  writeNewTimezoneData(startYear, endYear);
  return new webpack.NormalModuleReplacementPlugin(/data[\\/]packed[\\/]latest\.json$/, function (resource) {
    resource.request = replaceOriginalTimezoneData(); // eslint-disable-line no-param-reassign
  });
}

module.exports = MomentTimezoneInclude;