import getTopicPageUrl from '.';

describe('getTopicPageUrl', () => {
  it('builds a relative path by default', () => {
    expect(getTopicPageUrl({ service: 'pidgin', topicId: 'c123456789t' })).toBe(
      '/pidgin/topics/c123456789t',
    );
  });

  it('appends the variant when provided', () => {
    expect(
      getTopicPageUrl({
        service: 'uzbek',
        topicId: 'c123456789t',
        variant: 'cyr',
      }),
    ).toBe('/uzbek/topics/c123456789t/cyr');
  });

  it('uses a custom topicsPath when provided', () => {
    expect(
      getTopicPageUrl({
        service: 'cymrufyw',
        topicId: 'c123456789t',
        topicsPath: 'pynciau',
      }),
    ).toBe('/cymrufyw/pynciau/c123456789t');
  });

  it('builds an absolute bbc.com url for non-public services', () => {
    expect(
      getTopicPageUrl({
        service: 'pidgin',
        topicId: 'c123456789t',
        absolute: true,
      }),
    ).toBe('https://www.bbc.com/pidgin/topics/c123456789t');
  });

  it('builds an absolute bbc.co.uk url for public services', () => {
    expect(
      getTopicPageUrl({
        service: 'news',
        topicId: 'c123456789t',
        absolute: true,
      }),
    ).toBe('https://www.bbc.co.uk/news/topics/c123456789t');
  });

  it('builds an absolute url with a variant', () => {
    expect(
      getTopicPageUrl({
        service: 'uzbek',
        topicId: 'c123456789t',
        variant: 'cyr',
        absolute: true,
      }),
    ).toBe('https://www.bbc.com/uzbek/topics/c123456789t/cyr');
  });
});
