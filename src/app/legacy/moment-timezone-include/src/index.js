const webpack = require('webpack');
const writeNewTimezoneData = require('./writeNewTimezoneData');
const replaceOriginalTimezoneData = require('./replaceOriginalTimezoneData');

function MomentTimezoneInclude(options = {}) {
  const startYear = options.startYear || -Infinity;
  const endYear = options.endYear || Infinity;

  writeNewTimezoneData(startYear, endYear);

  return new webpack.NormalModuleReplacementPlugin(
    /data[\\/]packed[\\/]latest\.json$/,
    resource => {
      resource.request = replaceOriginalTimezoneData(); // eslint-disable-line no-param-reassign
    },
  );
}

module.exports = MomentTimezoneInclude;
