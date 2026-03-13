import { getAmpIframeUrl, getExternalEmbedUrl } from './urlConstructors';

/* 
  Note: 
  The 'id' field is the ID of the page being visited, so for canonical article pages it would be something like: '/thai/international-55160422'.
  For Syndicated routes, it would be something like /serbian/cyr/av-embeds/srbija-68707945 or /ws/av-embeds/articles/cd1rmn075d1o/p0jd37n8/ig
*/

const ampIframeTestCases = [
  {
    description: 'should build an AMP iframe URL for the page',
    cases: [
      {
        description: 'CPS without variant',
        id: 'thai/international-55160422',
        versionPID: 'p0908t9z',
        lang: 'th',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/cps/thai/international-55160422/p0908t9z/th/amp',
      },
      {
        description: 'CPS without variant (no versionPID)',
        id: 'thai/international-55160422',
        lang: 'th',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/cps/thai/international-55160422/th/amp',
      },
      {
        description: 'CPS with variant',
        id: 'serbian/cyr/srbija-68707945',
        versionPID: 'p0cfmdwn',
        lang: 'sr-cyrl',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/cps/serbian/cyr/srbija-68707945/p0cfmdwn/sr-cyrl/amp',
      },
      {
        description: 'CPS with variant (no versionPID)',
        id: 'serbian/cyr/srbija-68707945',
        lang: 'sr-cyrl',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/cps/serbian/cyr/srbija-68707945/sr-cyrl/amp',
      },
      {
        description: 'Optimo',
        id: 'mundo/articles/c805k05kr73o',
        parentPID: 'p0cfmdwn',
        lang: 'es',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/articles/c805k05kr73o/p0cfmdwn/es/amp',
      },
    ],
  },
];

const externalEmbedUrlTestCases = [
  {
    description: 'should build an external embed URL for the page',
    cases: [
      {
        description: 'CPS without variant',
        id: 'thai/international-55160422',
        versionPID: 'p0908t9z',
        lang: 'th',
        expected:
          'https://www.test.bbc.com/thai/av-embeds/international-55160422/vpid/p0908t9z',
      },
      {
        description: 'CPS without variant (no versionPID)',
        id: 'thai/international-55160422',
        lang: 'th',
        expected:
          'https://www.test.bbc.com/thai/av-embeds/international-55160422',
      },
      {
        description: 'CPS with variant',
        id: 'serbian/cyr/srbija-68707945',
        versionPID: 'p0cfmdwn',
        lang: 'sr-cyrl',
        expected:
          'https://www.test.bbc.com/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwn',
      },
      {
        description: 'CPS with variant (no versionPID)',
        id: 'serbian/cyr/srbija-68707945',
        lang: 'sr-cyrl',
        expected:
          'https://www.test.bbc.com/serbian/cyr/av-embeds/srbija-68707945',
      },
      {
        description: 'CPS Syndicated route without variant',
        id: 'news/av-embeds/58869966/vpid/p07r2y68',
        versionPID: 'p07r2y68',
        lang: 'en-gb',
        expected:
          'https://www.test.bbc.com/news/av-embeds/58869966/vpid/p07r2y68',
      },
      {
        description: 'CPS Syndicated route without variant (no versionPID)',
        id: 'news/av-embeds/58869966',
        lang: 'en-gb',
        expected: 'https://www.test.bbc.com/news/av-embeds/58869966',
      },
      {
        description: 'CPS Syndicated route with variant',
        id: 'serbian/cyr/av-embeds/srbija-68707945/pid/p0cfmdwn',
        versionPID: 'p0cfmdwn',
        lang: 'sr-cyrl',
        expected:
          'https://www.test.bbc.com/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwn',
      },
      {
        description: 'CPS Syndicated route with variant (no versionPID)',
        id: 'serbian/cyr/av-embeds/srbija-68707945',
        lang: 'sr-cyrl',
        expected:
          'https://www.test.bbc.com/serbian/cyr/av-embeds/srbija-68707945',
      },
      {
        description: 'Optimo',
        id: 'mundo/articles/c805k05kr73o',
        parentPID: 'p0cfmdwn',
        lang: 'es',
        expected:
          'https://www.test.bbc.com/ws/av-embeds/articles/c805k05kr73o/p0cfmdwn/es',
      },
      {
        description: 'Optimo (no parentPID)',
        id: 'mundo/articles/c805k05kr73o',
        lang: 'es',
        expected:
          'https://www.test.bbc.com/ws/av-embeds/articles/c805k05kr73o/es',
      },
      {
        description: 'Optimo Syndicated route',
        id: 'ws/av-embeds/articles/cd1rmn075d1o/p0jd37n8/ig',
        parentPID: 'p0jd37n8',
        lang: 'ig',
        expected:
          'https://www.test.bbc.com/ws/av-embeds/articles/cd1rmn075d1o/p0jd37n8/ig',
      },
      {
        description: 'Optimo Syndicated route (no parentPID)',
        id: 'ws/av-embeds/articles/cd1rmn075d1o/p0jd37n8/ig',
        lang: 'ig',
        expected:
          'https://www.test.bbc.com/ws/av-embeds/articles/cd1rmn075d1o/ig',
      },
    ],
  },
];

describe('urlConstructors', () => {
  describe('AMP iframe URL', () => {
    ampIframeTestCases.forEach(({ description, cases }) => {
      describe(description, () => {
        cases.forEach(
          ({
            description: caseDescription,
            id,
            parentPID,
            versionPID,
            lang,
            expected,
          }) => {
            it(caseDescription, () => {
              expect(
                getAmpIframeUrl({ id, parentPID, versionPID, lang }),
              ).toEqual(expected);
            });
          },
        );
      });
    });
  });

  describe('External embed URL', () => {
    externalEmbedUrlTestCases.forEach(({ description, cases }) => {
      describe(description, () => {
        cases.forEach(
          ({
            description: caseDescription,
            id,
            parentPID,
            versionPID,
            lang,
            expected,
          }) => {
            it(caseDescription, () => {
              expect(
                getExternalEmbedUrl({ id, parentPID, versionPID, lang }),
              ).toEqual(expected);
            });
          },
        );
      });
    });
  });
});
