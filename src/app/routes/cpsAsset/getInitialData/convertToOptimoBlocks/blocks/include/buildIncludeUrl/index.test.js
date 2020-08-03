import buildIncludeUrl from '.';

describe('buildIncludeUrl', () => {
  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_URL = 'https://foobar.com/includes';
  });
  const path = (envParam = '') =>
    `https://foobar.com/mundo/23263889${envParam}`;

  it.each`
    case                                                          | type      | pathname                    | href                                          | expectedUrl
    ${`with trailing href and no renderer env param`}             | ${`idt1`} | ${path}                     | ${`/indepthtoolkit/quizzes/123-456`}          | ${`https://foobar.com/includes/indepthtoolkit/quizzes/123-456`}
    ${`without trailing href and renderer env param set to test`} | ${`idt2`} | ${path`?renderer_env=test`} | ${`idt2/111-222-333-444-555`}                 | ${`https://foobar.com/includes/idt2/111-222-333-444-555/html?renderer_env=test`}
    ${`without trailing href and renderer env param set to live`} | ${`vj`}   | ${path`?renderer_env=live`} | ${`include/newsspec/21841-green-diet/gahuza`} | ${`https://foobar.com/includes/include/newsspec/21841-green-diet/gahuza?renderer_env=live`}
  `(
    'should build a valid include url $case',
    ({ type, pathname, href, expectedUrl }) => {
      const actual = buildIncludeUrl(href, type, pathname);

      expect(actual).toEqual(expectedUrl);
    },
  );
});
