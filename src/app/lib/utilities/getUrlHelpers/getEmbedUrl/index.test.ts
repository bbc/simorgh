import getEmbedUrl, { makeAbsolute, GetEmbedUrlProps } from '.';

const mediaId = 'foo/bar';
const legacyId = 'russian/multimedia/2016/05/160505_v_diving_record/123/ru';
const liveOverrideParam = '?renderer_env=live';
const testOverrideParam = '?renderer_env=test';
const embedUrlLiveOverride = '?morph_env=live';

const setEnvironment = (environment: string) => {
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
  },
  {
    description: `should build a CANONICAL url for on-demand/live radio in test environment with live override`,
    expected: `/ws/av-embeds/media/${mediaId}${embedUrlLiveOverride}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'media',
    } satisfies GetEmbedUrlProps,
  },
  {
    description: `should build a CANONICAL url for articles in live environment`,
    expected: `/ws/av-embeds/articles/${mediaId}`,
    environment: 'live',
    before: setEnvironment,
    embedObject: {
      mediaId,
      type: 'articles',
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
  },
  {
    description: `should build a CANONICAL url for legacy media in test environment with no override`,
    expected: `/ws/av-embeds/legacy/${legacyId}`,
    environment: 'test',
    before: setEnvironment,
    embedObject: {
      mediaId: legacyId,
      type: 'legacy',
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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
    } satisfies GetEmbedUrlProps,
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

const buildAvEmbedUrlTestCases = [
  {
    description: 'should build an embed URL for the page',
    cases: [
      {
        description: 'CPS - embedded',
        mediaId: 'serbian/cyr/srbija-68707945',
        embedded: true,
        expected: '/serbian/cyr/av-embeds/srbija-68707945',
      },
      {
        description: 'CPS - embedded AMP',
        mediaId: 'serbian/cyr/srbija-68707945',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/serbian/cyr/av-embeds/srbija-68707945/amp',
      },
      {
        description: 'CPS - not embedded',
        mediaId: 'serbian/cyr/srbija-68707945',
        embedded: false,
        expected: '/ws/av-embeds/cps/serbian/cyr/srbija-68707945',
      },
      {
        description: 'Optimo - embedded',
        mediaId: 'c805k05kr73o',
        embedded: true,
        expected: '/ws/av-embeds/articles/c805k05kr73o',
      },
      {
        description: 'Optimo - embedded AMP',
        mediaId: 'c805k05kr73o',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/ws/av-embeds/articles/c805k05kr73o/amp',
      },
      {
        description: 'Optimo - not embedded',
        mediaId: 'c805k05kr73o',
        embedded: false,
        expected: '/ws/av-embeds/articles/c805k05kr73o',
      },
    ],
  },
  {
    description: 'should build an embed with a vpid URL for the page',
    cases: [
      {
        description: 'CPS - embedded',
        mediaId: 'serbian/cyr/srbija-68707945/vpid/p0cfmdwj',
        embedded: true,
        expected: '/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwj',
      },
      {
        description: 'CPS - embedded AMP',
        mediaId: 'serbian/cyr/srbija-68707945/vpid/p0cfmdwj',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwj/amp',
      },
      {
        description: 'CPS - not embedded',
        mediaId: 'serbian/cyr/srbija-68707945/vpid/p0cfmdwj',
        embedded: false,
        expected: '/ws/av-embeds/cps/serbian/cyr/srbija-68707945/vpid/p0cfmdwj',
      },
      {
        description: 'Optimo - embedded',
        mediaId: 'c805k05kr73o/pXXXXXo',
        embedded: true,
        expected: '/ws/av-embeds/articles/c805k05kr73o/pXXXXXo',
      },
      {
        description: 'Optimo - embedded AMP',
        mediaId: 'c805k05kr73o/pXXXXXo',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/ws/av-embeds/articles/c805k05kr73o/pXXXXXo/amp',
      },
      {
        description: 'Optimo - not embedded',
        mediaId: 'c805k05kr73o/pXXXXXo',
        embedded: false,
        expected: '/ws/av-embeds/articles/c805k05kr73o/pXXXXXo',
      },
    ],
  },
  {
    description: 'should build an embed with a pid URL for the page',
    cases: [
      {
        description: 'CPS - embedded',
        mediaId: 'serbian/cyr/srbija-68707945/pid/p0cfmdwn',
        embedded: true,
        expected: '/serbian/cyr/av-embeds/srbija-68707945/pid/p0cfmdwn',
      },
      {
        description: 'CPS - embedded AMP',
        mediaId: 'serbian/cyr/srbija-68707945/pid/p0cfmdwn',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/serbian/cyr/av-embeds/srbija-68707945/pid/p0cfmdwn/amp',
      },
      {
        description: 'CPS - not embedded',
        mediaId: 'serbian/cyr/srbija-68707945/pid/p0cfmdwn',
        embedded: false,
        expected: '/ws/av-embeds/cps/serbian/cyr/srbija-68707945/pid/p0cfmdwn',
      },
      {
        description: 'Optimo - embedded',
        mediaId: 'c805k05kr73o/pXXXXXo',
        embedded: true,
        expected: '/ws/av-embeds/articles/c805k05kr73o/pXXXXXo',
      },
      {
        description: 'Optimo - embedded AMP',
        mediaId: 'c805k05kr73o/pXXXXXo',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/ws/av-embeds/articles/c805k05kr73o/pXXXXXo/amp',
      },
      {
        description: 'Optimo - not embedded',
        mediaId: 'c805k05kr73o/pXXXXXo',
        embedded: false,
        expected: '/ws/av-embeds/articles/c805k05kr73o/pXXXXXo',
      },
    ],
  },
  {
    description: 'should build an embed without a variant URL for the page',
    cases: [
      {
        description: 'CPS - embedded',
        mediaId: 'russian/media-38886884',
        embedded: true,
        expected: '/russian/av-embeds/media-38886884',
      },
      {
        description: 'CPS - embedded AMP',
        mediaId: 'russian/media-38886884',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/russian/av-embeds/media-38886884/amp',
      },
      {
        description: 'CPS - not embedded',
        mediaId: 'russian/media-38886884',
        embedded: false,
        expected: '/ws/av-embeds/cps/russian/media-38886884',
      },
      {
        description: 'Optimo - embedded',
        mediaId: 'c805k05kr73o',
        embedded: true,
        expected: '/ws/av-embeds/articles/c805k05kr73o',
      },
      {
        description: 'Optimo - embedded AMP',
        mediaId: 'c805k05kr73o',
        embedded: true,
        isAmp: true,
        expected:
          'https://polling.test.bbc.co.uk/ws/av-embeds/articles/c805k05kr73o/amp',
      },
      {
        description: 'Optimo - not embedded',
        mediaId: 'c805k05kr73o',
        embedded: false,
        expected: '/ws/av-embeds/articles/c805k05kr73o',
      },
    ],
  },
];

describe('buildAvEmbedUrl', () => {
  buildAvEmbedUrlTestCases.forEach(({ description, cases }) => {
    describe(description, () => {
      cases.forEach(
        ({
          description: caseDescription,
          mediaId: caseMediaId,
          isAmp,
          embedded,
          expected,
        }) => {
          it(caseDescription, () => {
            expect(
              getEmbedUrl({
                mediaId: caseMediaId,
                type: 'avEmbed',
                isAmp,
                embedded,
              }),
            ).toEqual(expected);
          });
        },
      );
    });
  });
});
