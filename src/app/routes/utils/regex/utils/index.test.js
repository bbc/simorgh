import services from '#lib/config/services/serviceList';
import * as regexGenerators from '.';

jest.mock('#app/lib/utilities/isLive', () => jest.fn());

describe('regex utils snapshots', () => {
  Object.keys(regexGenerators).forEach(funcName => {
    it(`should create expected regex from ${funcName}`, () => {
      expect(regexGenerators[funcName](services)).toMatchSnapshot();
    });
  });
});
