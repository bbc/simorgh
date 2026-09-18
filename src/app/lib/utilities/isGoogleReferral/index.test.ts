import isGoogleReferral from '.';

const setReferrer = (referrer: string) =>
  jest.spyOn(document, 'referrer', 'get').mockReturnValue(referrer);

describe('isGoogleReferral', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each`
    referrer
    ${'https://www.google.com/'}
    ${'https://google.com/'}
    ${'https://www.google.co.in/'}
    ${'https://www.google.ru/'}
    ${'https://news.google.com/'}
    ${'https://WWW.GOOGLE.COM/'}
    ${'android-app://com.google.android.googlequicksearchbox/'}
    ${'https://google.com.example.com/'}
  `('returns true for $referrer', ({ referrer }) => {
    setReferrer(referrer);

    expect(isGoogleReferral()).toBe(true);
  });

  it.each`
    referrer
    ${''}
    ${'https://www.bbc.com/hindi'}
    ${'https://www.bing.com/'}
    ${'not-a-url'}
  `('returns false for $referrer', ({ referrer }) => {
    setReferrer(referrer);

    expect(isGoogleReferral()).toBe(false);
  });
});
