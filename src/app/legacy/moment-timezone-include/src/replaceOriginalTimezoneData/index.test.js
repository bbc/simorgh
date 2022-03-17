import writeToNestedFile from '../writeToNestedFile';
import replaceOriginalTimezoneData from '.';

jest.mock('../writeToNestedFile', () => jest.fn());

jest.mock(
  'moment-timezone/data/packed/latest.json',
  () => ({
    version: 'versionNumber',
    zones: ['fake data'],
    links: ['fake data'],
  }),
  { virtual: true },
);

describe('replaceOriginalTimezoneData', () => {
  it('should call writeToNestedFile correctly', () => {
    replaceOriginalTimezoneData();
    expect(writeToNestedFile).toHaveBeenCalledTimes(1);
    expect(writeToNestedFile).toHaveBeenCalledWith(
      '../../tz/versionNumber-raw.json',
      '{"version":"versionNumber","zones":[],"links":[]}',
    );
  });
});
