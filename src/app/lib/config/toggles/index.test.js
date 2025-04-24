/* eslint-disable no-underscore-dangle */
import toggles from '.';

describe('Default Toggles', () => {
  it('should be in alphabetical order', () => {
    const sortedKeys = Object.keys(toggles);
    sortedKeys.sort();

    expect(sortedKeys).toStrictEqual(Object.keys(toggles));
  });
});
