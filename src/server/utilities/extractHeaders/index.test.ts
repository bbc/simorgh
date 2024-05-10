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

  it(`sets showCookieBannerBasedOnCountry to false when 'x-country' is set to 'za' and 'x-bbc-edge-isuk' is set to 'no'`, () => {
    const actual = extractHeaders({
      'x-country': 'za',
      'x-bbc-edge-isuk': 'no',
    });
    expect(actual).toStrictEqual({
      isUK: false,
      showCookieBannerBasedOnCountry: false,
    });
  });

  it(`sets showCookieBannerBasedOnCountry to true when 'x-country' is set to 'za' and 'x-bbc-edge-isuk' is set to 'yes'`, () => {
    const actual = extractHeaders({
      'x-country': 'za',
      'x-bbc-edge-isuk': 'yes',
    });
    expect(actual).toStrictEqual({
      isUK: true,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets showCookieBannerBasedOnCountry to false when 'x-bbc-edge-country' is set to 'za'`, () => {
    const actual = extractHeaders({
      'x-bbc-edge-country': 'za',
    });
    expect(actual).toStrictEqual({
      isUK: true,
      showCookieBannerBasedOnCountry: false,
    });
  });
});
