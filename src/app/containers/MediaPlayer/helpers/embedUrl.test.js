import embedUrl from './embedUrl';

const mediaId = 'foo/bar';
const pageUrl = `www.test.com/${mediaId}`;
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';
const applicationEnv = process.env.SIMORGH_APP_ENV;

const setEnvironment = env => {
  process.env.SIMORGH_APP_ENV = env;
};

const resetEnvironment = () => {
  process.env.SIMORGH_APP_ENV = applicationEnv;
};

const testCases = [
  {
    description: `should build a CANONICAL url for articles in test environment`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'test',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      pageUrl,
    },
  },
  {
    description: `should build an AMP url for articles in test environment`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'test',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      pageUrl,
    },
  },
  {
    description: `should build a CANONICAL url for articles in test environment with test override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'test',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${testOverrideParam}`,
    },
  },
  {
    description: `should build an AMP url for articles in test environment with test override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'test',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${testOverrideParam}`,
    },
  },
  {
    description: `should build a CANONICAL url for articles in test environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'test',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${liveOverrideParam}`,
    },
  },
  {
    description: `should build an AMP url for articles in test environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'test',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${liveOverrideParam}`,
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      pageUrl,
    },
  },
  {
    description: `should build an AMP url for articles in live environment`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'live',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      pageUrl,
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment with test override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${testOverrideParam}`,
    },
  },
  {
    description: `should build an AMP url for articles in live environment with test override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'live',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${testOverrideParam}`,
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${liveOverrideParam}`,
    },
  },
  {
    description: `should build an AMP url for articles in live environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'live',
    before: setEnvironment,
    after: resetEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      pageUrl: `${pageUrl}${liveOverrideParam}`,
    },
  },
];

describe('Media Player: Embed URL', () => {
  testCases.forEach(
    ({ description, expected, before, after, environment, embedObject }) => {
      it(description, () => {
        before(environment);
        expect(embedUrl(embedObject)).toEqual(expected);
        after();
      });
    },
  );
});
