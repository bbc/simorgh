import * as regexGenerators from '.';

describe('regex utils snapshots', () => {
  Object.keys(regexGenerators).forEach((funcName) => {
    it(`should create expected regex from ${funcName}`, () => {
      expect(
        regexGenerators[funcName](['news', 'persian', 'igbo']),
      ).toMatchSnapshot();
    });
  });
});
