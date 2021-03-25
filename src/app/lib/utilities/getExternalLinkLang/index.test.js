import getExternalLinkLang from '.';

describe('getExternalLinkLang', () => {
  it('should return the correct lang value', () => {
    const lang = getExternalLinkLang({
      podcastService: 'Spotify',
      serviceLang: 'ru',
    });
    expect(lang).toBe('en-GB');
  });

  it('should return the service lang value when given service does not exist', () => {
    const lang = getExternalLinkLang({
      podcastService: 'Blah',
      serviceLang: 'ru',
    });
    expect(lang).toBe('ru');
  });
});
