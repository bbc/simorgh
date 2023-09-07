import getEnvironment from '.';

describe('getEnvironment', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
    delete process.env.CI;
  });

  it.each`
    url                           | environment | expected
    ${'/mundo'}                   | ${'local'}  | ${'local'}
    ${'/mundo?renderer_env=test'} | ${'local'}  | ${'test'}
    ${'/mundo?renderer_env=live'} | ${'local'}  | ${'live'}
    ${'/mundo'}                   | ${'test'}   | ${'test'}
    ${'/mundo?renderer_env=test'} | ${'test'}   | ${'test'}
    ${'/mundo?renderer_env=live'} | ${'test'}   | ${'live'}
    ${'/mundo'}                   | ${'live'}   | ${'live'}
    ${'/mundo?renderer_env=test'} | ${'live'}   | ${'test'}
    ${'/mundo?renderer_env=live'} | ${'live'}   | ${'live'}
  `(
    'returns $expected when environment is $environment and url is $url',
    ({ url, environment, expected }) => {
      process.env.SIMORGH_APP_ENV = environment;
      expect(getEnvironment(url)).toBe(expected);
    },
  );

  it('returns local when CI environment variable is true', () => {
    // @ts-expect-error CI environment variable is a boolean and is set in the GitHub actions definitions
    process.env.CI = true;

    expect(getEnvironment('/mundo')).toBe('local');
  });
});
