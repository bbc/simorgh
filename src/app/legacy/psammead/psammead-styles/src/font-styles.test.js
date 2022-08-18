import * as fontStyles from './font-styles';
import * as fontFamilies from './font-families';

const services = Object.keys(fontFamilies);
const fontStyleKeys = Object.keys(fontStyles);

services.forEach(service => {
  fontStyleKeys.forEach(fontStyle => {
    const style = fontStyle.replace('get', '');
    it(`should render ${style} correctly for ${service}`, () => {
      expect(fontStyles[fontStyle](service)).toMatchSnapshot();
    });
  });
});

fontStyleKeys.forEach(fontStyle => {
  describe(fontStyle, () => {
    it(`should fail gracefully and return null when ${fontStyle} given an invalid service name`, () => {
      expect(fontStyles[fontStyle]('default')).toBeNull();
    });
  });
});
