import embedUrl from './embedUrl';

const mediaId = 'foo/bar';
const url = `www.test.com/${mediaId}`;
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';

const getTestCases = (type, expectedBaseUrl, id) => {
  return [
    {
      description: `should build a CANONICAL url`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${id}`,
      embedObject: {
        mediaId: id,
        type,
        url,
      },
    },
    {
      description: `should build an AMP url`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${id}/amp`,
      embedObject: {
        isAmp: true,
        mediaId: id,
        type,
        url,
      },
    },
  ];
};

const getTestCasesWithOverride = (type, expectedBaseUrl, id, overrideParam) => {
  return [
    {
      description: `should build a CANONICAL url with override`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${id}`,
      embedObject: {
        mediaId: `${id}`,
        type,
        url: `${url}${overrideParam}`,
      },
    },
    {
      description: `should build an AMP url with override`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${id}/amp`,
      embedObject: {
        isAmp: true,
        mediaId: `${id}`,
        type,
        url: `${url}${overrideParam}`,
      },
    },
  ];
};

const runAssertions = testCases => {
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  );
};

const runNoOverrideScenarios = (type, id, expectedBaseUrl) => {
  describe('with no override param', () => {
    const testCases = getTestCases(type, expectedBaseUrl, id);

    runAssertions(testCases);
  });
};

const runOverrideScenarios = (type, id, expectedBaseUrl, overrideParam) => {
  describe(`with override param [${overrideParam}]`, () => {
    const testCases = getTestCasesWithOverride(
      type,
      expectedBaseUrl,
      id,
      overrideParam,
    );

    runAssertions(testCases);
  });
};

const runAllScenarios = (
  type,
  id,
  expectedBaseUrl,
  expectedTestUrl,
  expectedLiveUrl,
) => {
  describe(`for ${type}`, () => {
    runNoOverrideScenarios(type, id, expectedBaseUrl);
    runOverrideScenarios(type, id, expectedTestUrl, testOverrideParam);
    runOverrideScenarios(type, id, expectedLiveUrl, liveOverrideParam);
  });
};

describe('Media Player Embed URL', () => {
  const environment = process.env.APP_ENV;
  process.env.SIMORGH_EMBEDS_BASE_URL_TEST = 'https://embed-host.test.bbc.com';
  process.env.SIMORGH_EMBEDS_BASE_URL_LIVE = 'https://embed-host.live.bbc.com';

  describe('in non-live environment', () => {
    beforeEach(() => {
      process.env.APP_ENV = 'test';
    });

    runAllScenarios(
      'articles',
      url,
      process.env.SIMORGH_EMBEDS_BASE_URL_TEST,
      process.env.SIMORGH_EMBEDS_BASE_URL_TEST,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
    );

    runAllScenarios(
      'media',
      url,
      process.env.SIMORGH_EMBEDS_BASE_URL_TEST,
      process.env.SIMORGH_EMBEDS_BASE_URL_TEST,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
    );

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });

  describe('in live environment', () => {
    beforeEach(() => {
      process.env.APP_ENV = 'live';
    });

    runAllScenarios(
      'articles',
      mediaId,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
    );
    runAllScenarios(
      'media',
      mediaId,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
    );

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });
});
