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

const runTestScenarios = (type, requestUrl) => {
  describe(`for ${type}`, () => {
    describe('with no override param', () => {
      const articleTestCases = getTestCases(
        type,
        process.env.SIMORGH_EMBEDS_BASE_URL_TEST,
        requestUrl,
      );

      runAssertions(articleTestCases);
    });

    describe('with live override param', () => {
      const overrideTestCases = getTestCasesWithOverride(
        type,
        process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
        requestUrl,
        liveOverrideParam,
      );

      runAssertions(overrideTestCases);
    });

    describe('with test override param', () => {
      const overrideTestCases = getTestCasesWithOverride(
        type,
        process.env.SIMORGH_EMBEDS_BASE_URL_TEST,
        requestUrl,
        testOverrideParam,
      );

      runAssertions(overrideTestCases);
    });
  });
};

const runLiveScenarios = (type, requestUrl) => {
  describe(`for ${type}`, () => {
    describe('with no override param', () => {
      const articleTestCases = getTestCases(
        type,
        process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
        requestUrl,
      );

      runAssertions(articleTestCases);
    });

    describe('with live override param', () => {
      const overrideTestCases = getTestCasesWithOverride(
        type,
        process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
        requestUrl,
        liveOverrideParam,
      );

      runAssertions(overrideTestCases);
    });

    describe('with test override param', () => {
      const overrideTestCases = getTestCasesWithOverride(
        type,
        process.env.SIMORGH_EMBEDS_BASE_URL_LIVE,
        requestUrl,
        testOverrideParam,
      );

      runAssertions(overrideTestCases);
    });
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

    runTestScenarios('articles', url);
    runTestScenarios('media', mediaUrl);

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });

  describe('in live environment', () => {
    beforeEach(() => {
      process.env.APP_ENV = 'live';
    });

    runLiveScenarios('articles', url);
    runLiveScenarios('media', mediaUrl);

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });
});
