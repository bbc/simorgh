import webpack from 'webpack';
import writeNewTimezoneData from './writeNewTimezoneData/index.js';
import replaceOriginalTimezoneData from './replaceOriginalTimezoneData/index.js';

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

export default MomentTimezoneInclude;
