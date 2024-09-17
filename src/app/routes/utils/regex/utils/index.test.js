import serviceConfig from '#lib/config/services/loadableConfig';
import * as regexGenerators from '.';

describe('regex utils snapshots', () => {
  const services = Object.keys(serviceConfig);
  Object.keys(regexGenerators).forEach(funcName => {
    it(`should create expected regex from ${funcName}`, () => {
      expect(regexGenerators[funcName](services)).toMatchSnapshot();
    });
  });
});
