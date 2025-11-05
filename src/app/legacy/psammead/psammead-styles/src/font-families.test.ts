import { Services } from '#app/models/types/global';
import fontFamilies from './font-families';

describe('Psammead Styles - Font Families', () => {
  Object.keys(fontFamilies).forEach(service => {
    const fontFamily = fontFamilies[service as Services];

    it(`should match ${service}`, () => {
      expect(fontFamily).toMatchSnapshot();
    });
  });
});
