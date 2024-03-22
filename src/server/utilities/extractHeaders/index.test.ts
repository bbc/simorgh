import extractHeaders from '.';

describe('extractHeader', () => {
  it(`sets isUK to true when 'x-bbc-edge-isuk' is set to yes`, () => {
    const actual = extractHeaders({
      'x-bbc-edge-isuk': 'yes',
    });
    expect(actual).toStrictEqual({
      isUK: true,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets isUK to true when 'x-country' is set to 'gb'`, () => {
    const actual = extractHeaders({
      'x-country': 'gb',
    });
    expect(actual).toStrictEqual({
      isUK: true,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets showCookieBannerBasedOnCountry to false when 'x-country' is set to 'za'`, () => {
    const actual = extractHeaders({
      'x-country': 'za',
    });
    expect(actual).toStrictEqual({
      isUK: false,
      showCookieBannerBasedOnCountry: false,
    });
  });
});
