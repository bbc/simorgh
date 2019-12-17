import embedUrl from './embedUrl';

const requestUrl = 'foo/bar';
const type = 'articles';

const testCases = [
  {
    description: 'CANONICAL: builds a URL for LIVE environment on .co.uk',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl,
      type,
    },
  },
  {
    description: 'CANONICAL: builds a URL for TEST environment on .com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl,
      type,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl,
      type,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      requestUrl,
      type,
    },
  },
  {
    description: 'AMP: builds a URL for LIVE environment on .co.uk',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl,
      type,
    },
  },
  {
    description: 'AMP: builds a URL for TEST environment on .com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl,
      type,
    },
  },
  {
    description:
      'AMP: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      isAmp: true,
      requestUrl,
      type,
    },
  },
  {
    description:
      'AMP: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/amp`,
    embedObject: {
      isAmp: true,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://embed-host.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio`,
    embedObject: {
      isAmp: false,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
  {
    description:
      'CANONICAL: builds a URL for GITHUB environment that has a base of test.bbc.com',
    expected:
      'https://embed-host.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio',
    embedObject: {
      isAmp: false,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
];

describe('Media Player: Embed URL', () => {
  beforeEach(() => {
    process.env.SIMORGH_EMBEDS_BASE_URL = 'https://embed-host.bbc.com';
  });
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  );
});
