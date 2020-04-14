import getEmbedUrl from '.';

const mediaId = 'foo/bar';
const legacyId = 'russian/multimedia/2016/05/160505_v_diving_record/123/ru';
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';
const embedUrlLiveOverride = '?morph_env=live';

const setEnvironment = (environment) => {
  process.env.SIMORGH_APP_ENV = environment;
};

const testCases = [
  {
    description: `should build a CANONICAL url for articles in test environment`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      queryString: '',
    },
  },
  {
    description: `should build an AMP url for articles in test environment`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      queryString: '',
    },
  },
  {
    description: `should build a CANONICAL url for articles in test environment with test override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      queryString: testOverrideParam,
    },
  },
  {
    description: `should build an AMP url for articles in test environment with test override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      queryString: testOverrideParam,
    },
  },
  {
    description: `should build a CANONICAL url for articles in test environment with live override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}${embedUrlLiveOverride}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      queryString: liveOverrideParam,
    },
  },
  {
    description: `should build an AMP url for articles in test environment with live override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp${embedUrlLiveOverride}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      queryString: liveOverrideParam,
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      queryString: '',
    },
  },
  {
    description: `should build an AMP url for articles in live environment`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      queryString: '',
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment with test override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      queryString: testOverrideParam,
    },
  },
  {
    description: `should build an AMP url for articles in live environment with test override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      queryString: testOverrideParam,
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
      queryString: liveOverrideParam,
    },
  },
  {
    description: `should build an AMP url for articles in live environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'articles',
      queryString: liveOverrideParam,
    },
  },
  {
    description: `should build a CANONICAL url for legacy media in live environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/legacy/${legacyId}`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      mediaId: legacyId,
      type: 'legacy',
      queryString: liveOverrideParam,
    },
  },
  {
    description: `should build an AMP url for legacy media in live environment with live override`,
    expected: `https://polling.bbc.co.uk/ws/av-embeds/legacy/${legacyId}/amp`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId: legacyId,
      type: 'legacy',
      queryString: liveOverrideParam,
    },
  },
  {
    description: `should build a CANONICAL url for legacy media in test environment with no override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/legacy/${legacyId}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId: legacyId,
      type: 'legacy',
      queryString: '',
    },
  },
  {
    description: `should build an AMP url for legacy media in test environment with no override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/legacy/${legacyId}/amp`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId: legacyId,
      type: 'legacy',
      queryString: '',
    },
  },
];

describe('Media Player: Embed URL', () => {
  testCases.forEach(
    ({ description, expected, before, environment, embedObject }) => {
      it(description, () => {
        before(environment);
        expect(getEmbedUrl(embedObject)).toEqual(expected);
      });
    },
  );
  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
