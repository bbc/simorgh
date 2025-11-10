import SERVICES from '#app/lib/config/services';
import * as regexGenerators from '.';

jest.mock('#app/lib/utilities/isLive', () => jest.fn());

describe('regex utils snapshots', () => {
  Object.keys(regexGenerators).forEach(funcName => {
    it(`should create expected regex from ${funcName}`, () => {
      expect(regexGenerators[funcName](SERVICES)).toMatchSnapshot();
    });
  });
});
