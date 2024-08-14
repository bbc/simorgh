import getEnvironment from '.';

describe('getEnvironment', () => {
  const originalAppEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalAppEnvironment;
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
});
