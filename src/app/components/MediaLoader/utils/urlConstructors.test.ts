import { getAmpIframeUrl, getExternalEmbedUrl } from './urlConstructors';

const ampIframeTestCases = [
  {
    description: 'should build an AMP iframe URL for the page',
    cases: [
      {
        description: 'CPS',
        id: 'thai/international-55160422',
        versionID: 'p0908t9z',
        lang: 'th',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/cps/thai/international-55160422/p0908t9z/th/amp',
      },
      {
        description: 'CPS with variant',
        id: 'serbian/cyr/srbija-68707945',
        versionID: 'p0cfmdwn',
        lang: 'sr-cyrl',
        expected:
          'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/cps/serbian/cyr/srbija-68707945/p0cfmdwn/sr-cyrl/amp',
      },
      {
        description: 'Optimo',
        id: 'mundo/articles/c805k05kr73o',
        versionID: 'p0cfmdwn',
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
        description: 'CPS',
        id: 'thai/international-55160422',
        versionID: 'p0908t9z',
        lang: 'th',
        expected:
          'https://www.test.bbc.com/thai/av-embeds/international-55160422/vpid/p0908t9z',
      },
      {
        description: 'CPS with variant',
        id: 'serbian/cyr/srbija-68707945',
        versionID: 'p0cfmdwn',
        lang: 'sr-cyrl',
        expected:
          'https://www.test.bbc.com/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwn',
      },
      {
        description: 'Optimo',
        id: 'mundo/articles/c805k05kr73o',
        versionID: 'p0cfmdwn',
        lang: 'es',
        expected:
          'https://www.test.bbc.com/ws/av-embeds/articles/c805k05kr73o/p0cfmdwn/es',
      },
    ],
  },
];

describe('urlConstructors', () => {
  describe('AMP iframe URL', () => {
    ampIframeTestCases.forEach(({ description, cases }) => {
      describe(description, () => {
        cases.forEach(
          ({ description: caseDescription, id, versionID, lang, expected }) => {
            it(caseDescription, () => {
              expect(getAmpIframeUrl({ id, versionID, lang })).toEqual(
                expected,
              );
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
          ({ description: caseDescription, id, versionID, lang, expected }) => {
            it(caseDescription, () => {
              expect(getExternalEmbedUrl({ id, versionID, lang })).toEqual(
                expected,
              );
            });
          },
        );
      });
    });
  });
});
