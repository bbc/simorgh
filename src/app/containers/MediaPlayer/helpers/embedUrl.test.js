import embedUrl from './embedUrl';

const url = 'foo/bar';
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';
const mediaUrl = 'bbc_korean_radio/liveradio';

const getTestCases = (type, expectedBaseUrl, requestUrl) => {
  return [
    {
      description: `should build a CANONICAL url`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${requestUrl}`,
      embedObject: {
        requestUrl,
        type,
      },
    },
    {
      description: `should build an AMP url`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${requestUrl}/amp`,
      embedObject: {
        isAmp: true,
        requestUrl,
        type,
      },
    },
  ];
};

const getTestCasesWithOverride = (
  type,
  expectedBaseUrl,
  requestUrl,
  overrideParam,
) => {
  return [
    {
      description: `should build a CANONICAL url with override`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${requestUrl}`,
      embedObject: {
        requestUrl: `${requestUrl}${overrideParam}`,
        type,
      },
    },
    {
      description: `should build an AMP url with override`,
      expected: `${expectedBaseUrl}/ws/av-embeds/${type}/${requestUrl}/amp`,
      embedObject: {
        isAmp: true,
        requestUrl: `${requestUrl}${overrideParam}`,
        type,
      },
    },
  ];
};

const runAssertions = testCases => {
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  );
};

const runNoOverrideScenarios = (type, requestUrl, expectedBaseUrl) => {
  describe('with no override param', () => {
    const testCases = getTestCases(type, expectedBaseUrl, requestUrl);

    runAssertions(testCases);
  });
};

const runOverrideScenarios = (
  type,
  requestUrl,
  expectedBaseUrl,
  overrideParam,
) => {
  describe(`with override param [${overrideParam}]`, () => {
    const testCases = getTestCasesWithOverride(
      type,
      expectedBaseUrl,
      requestUrl,
      overrideParam,
    );

    runAssertions(testCases);
  });
};

const runAllScenarios = (
  type,
  requestUrl,
  expectedBaseUrl,
  expectedTestUrl,
  expectedLiveUrl,
) => {
  describe(`for ${type}`, () => {
    runNoOverrideScenarios(type, requestUrl, expectedBaseUrl);
    runOverrideScenarios(type, requestUrl, expectedTestUrl, testOverrideParam);
    runOverrideScenarios(type, requestUrl, expectedLiveUrl, liveOverrideParam);
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
      mediaUrl,
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
      url,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
    );
    runAllScenarios(
      'media',
      mediaUrl,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
      process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
    );

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });
});
