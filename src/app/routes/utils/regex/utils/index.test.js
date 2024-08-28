import * as regexGenerators from '.';
import serviceConfig from '#lib/config/services/loadableConfig';

describe('regex utils snapshots', () => {
  const services = Object.keys(serviceConfig);
  Object.keys(regexGenerators).forEach(funcName => {
    it(`should create expected regex from ${funcName}`, () => {
      expect(regexGenerators[funcName](services)).toMatchSnapshot();
    });
  });
});
