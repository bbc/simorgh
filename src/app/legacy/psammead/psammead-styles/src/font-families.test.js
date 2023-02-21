import * as fontFamilies from './font-families';

describe('Psammead Styles - Font Families', () => {
  Object.keys(fontFamilies).forEach(service => {
    const fontFamily = fontFamilies[service];

    it(`should match ${service}`, () => {
      expect(fontFamily).toMatchSnapshot();
    });
  });
});
