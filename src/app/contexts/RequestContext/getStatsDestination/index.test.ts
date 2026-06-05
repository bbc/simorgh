import { Environments, Services } from '#app/models/types/global';
import getStatsDestination from '.';

describe('getStatsDestination', () => {
  const testScenarios = [
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
    {
      isUK: true,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK when env undefined',
    },
  ];

  testScenarios.forEach(({ isUK, env, service, expected, summary }) => {
    it(summary, () => {
      const statsDestination = getStatsDestination({
        isUK,
        env: env as Environments,
        service: service as Services,
      });
      expect(statsDestination).toEqual(expected);
    });
  });
});
