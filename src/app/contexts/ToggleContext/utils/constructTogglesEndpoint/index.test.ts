import getTogglesEndpoint from './index';

const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    TOGGLES_BFF_PATH: 'https://some-url.co.uk/toggles',
  };
});

afterEach(() => {
  jest.resetAllMocks();
  process.env = originalEnv;
});

describe('Toggles endpoint constructor', () => {
  it('returns the endpoint with the simorgh application by default', () => {
    expect(getTogglesEndpoint('mundo')).toEqual(
      `https://some-url.co.uk/toggles?service=mundo&application=simorgh`,
    );
  });

  it('uses the amp application when isAmp is true', () => {
    expect(getTogglesEndpoint('mundo', true)).toEqual(
      `https://some-url.co.uk/toggles?service=mundo&application=amp`,
    );
  });

  it('defaults to the simorgh application when isAmp is false', () => {
    expect(getTogglesEndpoint('mundo', false)).toEqual(
      `https://some-url.co.uk/toggles?service=mundo&application=simorgh`,
    );
  });
});
