import * as styles from '.';

describe('Styles', () => {
  Object.keys(styles).forEach(style => {
    // @ts-expect-error suppress No index signature with a parameter of type string was found on type
    const value = styles[style];
    it(`${style} should match text`, () => {
      expect(value).toMatchSnapshot();
    });
  });
});
