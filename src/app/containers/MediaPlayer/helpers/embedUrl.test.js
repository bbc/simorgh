import embedUrl from './embedUrl';

const requestUrl = 'foo/bar';
const overrideParam = '?renderer_env=live';
const requestUrlWithOverride = `${requestUrl}${overrideParam}`;
const mediaRequestUrl = 'bbc_korean_radio/liveradio';
const mediaRequestUrlWithOverride = `${mediaRequestUrl}${overrideParam}`;

const defaultTestCases = [
  {
    description: 'CANONICAL: builds a URL for articles',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl,
      type: 'articles',
    },
  },
  {
    description: 'AMP: builds a URL for articles',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl,
      type: 'articles',
    },
  },
  {
    description: 'CANONICAL: builds a URL for media',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/${mediaRequestUrl}`,
    embedObject: {
      requestUrl: mediaRequestUrl,
      type: 'media',
    },
  },
  {
    description: 'AMP: builds a URL for media',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/${mediaRequestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: mediaRequestUrl,
      type: 'media',
    },
  },
];

const nonLiveEnvWithOverrideTestCases = [
  {
    description: 'CANONICAL: builds a URL for articles with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl: requestUrlWithOverride,
      type: 'articles',
    },
  },
  {
    description: 'AMP: builds a URL for articles with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: requestUrlWithOverride,
      type: 'articles',
    },
  },
  {
    description: 'CANONICAL: builds a URL for media with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/media/${mediaRequestUrl}`,
    embedObject: {
      requestUrl: mediaRequestUrlWithOverride,
      type: 'media',
    },
  },
  {
    description: 'AMP: builds a URL for media with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/media/${mediaRequestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: mediaRequestUrlWithOverride,
      type: 'media',
    },
  },
];

const liveEnvWithOverrideTestCases = [
  {
    description: 'CANONICAL: builds a URL for articles with override',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl: requestUrlWithOverride,
      type: 'articles',
    },
  },
  {
    description: 'AMP: builds a URL for articles with override',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: requestUrlWithOverride,
      type: 'articles',
    },
  },
  {
    description: 'CANONICAL: builds a URL for media with override',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/${mediaRequestUrl}`,
    embedObject: {
      requestUrl: mediaRequestUrlWithOverride,
      type: 'media',
    },
  },
  {
    description: 'AMP: builds a URL for media with override',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/${mediaRequestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: mediaRequestUrlWithOverride,
      type: 'media',
    },
  },
];

describe('Media Player: Embed URL in non-live environment', () => {
  const environment = process.env.APP_ENV;
  beforeEach(() => {
    process.env.APP_ENV = 'test';
    process.env.SIMORGH_EMBEDS_BASE_URL_TEST = 'https://embed-host.bbc.com';
    process.env.SIMORGH_EMBEDS_BASE_URL_LIVE =
      'https://embed-host.override.bbc.com';
  });
  const testCases = defaultTestCases.concat(nonLiveEnvWithOverrideTestCases);
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  );
  afterEach(() => {
    process.env.APP_ENV = environment;
  });
});

describe('Media Player: Embed URL in live environment', () => {
  const environment = process.env.APP_ENV;
  beforeEach(() => {
    process.env.APP_ENV = 'live';
    process.env.SIMORGH_EMBEDS_BASE_URL_LIVE = 'https://embed-host.bbc.com';
  });
  const testCases = defaultTestCases.concat(liveEnvWithOverrideTestCases);
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  );
  afterEach(() => {
    process.env.APP_ENV = environment;
  });
});
