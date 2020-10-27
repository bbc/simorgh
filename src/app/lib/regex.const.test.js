import * as regexes from './regex.const';

describe('regex.const', () => {
  Object.keys(regexes).forEach(regex => {
    it(`${regex} should match snapshot`, () => {
      expect(regexes[regex]).toMatchSnapshot();
    });
  });
});
