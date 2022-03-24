import getEmbedUrl, { makeAbsolute } from '.';

const mediaId = 'foo/bar';
const legacyId = 'russian/multimedia/2016/05/160505_v_diving_record/123/ru';
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';
const embedUrlLiveOverride = '?morph_env=live';

const setEnvironment = environment => {
  process.env.SIMORGH_APP_ENV = environment;
};

const testCases = [
  {
    description: `should build a CANONICAL url for articles in test environment`,
    expected: `/ws/av-embeds/articles/${mediaId}`,
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
    expected: `/ws/av-embeds/articles/${mediaId}`,
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
    expected: `/ws/av-embeds/articles/${mediaId}${embedUrlLiveOverride}`,
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
    description: `should build a CANONICAL url for on-demand/live radio in test environment with live override`,
    expected: `/ws/av-embeds/media/${mediaId}${embedUrlLiveOverride}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'media',
      queryString: '',
    },
  },
  {
    description: `should build an AMP url for on-demand/live radio in test environment with live override`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/media/${mediaId}/amp${embedUrlLiveOverride}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'media',
      queryString: '',
    },
  },
  {
    description: `should build a CANONICAL url for articles in live environment`,
    expected: `/ws/av-embeds/articles/${mediaId}`,
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
    expected: `/ws/av-embeds/articles/${mediaId}`,
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
    expected: `/ws/av-embeds/articles/${mediaId}`,
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
    expected: `/ws/av-embeds/legacy/${legacyId}`,
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
    expected: `/ws/av-embeds/legacy/${legacyId}`,
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
  // Local environment
  {
    description: `should output test urls for canonical`,
    expected: `https://www.test.bbc.com/ws/av-embeds/articles/${mediaId}`,
    environment: 'local',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
    },
  },
  {
    description: `should output test polling urls for amp`,
    expected: `https://polling.test.bbc.co.uk/ws/av-embeds/media/${mediaId}/amp${embedUrlLiveOverride}`,
    environment: 'local',
    before: setEnvironment,
    embedObject: {
      isAmp: true,
      mediaId,
      type: 'media',
    },
  },
  {
    description: `should respect overrides`,
    expected: `https://www.test.bbc.com/ws/av-embeds/media/${mediaId}${embedUrlLiveOverride}`,
    environment: 'local',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'media',
      queryString: liveOverrideParam,
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

describe('makeAbsolute makes a relative URL absolute', () => {
  it('uses the live URL when on live environments', () => {
    setEnvironment('live');
    expect(makeAbsolute('/ws/av-embeds/some-video')).toBe(
      'https://www.bbc.com/ws/av-embeds/some-video',
    );
  });
  it('uses the test URL when on test environments', () => {
    setEnvironment('test');
    expect(makeAbsolute('/ws/av-embeds/some-video')).toBe(
      'https://www.test.bbc.com/ws/av-embeds/some-video',
    );
  });
  it('uses the test URL when on local environments', () => {
    setEnvironment('local');
    expect(makeAbsolute('/ws/av-embeds/some-video')).toBe(
      'https://www.test.bbc.com/ws/av-embeds/some-video',
    );
  });
  it('does not modify absolute urls', () => {
    expect(
      makeAbsolute('http://some-base-url.com/ws/av-embeds/some-video'),
    ).toBe('http://some-base-url.com/ws/av-embeds/some-video');
  });
  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
