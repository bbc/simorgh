import embedUrl from './embedUrl';

const assetId = 'foo';
const vpid = 'bar';

const testCases = [
  {
    description: 'CANONICAL: builds a URL for LIVE environment on .co.uk',
    expected: `https://www.bbc.co.uk/ws/av-embeds/${assetId}/${vpid}`,
    embedObject: {
      origin: 'https://www.bbc.co.uk',
      assetId,
      vpid,
    },
  },
  {
    description: 'CANONICAL: builds a URL for TEST environment on .com',
    expected: `https://www.test.bbc.com/ws/av-embeds/${assetId}/${vpid}`,
    embedObject: {
      origin: 'https://www.test.bbc.com',
      assetId,
      vpid,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.co.uk',
    expected: `https://www.test.bbc.co.uk/ws/av-embeds/${assetId}/${vpid}`,
    embedObject: {
      origin: 'http://localhost.bbc.co.uk:7080',
      assetId,
      vpid,
    },
  },
  {
    description:
      'CANONICAL: builds a URL for LOCAL environment that has a base of test.bbc.com',
    expected: `https://www.test.bbc.com/ws/av-embeds/${assetId}/${vpid}`,
    embedObject: {
      origin: 'http://localhost.bbc.com:7080',
      assetId,
      vpid,
    },
  },
  {
    description: 'AMP: builds a URL for LIVE environment on .co.uk',
    expected: `https://www.bbc.co.uk/ws/av-embeds/${assetId}/${vpid}/amp`,
    embedObject: {
      origin: 'https://www.bbc.co.uk',
      isAmp: true,
      assetId,
      vpid,
    },
  },
  {
    description: 'AMP: builds a URL for TEST environment on .com',
    expected: `https://www.test.bbc.com/ws/av-embeds/${assetId}/${vpid}/amp`,
    embedObject: {
      origin: 'https://www.test.bbc.com',
      isAmp: true,
      assetId,
      vpid,
    },
  },
  {
    description:
      'AMP: builds a URL for LOCAL environment that has a base of test.bbc.co.uk',
    expected: `https://www.test.bbc.co.uk/ws/av-embeds/${assetId}/${vpid}/amp`,
    embedObject: {
      origin: 'http://localhost.bbc.co.uk:7080',
      isAmp: true,
      assetId,
      vpid,
    },
  },
];

describe('Media Player: Embed URL', () =>
  testCases.forEach(({ description, expected, embedObject }) =>
    it(description, () => expect(embedUrl(embedObject)).toEqual(expected)),
  ));
