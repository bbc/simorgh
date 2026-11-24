import setBbcPage, { BBCPage, BBCUser } from '.';

const reverbParams = {
  page: {
    additionalProperties: {
      app_name: 'news-pidgin',
      app_type: 'responsive',
      content_language: 'pcm',
      product_platform: null,
      referrer_url: null,
      x11: '2020-03-04T18:58:43.000Z',
      x12: '2020-03-04T19:26:11.000Z',
      x13: null,
      x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
      x16: 'WS - Keep me on trend~WS - Update me',
      x17: 'News',
      x18: false,
      x5: 'http%3A%2F%2Flocalhost%2F',
      x8: 'simorgh',
      x9: "Adams%20Oshiomhole%20say%20'I%20still%20be%20APC%20National%20Chairman'",
    },
    contentId: 'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
    contentType: 'article',
    destination: 'WS_NEWS_LANGUAGES_TEST',
    name: 'news::pidgin.news.story.51745682.page',
    producer: 'PIDGIN',
  },
  user: {
    hashedId: null,
    isSignedIn: false,
  },
};

setBbcPage(reverbParams);

const {
  getName,
  getLanguage,
  getDestination,
  getProducer,
  getSection,
  getContentId,
  getContentType,
  getEdition,
  getReferrer,
  getAdditionalProperties,
  additionalProperties,
} = window.bbcpage as BBCPage;

const { getHashedId, isSignedIn } = window.bbcuser as BBCUser;

describe('setBbcPage', () => {
  it.each`
    bbcPageAttribute           | expectedResult
    ${getName}                 | ${reverbParams.page.name}
    ${getLanguage}             | ${reverbParams.page.additionalProperties.content_language}
    ${getDestination}          | ${reverbParams.page.destination}
    ${getProducer}             | ${reverbParams.page.producer}
    ${getSection}              | ${''}
    ${getContentId}            | ${reverbParams.page.contentId}
    ${getContentType}          | ${reverbParams.page.contentType}
    ${getEdition}              | ${''}
    ${getReferrer}             | ${''}
    ${getAdditionalProperties} | ${reverbParams.page.additionalProperties}
    ${additionalProperties}    | ${{ testDomain: 'local.ati-host.net', trace: '', customVars: '' }}
  `(
    `should provide reverb parameters via the window.bbcpage global object`,
    async ({ bbcPageAttribute, expectedResult }) => {
      const output =
        typeof bbcPageAttribute === 'function'
          ? await bbcPageAttribute()
          : bbcPageAttribute;

      expect(output).toEqual(expectedResult);
    },
  );

  it.each`
    bbcUserAttribute | expectedResult
    ${getHashedId}   | ${null}
    ${isSignedIn}    | ${false}
  `(
    `should provide reverb parameters via the window.bbcuser global object`,
    async ({ bbcUserAttribute, expectedResult }) => {
      const output =
        typeof bbcUserAttribute === 'function'
          ? await bbcUserAttribute()
          : bbcUserAttribute;

      expect(output).toEqual(expectedResult);
    },
  );
});
