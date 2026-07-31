import constructTogglesEndpoint from './index';

const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    TOGGLES_BFF_PATH: 'https://some-url.co.uk/toggles',
    WEB_CDN_URL: 'https://web-cdn.test',
  };
});

afterEach(() => {
  jest.resetAllMocks();
  process.env = originalEnv;
});

describe('Toggles endpoint constructor', () => {
  it('returns the simorgh BFF endpoint by default', () => {
    expect(constructTogglesEndpoint({ service: 'mundo' })).toEqual(
      `https://some-url.co.uk/toggles?service=mundo&application=simorgh`,
    );
  });

  it('uses the web-cdn amp endpoint when isAmp is true', () => {
    expect(constructTogglesEndpoint({ service: 'mundo', isAmp: true })).toEqual(
      `https://web-cdn.test/fd/ws-toggles?service=mundo&application=simorgh`,
    );
  });

  it('defaults to the simorgh BFF endpoint when isAmp is false', () => {
    expect(
      constructTogglesEndpoint({ service: 'mundo', isAmp: false }),
    ).toEqual(
      `https://some-url.co.uk/toggles?service=mundo&application=simorgh`,
    );
  });
});
