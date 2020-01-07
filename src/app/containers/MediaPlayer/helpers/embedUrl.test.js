import embedUrl from './embedUrl';

const mediaId = 'foo/bar';
const pageUrl = `www.test.com/${mediaId}`;
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';
process.env.SIMORGH_EMBEDS_BASE_URL_LIVE = 'www.embed-host.live.bbc.com';
process.env.SIMORGH_EMBEDS_BASE_URL_TEST = 'www.embed-host.test.bbc.com';
const applicationEnv = process.env.APP_ENV;

const setEnvironment = env => {
  process.env.APP_ENV = env;
};

const resetEnvironment = () => {
  process.env.APP_ENV = applicationEnv;
};

const testCases = [
  {
    description: `should build a CANONICAL url for articles in test`,
    expected: `www.embed-host.test.bbc.com/ws/av-embeds/articles/${mediaId}`,
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
    description: `should build an AMP url for articles in test`,
    expected: `www.embed-host.test.bbc.com/ws/av-embeds/articles/${mediaId}/amp`,
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
    description: `should build a CANONICAL url for articles in test with test override`,
    expected: `www.embed-host.test.bbc.com/ws/av-embeds/articles/${mediaId}`,
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
    description: `should build an AMP url for articles in test with test override`,
    expected: `www.embed-host.test.bbc.com/ws/av-embeds/articles/${mediaId}/amp`,
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
    description: `should build a CANONICAL url for articles in test with live override`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}`,
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
    description: `should build an AMP url for articles in test with live override`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}/amp`,
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
    description: `should build a CANONICAL url for articles in live`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}`,
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
    description: `should build an AMP url for articles in live`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}/amp`,
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
    description: `should build a CANONICAL url for articles in live with test override`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}`,
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
    description: `should build an AMP url for articles in live with test override`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}/amp`,
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
    description: `should build a CANONICAL url for articles in live with live override`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}`,
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
    description: `should build an AMP url for articles in live with live override`,
    expected: `www.embed-host.live.bbc.com/ws/av-embeds/articles/${mediaId}/amp`,
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
