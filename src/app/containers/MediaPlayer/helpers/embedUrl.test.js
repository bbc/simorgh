import embedUrl from './embedUrl';

const assetId = 'foo/bar';
const type = 'articles';

const testCases = [
  {
    description: 'CANONICAL: builds a URL for LIVE environment on .co.uk',
    expected: `https://www.bbc.co.uk/ws/av-embeds/articles/${assetId}`,
    embedObject: {
      origin: 'https://www.bbc.co.uk',
      assetId,
      type,
    },
  },
  {
    description: 'CANONICAL: builds a URL for TEST environment on .com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${assetId}`,
    embedObject: {
      origin: 'https://www.test.bbc.com',
      assetId,
      type,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.co.uk',
    expected: `https://www.test.bbc.co.uk/ws/av-embeds/articles/${assetId}`,
    embedObject: {
      origin: 'http://localhost.bbc.co.uk:7080',
      assetId,
      type,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${assetId}`,
    embedObject: {
      origin: 'http://localhost.bbc.com:7080',
      assetId,
      type,
    },
  },
  {
    description: 'AMP: builds a URL for LIVE environment on .co.uk',
    expected: `https://www.bbc.co.uk/ws/av-embeds/articles/${assetId}/amp`,
    embedObject: {
      origin: 'https://www.bbc.co.uk',
      isAmp: true,
      assetId,
      type,
    },
  },
  {
    description: 'AMP: builds a URL for TEST environment on .com',
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${assetId}/amp`,
    embedObject: {
      origin: 'https://www.test.bbc.com',
      isAmp: true,
      assetId,
      type,
    },
  },
  {
    description:
      'AMP: builds a URL for LOCAL environment that has a base of test.bbc.co.uk',
    expected: `https://www.test.bbc.co.uk/ws/av-embeds/articles/${assetId}/amp`,
    embedObject: {
      origin: 'http://localhost.bbc.co.uk:7080',
      isAmp: true,
      assetId,
      type,
    },
  },
];

describe('Media Player: Embed URL', () =>
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  ));
