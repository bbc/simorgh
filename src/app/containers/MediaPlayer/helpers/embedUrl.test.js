import embedUrl from './embedUrl';

const requestUrl = 'foo/bar';
const type = 'articles';

const testCases = [
  {
    description: 'CANONICAL: builds a URL for LIVE environment on .co.uk',
    expected: `https://www.bbc.co.uk/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      origin: 'https://www.bbc.co.uk',
      requestUrl,
      type,
    },
  },
  {
    description: 'CANONICAL: builds a URL for TEST environment on .com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      origin: 'https://www.test.bbc.com',
      requestUrl,
      type,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      origin: 'http://localhost:7080',
      requestUrl,
      type,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${requestUrl}`,
    embedObject: {
      origin: 'http://localhost:7080',
      requestUrl,
      type,
    },
  },
  {
    description: 'AMP: builds a URL for LIVE environment on .co.uk',
    expected: `https://www.bbc.co.uk/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      origin: 'https://www.bbc.co.uk',
      isAmp: true,
      requestUrl,
      type,
    },
  },
  {
    description: 'AMP: builds a URL for TEST environment on .com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      origin: 'https://www.test.bbc.com',
      isAmp: true,
      requestUrl,
      type,
    },
  },
  {
    description:
      'AMP: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${requestUrl}/amp`,
    embedObject: {
      origin: 'http://localhost:7080',
      isAmp: true,
      requestUrl,
      type,
    },
  },
  {
    description:
      'AMP: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/amp`,
    embedObject: {
      origin: 'http://localhost:7080',
      isAmp: true,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio`,
    embedObject: {
      origin: 'http://localhost:7080',
      isAmp: false,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
  {
    description:
      'CANONICAL: builds a URL for GITHUB environment that has a base of test.bbc.com',
    expected:
      'https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio',
    embedObject: {
      origin:
        'https://bbc.github.io/simorgh/iframe.html?id=main-radio-page--default',
      isAmp: false,
      requestUrl: 'bbc_korean_radio/liveradio',
      type: 'media',
    },
  },
];

describe('Media Player: Embed URL', () =>
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  ));
