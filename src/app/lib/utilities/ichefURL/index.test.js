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

  describe('builds WebP ichef img url based on originCode, locator and resolution passed', () => {
    const BASE_IMAGE_URL = 'https://ichef.bbci.co.uk';

    it.each`
      ichefSubdomain    | originCode     | locator                                                                                              | expectedURL
      ${undefined}      | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${undefined}      | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${undefined}      | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${undefined}      | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${undefined}      | ${'amz'}       | ${'worldservice/live/assets/images/2013/08/19/130819164754_ardeshir_zahedi_112x63_bbc_nocredit.jpg'} | ${`${BASE_IMAGE_URL}/ace/ws/660/amz/worldservice/live/assets/images/2013/08/19/130819164754_ardeshir_zahedi_112x63_bbc_nocredit.jpg.webp`}
      ${undefined}      | ${'amz'}       | ${'worldservice/live/assets/images/2015/05/08/150508054332_cameron_624x351_afp.png'}                 | ${`${BASE_IMAGE_URL}/ace/ws/660/amz/worldservice/live/assets/images/2015/05/08/150508054332_cameron_624x351_afp.png.webp`}
      ${'ace/standard'} | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'ace/standard'} | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'ace/standard'} | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'ace/standard'} | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'ace/standard'} | ${'amz'}       | ${'worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                           | ${`${BASE_IMAGE_URL}/ace/standard/660/amz/worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'ace/standard'} | ${'amz'}       | ${'worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                           | ${`${BASE_IMAGE_URL}/ace/standard/660/amz/worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'ace/ws'}       | ${'cpsdevpb'}  | ${'2F4D/test/_63490121_110329105535_soweto_304x171_b_nocredit.gif'}                                  | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsdevpb/2F4D/test/_63490121_110329105535_soweto_304x171_b_nocredit.gif.webp`}
      ${'news'}         | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'news'}         | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'news'}         | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'news'}         | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
    `(
      `for the subdomain $ichefSubdomain and origin code $originCode the expected URL is $expectedURL`,
      ({ ichefSubdomain, originCode, locator, expectedURL }) => {
        const input = {
          originCode,
          locator,
          resolution: '660',
          ichefSubdomain,
        };

        expect(getIChefURL(input)).toEqual(expectedURL);
      },
    );

    it.each`
      ichefSubdomain | originCode | locator                                                                                                    | expectedURL
      ${'news'}      | ${'amz'}   | ${'worldservice/live/assets/images/2013/09/19/130919124553_srivilliputhur_temple_112x63_bbc_nocredit.jpg'} | ${`${BASE_IMAGE_URL}/news/660/amz/worldservice/live/assets/images/2013/09/19/130919124553_srivilliputhur_temple_112x63_bbc_nocredit.jpg`}
      ${'news'}      | ${'amz'}   | ${'worldservice/live/assets/images/2013/09/19/130919124553_srivilliputhur_temple_112x63_bbc_nocredit.png'} | ${`${BASE_IMAGE_URL}/news/660/amz/worldservice/live/assets/images/2013/09/19/130919124553_srivilliputhur_temple_112x63_bbc_nocredit.png`}
    `(
      `by not adding .webp to the URL for the path $locator which does not support WebP`,
      ({ ichefSubdomain, originCode, locator, expectedURL }) => {
        const input = {
          originCode,
          locator,
          resolution: '660',
          ichefSubdomain,
        };

        expect(getIChefURL(input)).toEqual(expectedURL);
      },
    );

    it.each`
      ichefSubdomain    | originCode     | locator                                                                                                   | expectedURL
      ${undefined}      | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${undefined}      | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${undefined}      | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${undefined}      | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${undefined}      | ${'amz'}       | ${'worldservice/live/assets/images/2013/08/19/130819164754_ardeshir_zahedi_112x63_bbc_nocredit.jpg.webp'} | ${`${BASE_IMAGE_URL}/ace/ws/660/amz/worldservice/live/assets/images/2013/08/19/130819164754_ardeshir_zahedi_112x63_bbc_nocredit.jpg.webp`}
      ${undefined}      | ${'amz'}       | ${'worldservice/live/assets/images/2015/05/08/150508054332_cameron_624x351_afp.png.webp'}                 | ${`${BASE_IMAGE_URL}/ace/ws/660/amz/worldservice/live/assets/images/2015/05/08/150508054332_cameron_624x351_afp.png.webp`}
      ${'ace/standard'} | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'ace/standard'} | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'ace/standard'} | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'ace/standard'} | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                              | ${`${BASE_IMAGE_URL}/ace/standard/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'ace/standard'} | ${'amz'}       | ${'worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                           | ${`${BASE_IMAGE_URL}/ace/standard/660/amz/worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'ace/standard'} | ${'amz'}       | ${'worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                           | ${`${BASE_IMAGE_URL}/ace/standard/660/amz/worldservice/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'ace/ws'}       | ${'cpsdevpb'}  | ${'2F4D/test/_63490121_110329105535_soweto_304x171_b_nocredit.gif.webp'}                                  | ${`${BASE_IMAGE_URL}/ace/ws/660/cpsdevpb/2F4D/test/_63490121_110329105535_soweto_304x171_b_nocredit.gif.webp`}
      ${'news'}         | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'news'}         | ${'cpsprodpb'} | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
      ${'news'}         | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp`}
      ${'news'}         | ${'cpsdevpb'}  | ${'cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp'}                                              | ${`${BASE_IMAGE_URL}/news/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png.webp`}
    `(
      `the .webp extension is not appended to the URL for $locator`,
      ({ ichefSubdomain, originCode, locator, expectedURL }) => {
        const input = {
          originCode,
          locator,
          resolution: '660',
          ichefSubdomain,
        };

        expect(getIChefURL(input)).toEqual(expectedURL);
      },
    );
  });

  it('builds standard ichef img url with originCode mpv', () => {
    const locator = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg';
    const originCode = 'mpv';
    const resolution = '512';
    const expectedOutput =
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg.webp';

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
        'https://ichef.bbci.co.uk/images/ic/512xn/p0b36kgx.png.webp',
      );
    },
  );
});
