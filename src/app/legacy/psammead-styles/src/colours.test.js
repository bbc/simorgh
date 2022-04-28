import * as colours from './colours';

describe('Psammead Styles - Colours', () => {
  Object.keys(colours).forEach(colour => {
    it(`should match ${colours[colour]} for ${colour}`, () => {
      expect(colour).toMatchSnapshot();
    });
  });
});
