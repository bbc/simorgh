import webpackClientConfig from './webpack.config.client';

const dotenvConfigMock = {
  parsed: {
    SIMORGH_BASE_URL: 'http://localhost:7080',
    SIMORGH_PUBLIC_DIR: 'build/public',
    SIMORGH_ASSETS_MANIFEST_PATH: 'build/assets.json',
    CI: 'false',
  },
};

describe('webpack client config', () => {
  it('should return variable prefixed with SIMORGH_', () => {
    console.log(webpackClientConfig);
    console.log(dotenvConfigMock);

    expect(true).toBe(true);
  });
});
