import getStatsDestination from './getStatsDestination';

describe('getStatsDestination', () => {
  const testScenarios = [
    {
      isUK: true,
      env: 'live',
      service: 'news',
      expected: 598285,
      summary: 'should return for News live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'news',
      expected: 598287,
      summary: 'should return for News live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'news',
      expected: 598286,
      summary: 'should return for News test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'news',
      expected: 598288,
      summary: 'should return for News test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'news',
      expected: 598286,
      summary: 'should return for News test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'news',
      expected: 598286,
      summary: 'should return for News test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'news',
      expected: 598286,
      summary: 'should return for News test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'news',
      expected: 598285,
      summary: 'should return for News live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'news',
      expected: 598285,
      summary: 'should return for News live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'persian',
      expected: 598342,
      summary: 'should return for WS live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'persian',
      expected: 598342,
      summary: 'should return for WS live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'persian',
      expected: 598343,
      summary: 'should return for WS test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'persian',
      expected: 598343,
      summary: 'should return for WS test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'persian',
      expected: 598343,
      summary: 'should return for WS test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'persian',
      expected: 598343,
      summary: 'should return for WS test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'persian',
      expected: 598343,
      summary: 'should return for WS test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'persian',
      expected: 598342,
      summary: 'should return for WS live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'persian',
      expected: 598342,
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
