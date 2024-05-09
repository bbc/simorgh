import getIChefURL from '.';

describe('getIchefURL', () => {
  it('builds standard ichef img url based on originCode, locator, resolution passed', () => {
    const input = {
      originCode: 'cpsprodpb',
      locator: 'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg',
      resolution: '660',
    };
    const expectedOutput =
      'https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp';

    expect(getIChefURL(input)).toEqual(expectedOutput);
  });

  it('builds WebP ichef img url based on originCode, locator, resolution and isWebP passed', () => {
    const input = {
      originCode: 'cpsprodpb',
      locator: 'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg',
      resolution: '660',
      isWebP: true,
    };
    const expectedOutput =
      'https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp';

    expect(getIChefURL(input)).toEqual(expectedOutput);
  });

  it('builds standard ichef img url based on originCode, locator, resolution and isWebP passed', () => {
    const input = {
      originCode: 'amz',
      locator:
        'worldservice/live/assets/images/2013/08/19/130819164754_ardeshir_zahedi_112x63_bbc_nocredit.jpg',
      resolution: '660',
      isWebP: true,
    };

    const expectedOutput =
      'https://ichef.bbci.co.uk/ace/ws/660/amz/worldservice/live/assets/images/2013/08/19/130819164754_ardeshir_zahedi_112x63_bbc_nocredit.jpg';

    expect(getIChefURL(input)).toEqual(expectedOutput);
  });

  it('builds standard ichef img url with originCode mpv', () => {
    const locator = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg';
    const originCode = 'mpv';
    const resolution = '512';
    const expectedOutput =
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg';

    expect(getIChefURL({ locator, originCode, resolution })).toEqual(
      expectedOutput,
    );
  });

  it('return urn scheme unmodified', () => {
    const locator = 'urn:bbc:pips:pid:p054n8j6';
    const originCode = 'pips';
    expect(getIChefURL({ locator, originCode })).toEqual(locator);
  });

  it.each(['mpv', 'pips'])(
    'returns a placeholder image if no image src provided and origin code is %s',
    originCode => {
      expect(getIChefURL({ resolution: 512, originCode })).toEqual(
        'https://ichef.bbci.co.uk/images/ic/512xn/p0b36kgx.png',
      );
    },
  );
});
