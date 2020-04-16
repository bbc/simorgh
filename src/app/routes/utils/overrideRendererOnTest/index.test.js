import overrideRendererOnTest, { addOverrideQuery } from '.';

const { env } = process;

describe('overrideRendererOnTest', () => {
  afterEach(() => {
    process.env = env;
  });

  it('should add override query to full url', () => {
    const url = 'https://domain.com/path-name';
    const expected = 'https://domain.com/path-name?renderer_env=live';

    const actual = addOverrideQuery(url);
    expect(actual).toEqual(expected);
  });

  it('should add override query to pathname url', () => {
    const url = 'path-name';
    const expected = 'path-name?renderer_env=live';

    const actual = addOverrideQuery(url);
    expect(actual).toEqual(expected);
  });

  it('should add override query to full url with query string', () => {
    const url = 'https://domain.com/path-name?app_env=live';
    const expected =
      'https://domain.com/path-name?app_env=live&renderer_env=live';

    const actual = addOverrideQuery(url);
    expect(actual).toEqual(expected);
  });

  it('should add override query to pathname url with query string', () => {
    const url = 'path-name?app_env=live';
    const expected = 'path-name?app_env=live&renderer_env=live';

    const actual = addOverrideQuery(url);
    expect(actual).toEqual(expected);
  });

  it('should add override query on test', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    const url = 'path-name';
    const expected = 'path-name?renderer_env=live';

    const actual = overrideRendererOnTest(url);
    expect(actual).toEqual(expected);
  });

  it('should not add override query on live', () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const url = 'path-name';
    const expected = 'path-name';

    const actual = overrideRendererOnTest(url);
    expect(actual).toEqual(expected);
  });
});
