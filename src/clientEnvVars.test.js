import { getClientEnvVars } from './clientEnvVars';

describe('webpack client config', () => {
  it('should return empty object when no dotenvConfig passed', () => {
    const result = getClientEnvVars();
    const expected = {};

    expect(result).toEqual(expected);
  });

  it('should return empty object when there are no varaibles prefixed with SIMORGH_', () => {
    const dotenvConfigMock = {
      parsed: {
        FOO: 'bar',
        BAR: 'foo',
        NOT_SIMORGH_PREFIXED: 'foobar',
      },
    };
    const result = getClientEnvVars(dotenvConfigMock);
    const expected = {};

    expect(result).toEqual(expected);
  });

  it('should only return variables starting with the prefix SIMORGH_', () => {
    const dotenvConfigMock = {
      parsed: {
        SIMORGH_BASE_URL: 'https://www.bbc.com',
        SIMORGH_ASSETS_MANIFEST_PATH: 'build/assets.json',
        CI: 'false',
        NOT_SIMORGH_PREFIXED: 'foobar',
      },
    };
    const result = getClientEnvVars(dotenvConfigMock);
    const expected = {
      SIMORGH_BASE_URL: '"https://www.bbc.com"',
      SIMORGH_ASSETS_MANIFEST_PATH: '"build/assets.json"',
    };

    expect(result).toEqual(expected);
  });
});
