import getPlaceholderSrc from './placeholder';

describe('Media Player: Placeholder Image src', () => {
  it('builds a valid img url based on the locator we pass', () => {
    const input = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg';
    const expectedOutput =
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg';

    expect(getPlaceholderSrc(input, '512')).toEqual(expectedOutput);
  });
});
