import * as styles from '.';

describe('Styles', () => {
  Object.keys(styles).forEach(style => {
    const value = styles[style];

    let content = value;

    if (typeof value === 'function') {
      content = value();
    }

    it(`${style} should match text`, () => {
      expect(content).toMatchSnapshot();
    });
  });
});
