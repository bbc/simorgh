import buildIncludeUrl from '.';

describe('buildIncludeUrl', () => {
  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_URL = 'https://foobar.com/includes';
  });
  const path = (envParam = '') =>
    `https://foobar.com/mundo/23263889${envParam}`;

  describe('handles trailing href', () => {
    it.each`
      case                       | type      | pathname                    | href                                 | expectedUrl
      ${`with trailing href`}    | ${`idt1`} | ${path}                     | ${`/indepthtoolkit/quizzes/123-456`} | ${`https://foobar.com/includes/indepthtoolkit/quizzes/123-456`}
      ${`with no trailing href`} | ${`idt2`} | ${path`?renderer_env=test`} | ${`idt2/111-222-333-444-555`}        | ${`https://foobar.com/includes/idt2/111-222-333-444-555/html?renderer_env=test`}
    `(
      'should build a valid include url $case',
      ({ type, pathname, href, expectedUrl }) => {
        const actual = buildIncludeUrl(href, type, pathname);

        expect(actual).toEqual(expectedUrl);
      },
    );
  });

  describe('handles renderer_env param', () => {
    it.each`
      case                                     | type      | pathname                    | href                                          | expectedUrl
      ${`with renderer env param set to test`} | ${`idt2`} | ${path`?renderer_env=test`} | ${`idt2/111-222-333-444-555`}                 | ${`https://foobar.com/includes/idt2/111-222-333-444-555/html?renderer_env=test`}
      ${`with renderer env param set to live`} | ${`vj`}   | ${path`?renderer_env=live`} | ${`include/newsspec/21841-green-diet/gahuza`} | ${`https://foobar.com/includes/include/newsspec/21841-green-diet/gahuza?renderer_env=live`}
      ${`with an invalid renderer env value`}  | ${`vj`}   | ${path`?renderer_env=foo`}  | ${`include/newsspec/21841-green-diet/gahuza`} | ${`https://foobar.com/includes/include/newsspec/21841-green-diet/gahuza`}
    `(
      'should build a valid include url $case',
      ({ type, pathname, href, expectedUrl }) => {
        const actual = buildIncludeUrl(href, type, pathname);

        expect(actual).toEqual(expectedUrl);
      },
    );
  });

  describe('handles href mutator', () => {
    it.each`
      case                        | type      | pathname | href                                           | expectedUrl
      ${`set no mutator`}         | ${`idt1`} | ${path}  | ${`/indepthtoolkit/quizzes/123-456`}           | ${`https://foobar.com/includes/indepthtoolkit/quizzes/123-456`}
      ${`append "/html" mutator`} | ${`idt2`} | ${path}  | ${`/idt2/111-222-333-444-555`}                 | ${`https://foobar.com/includes/idt2/111-222-333-444-555/html`}
      ${`set no mutator`}         | ${`vj`}   | ${path}  | ${`/include/newsspec/21841-green-diet/gahuza`} | ${`https://foobar.com/includes/include/newsspec/21841-green-diet/gahuza`}
    `(
      'should $case for $type includes',
      ({ type, pathname, href, expectedUrl }) => {
        const actual = buildIncludeUrl(href, type, pathname);

        expect(actual).toEqual(expectedUrl);
      },
    );
  });
});
