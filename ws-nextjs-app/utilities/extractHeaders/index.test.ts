import extractHeaders from '.';

describe('extractHeader', () => {
  it(`sets isUK to true when 'x-ip_is_uk_combined' is set to yes`, () => {
    const actual = extractHeaders({
      'x-ip_is_uk_combined': 'yes',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: null,
      country: null,
      isUK: true,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets isUK to true when 'x-country' is set to 'gb'`, () => {
    const actual = extractHeaders({
      'x-country': 'gb',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: null,
      country: 'gb',
      isUK: true,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets showCookieBannerBasedOnCountry to false when 'x-country' is set to 'za' and 'x-ip_is_uk_combined' is set to 'no'`, () => {
    const actual = extractHeaders({
      'x-country': 'za',
      'x-ip_is_uk_combined': 'no',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: null,
      country: 'za',
      isUK: false,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: false,
    });
  });

  it(`sets showCookieBannerBasedOnCountry to true when 'x-country' is set to 'za' and 'x-ip_is_uk_combined' is set to 'yes'`, () => {
    const actual = extractHeaders({
      'x-country': 'za',
      'x-ip_is_uk_combined': 'yes',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: null,
      country: 'za',
      isUK: true,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets showCookieBannerBasedOnCountry to false when 'x-bbc-edge-country' is set to 'za'`, () => {
    const actual = extractHeaders({
      'x-bbc-edge-country': 'za',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: null,
      country: 'za',
      isUK: false,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: false,
    });
  });

  it(`sets showAdsBasedOnLocation to true when 'bbc-adverts' header is set to 'true'`, () => {
    const actual = extractHeaders({
      'bbc-adverts': 'true',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: null,
      country: null,
      isUK: false,
      showAdsBasedOnLocation: true,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`sets bbcOrigin when 'bbc-origin' header is set`, () => {
    const actual = extractHeaders({
      'bbc-origin': 'https://www.bbc.co.uk/news',
    });
    expect(actual).toStrictEqual({
      bbcOrigin: 'https://www.bbc.co.uk/news',
      country: null,
      isUK: false,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: true,
    });
  });

  it(`lowercases country and falls back to 'x-bbc-edge-country'`, () => {
    expect(extractHeaders({ 'x-country': ' FR ' }).country).toBe('fr');
    expect(extractHeaders({ 'x-bbc-edge-country': 'NG' }).country).toBe('ng');
  });

  it('uses the first value when a header arrives as an array', () => {
    expect(extractHeaders({ 'x-country': ['GB', 'FR'] }).country).toBe('gb');
    expect(extractHeaders({ 'x-bbc-edge-country': ['NG', 'KE'] }).country).toBe(
      'ng',
    );
  });

  it(`sets isUK to true when 'x-country' is set to 'GB' (uppercase)`, () => {
    expect(extractHeaders({ 'x-country': 'GB' }).isUK).toBe(true);
  });
});
