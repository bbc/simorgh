import writeToNestedFile from '../writeToNestedFile';
import writeNewTimezoneData from '.';

jest.mock(
  'moment-timezone/data/packed/latest.json',
  () => ({
    version: 'versionNumber',
    zones: [
      'Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5',
      'Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6',
    ],
    links: [
      'Africa/Lagos|Africa/Bangui',
      'Africa/Lagos|Africa/Brazzaville',
      'Africa/Lagos|Africa/El_Aaiun',
    ],
  }),
  { virtual: true },
);

jest.mock('../writeToNestedFile', () => jest.fn());

describe('writeNewTimezoneData', () => {
  it('Expands links into their own zone and writes them to file.', () => {
    writeNewTimezoneData(1234, 5678);

    expect(writeToNestedFile).toHaveBeenCalledTimes(5);
    expect(writeToNestedFile).toHaveBeenCalledWith(
      '../../tz/Africa/El_Aaiun.js',
      'var moment = require("moment-timezone"); moment.tz.add(\'Africa/El_Aaiun|LMT WAT|-d.A -10|01|-22y0d.A|17e6\');',
    );
    expect(writeToNestedFile).toHaveBeenCalledWith(
      '../../tz/Africa/Bangui.js',
      'var moment = require("moment-timezone"); moment.tz.add(\'Africa/Bangui|LMT WAT|-d.A -10|01|-22y0d.A|17e6\');',
    );
    expect(writeToNestedFile).toHaveBeenCalledWith(
      '../../tz/Africa/Brazzaville.js',
      'var moment = require("moment-timezone"); moment.tz.add(\'Africa/Brazzaville|LMT WAT|-d.A -10|01|-22y0d.A|17e6\');',
    );
    expect(writeToNestedFile).toHaveBeenCalledWith(
      '../../tz/Africa/Lagos.js',
      'var moment = require("moment-timezone"); moment.tz.add(\'Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6\');',
    );
    expect(writeToNestedFile).toHaveBeenCalledWith(
      '../../tz/Africa/Abidjan.js',
      'var moment = require("moment-timezone"); moment.tz.add(\'Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5\');',
    );
  });
});
