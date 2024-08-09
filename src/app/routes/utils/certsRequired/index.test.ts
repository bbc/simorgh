import certsRequired from '.';
import getEnvironment from '../getEnvironment';

jest.mock('../getEnvironment', () =>
  jest.fn().mockImplementation(() => 'local'),
);

describe('certsRequired', () => {
  const originaLighthouseBuild = process.env.LIGHTHOUSE_BUILD;
  const originalCypressAppEnv = process.env.CYPRESS_APP_ENV;

  afterEach(() => {
    process.env.LIGHTHOUSE_BUILD = originaLighthouseBuild;
    process.env.CYPRESS_APP_ENV = originalCypressAppEnv;
  });

  it.each`
    url         | environment  | lighthouseBuild | cypressAppEnv | expected
    ${'/mundo'} | ${'local'}   | ${undefined}    | ${undefined}  | ${false}
    ${'/mundo'} | ${'local'}   | ${'true'}       | ${'local'}    | ${false}
    ${'/mundo'} | ${'local'}   | ${true}         | ${'local'}    | ${false}
    ${'/mundo'} | ${undefined} | ${undefined}    | ${undefined}  | ${false}
    ${'/mundo'} | ${undefined} | ${'true'}       | ${'local'}    | ${false}
    ${'/mundo'} | ${undefined} | ${true}         | ${true}       | ${false}
    ${'/mundo'} | ${'test'}    | ${undefined}    | ${undefined}  | ${true}
    ${'/mundo'} | ${'test'}    | ${'true'}       | ${'test'}     | ${false}
    ${'/mundo'} | ${'test'}    | ${'false'}      | ${'test'}     | ${true}
    ${'/mundo'} | ${'test'}    | ${true}         | ${'test'}     | ${false}
    ${'/mundo'} | ${'live'}    | ${undefined}    | ${undefined}  | ${true}
    ${'/mundo'} | ${'live'}    | ${'true'}       | ${'live'}     | ${false}
    ${'/mundo'} | ${'live'}    | ${'false'}      | ${'live'}     | ${true}
    ${'/mundo'} | ${'live'}    | ${true}         | ${'live'}     | ${false}
  `(
    'returns $expected when environment is $environment, lighthouseBuild is $lighthouseBuild, cypressAppEnv is $cypressAppEnv, and url is $url',
    ({ url, environment, lighthouseBuild, cypressAppEnv, expected }) => {
      (getEnvironment as jest.Mock).mockImplementationOnce(() => environment);
      process.env.LIGHTHOUSE_BUILD = lighthouseBuild;
      process.env.CYPRESS_APP_ENV = cypressAppEnv;
      expect(certsRequired(url)).toBe(expected);
    },
  );
});
