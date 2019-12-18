import embedUrl from './embedUrl';

const requestUrl = 'foo/bar';
const overrideParam = '?renderer_env=live';
const requestUrlWithOverride = `${requestUrl}${overrideParam}`;

const testCases = [
  {
    description: 'CANONICAL: builds a URL for articles',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl,
      type: 'articles',
    },
  },
  {
    description: 'CANONICAL: builds a URL with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/articles/${requestUrlWithOverride}`,
    embedObject: {
      requestUrl: requestUrlWithOverride,
      type: 'articles',
    },
  },
  {
    description: 'AMP: builds a URL',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl,
      type: 'articles',
    },
  },
  {
    description: 'AMP: builds a URL with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/articles/${requestUrl}/amp${overrideParam}`,
    embedObject: {
      isAmp: true,
      requestUrl: requestUrlWithOverride,
      type: 'articles',
    },
  },
  {
    description: 'AMP: builds a URL for media',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
  {
    description: 'AMP: builds a URL for media with override',
    expected: `https://embed-host.override.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/amp${overrideParam}`,
    embedObject: {
      isAmp: true,
      requestUrl: `bbc_korean_radio/liveradio${overrideParam}`,
      type: 'media',
    },
  },
];

describe('Media Player: Embed URL', () => {
  beforeEach(() => {
    process.env.SIMORGH_EMBEDS_BASE_URL = 'https://embed-host.bbc.com';
    process.env.SIMORGH_EMBEDS_BASE_URL_OVERRIDE =
      'https://embed-host.override.bbc.com';
  });
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  );
});
