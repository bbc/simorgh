// biome-ignore-all lint/style/noCommonJs: we want this
const rawTimezones = require('moment-timezone/data/packed/latest.json');
const writeToNestedFile = require('../writeToNestedFile');

const replaceOriginalTimezoneData = () =>
  writeToNestedFile(
    `../../tz/${rawTimezones.version}-raw.json`,
    JSON.stringify({ ...rawTimezones, ...{ zones: [], links: [] } }),
  );

module.exports = replaceOriginalTimezoneData;
