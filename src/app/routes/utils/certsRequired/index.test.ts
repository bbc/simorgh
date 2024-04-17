import certsRequired from '.';
import getEnvironment from '../getEnvironment';

jest.mock('../getEnvironment', () =>
  jest.fn().mockImplementation(() => 'local'),
);

describe('certsRequired', () => {
  const originalIntegrationTestBuild = process.env.INTEGRATION_TEST_BUILD;
  const originaLighthouseTestBuild = process.env.LIGHTHOUSE_TEST_BUILD;

  afterEach(() => {
    process.env.INTEGRATION_TEST_BUILD = originalIntegrationTestBuild;
    process.env.LIGHTHOUSE_TEST_BUILD = originaLighthouseTestBuild;
  });

  it.each`
    url         | environment  | integrationTestBuild | lighthouseTestBuild | expected
    ${'/mundo'} | ${'local'}   | ${undefined}         | ${undefined}        | ${false}
    ${'/mundo'} | ${'local'}   | ${'true'}            | ${'true'}           | ${false}
    ${'/mundo'} | ${'local'}   | ${true}              | ${true}             | ${false}
    ${'/mundo'} | ${undefined} | ${undefined}         | ${undefined}        | ${false}
    ${'/mundo'} | ${undefined} | ${'true'}            | ${'true'}           | ${false}
    ${'/mundo'} | ${undefined} | ${true}              | ${true}             | ${false}
    ${'/mundo'} | ${'test'}    | ${undefined}         | ${undefined}        | ${true}
    ${'/mundo'} | ${'test'}    | ${'true'}            | ${'true'}           | ${false}
    ${'/mundo'} | ${'test'}    | ${true}              | ${true}             | ${false}
    ${'/mundo'} | ${'live'}    | ${undefined}         | ${undefined}        | ${true}
    ${'/mundo'} | ${'live'}    | ${'true'}            | ${'true'}           | ${false}
    ${'/mundo'} | ${'live'}    | ${true}              | ${true}             | ${false}
  `(
    'returns $expected when environment is $environment, integrationTestBuild is $integrationTestBuild, lighthouseTestBuild is $lighthouseTestBuild and url is $url',
    ({
      url,
      environment,
      integrationTestBuild,
      lighthouseTestBuild,
      expected,
    }) => {
      (getEnvironment as jest.Mock).mockImplementationOnce(() => environment);
      process.env.INTEGRATION_TEST_BUILD = integrationTestBuild;
      process.env.LIGHTHOUSE_TEST_BUILD = lighthouseTestBuild;
      expect(certsRequired(url)).toBe(expected);
    },
  );
});
