import getLangByPageType from './getLangByPageType';

describe('getLangByPageType', () => {
  const tests = [
    {
      data: { pageData: { metadata: { passport: { language: 'test' } } } },
      lang: undefined,
      type: 'article',
      expected: 'test',
      assertion: 'should return value from passport if an article',
    },
    {
      data: undefined,
      lang: 'testLang',
      type: 'notAnArticle',
      expected: 'testLang',
      assertion: 'should return value from lang if not an article',
    },
  ];

  tests.forEach(({ data, lang, type, expected, assertion }) => {
    it(assertion, () => {
      expect(getLangByPageType(data, lang, type)).toEqual(expected);
    });
  });
});
