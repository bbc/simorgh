import getEnvironment from '.';

describe('getEnvironment', () => {
  const originalAppEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalAppEnvironment;
  });

  it.each`
    url                                                | environment | expected
    ${'http://localhost:7080/mundo'}                   | ${'local'}  | ${'local'}
    ${'http://localhost:7080/mundo?renderer_env=test'} | ${'local'}  | ${'test'}
    ${'http://localhost:7080/mundo?renderer_env=live'} | ${'local'}  | ${'live'}
    ${'https://test.bbc.com/mundo'}                    | ${'test'}   | ${'test'}
    ${'https://test.bbc.com/mundo?renderer_env=test'}  | ${'test'}   | ${'test'}
    ${'https://test.bbc.com/mundo?renderer_env=live'}  | ${'test'}   | ${'live'}
    ${'https://www.bbc.com/mundo'}                     | ${'live'}   | ${'live'}
    ${'https://www.bbc.com/mundo?renderer_env=test'}   | ${'live'}   | ${'test'}
    ${'https://www.bbc.com/mundo?renderer_env=live'}   | ${'live'}   | ${'live'}
  `(
    'returns $expected when environment is $environment and url is $url',
    ({ url, environment, expected }) => {
      process.env.SIMORGH_APP_ENV = environment;
      expect(getEnvironment(url)).toBe(expected);
    },
  );
});
