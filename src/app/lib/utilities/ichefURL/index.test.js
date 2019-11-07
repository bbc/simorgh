import getIChefURL from '.';

describe('getIchefURL', () => {
  it('builds ichef img url based on originCode, locator, resolution passed', () => {
    const input = {
      originCode: 'cpsprodpb',
      locator: 'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg',
      resolution: '660',
    };
    const expectedOutput =
      'https://ichef.bbci.co.uk/news/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg';

    expect(getIChefURL(input)).toEqual(expectedOutput);
  });

  it('builds ichef img url with originCode mpv', () => {
    const locator = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg';
    const originCode = 'mpv';
    const resolution = '512';
    const expectedOutput =
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg';

    expect(getIChefURL({ locator, originCode, resolution })).toEqual(
      expectedOutput,
    );
  });

  it('return img url pips', () => {
    const locator = 'urn:bbc:pips:pid:p054n8j6';
    const originCode = 'pips';
    expect(getIChefURL({ locator, originCode })).toEqual(locator);
  });
});
