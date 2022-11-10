import rawTimezones from 'moment-timezone/data/packed/latest.json' assert { type: 'json' };
import writeToNestedFile from '../writeToNestedFile/index.js';

const replaceOriginalTimezoneData = () =>
  writeToNestedFile(
    `../../tz/${rawTimezones.version}-raw.json`,
    JSON.stringify({ ...rawTimezones, ...{ zones: [], links: [] } }),
  );

export default replaceOriginalTimezoneData;
