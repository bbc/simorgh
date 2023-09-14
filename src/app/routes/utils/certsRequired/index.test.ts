import certsRequired from '.';
import getEnvironment from '../getEnvironment';

jest.mock('../getEnvironment', () =>
  jest.fn().mockImplementation(() => 'local'),
);

describe('certsRequired', () => {
  const originalIntegrationTestBuild = process.env.INTEGRATION_TEST_BUILD;

  afterEach(() => {
    process.env.INTEGRATION_TEST_BUILD = originalIntegrationTestBuild;
  });

  it.each`
    url         | environment  | integrationTestBuild | expected
    ${'/mundo'} | ${'local'}   | ${undefined}         | ${false}
    ${'/mundo'} | ${'local'}   | ${'true'}            | ${false}
    ${'/mundo'} | ${'local'}   | ${true}              | ${false}
    ${'/mundo'} | ${undefined} | ${undefined}         | ${false}
    ${'/mundo'} | ${undefined} | ${'true'}            | ${false}
    ${'/mundo'} | ${undefined} | ${true}              | ${false}
    ${'/mundo'} | ${'test'}    | ${undefined}         | ${true}
    ${'/mundo'} | ${'test'}    | ${'true'}            | ${false}
    ${'/mundo'} | ${'test'}    | ${true}              | ${false}
    ${'/mundo'} | ${'live'}    | ${undefined}         | ${true}
    ${'/mundo'} | ${'live'}    | ${'true'}            | ${false}
    ${'/mundo'} | ${'live'}    | ${true}              | ${false}
  `(
    'returns $expected when environment is $environment, integrationTestBuild is $integrationTestBuild and url is $url',
    ({ url, environment, integrationTestBuild, expected }) => {
      (getEnvironment as jest.Mock).mockImplementationOnce(() => environment);
      process.env.INTEGRATION_TEST_BUILD = integrationTestBuild;
      expect(certsRequired(url)).toBe(expected);
    },
  );
});
