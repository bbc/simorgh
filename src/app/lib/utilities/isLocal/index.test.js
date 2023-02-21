import isLocal from '.';

describe('isLocal', () => {
  const originalEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalEnvironment;
  });

  it.each`
    environment    | expected
    ${'local'}     | ${true}
    ${'not-local'} | ${false}
  `(
    'should return $expected when environment is $environment',
    ({ environment, expected }) => {
      process.env.SIMORGH_APP_ENV = environment;
      expect(isLocal()).toBe(expected);
    },
  );
});
