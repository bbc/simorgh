import getDataAttribute from './getDataAttribute';

describe('getDataAttribute', () => {
  it('should return the correct data attribute', () => {
    const cookieDataAttribute = getDataAttribute('cookie')('accept');
    const privacyDataAttribute = getDataAttribute('privacy')('accept');

    expect(cookieDataAttribute).toEqual({ 'data-cookie-banner': 'accept' });
    expect(privacyDataAttribute).toEqual({ 'data-terms-banner': 'accept' });
  });
});
