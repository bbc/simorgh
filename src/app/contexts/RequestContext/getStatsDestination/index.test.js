import getStatsDestination from './index';

describe('getStatsDestination', () => {
  const testScenarios = [
    {
      isUK: true,
      env: 'live',
      service: 'news',
      expected: 'NEWS_PS',
      summary: 'should return for News live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'news',
      expected: 'NEWS_GNL',
      summary: 'should return for News live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'news',
      expected: 'NEWS_GNL_TEST',
      summary: 'should return for News test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'news',
      expected: 'NEWS_PS',
      summary: 'should return for News live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'news',
      expected: 'NEWS_PS',
      summary: 'should return for News live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live UK when isUK is undefined',
    },
  ];

  testScenarios.forEach(({ isUK, env, service, expected, summary }) => {
    it(summary, () => {
      const statsDestination = getStatsDestination({ isUK, env, service });
      expect(statsDestination).toEqual(expected);
    });
  });
});
