import getTogglesEndpoint from './index';

beforeEach(() => {
  process.env.SIMORGH_CONFIG_URL = 'https://config.test.api.bbci.co.uk/';
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Toggles endpoint constructor', () => {
  it('returns correct endpoint during ssr', () => {
    expect(getTogglesEndpoint('mundo', null)).toEqual(
      `https://config.test.api.bbci.co.uk/?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com`,
    );
  });

  it('returns correct endpoint when on live', () => {
    process.env.SIMORGH_CONFIG_URL = 'https://config.api.bbci.co.uk/';

    expect(getTogglesEndpoint('mundo', 'https://www.bbc.com')).toEqual(
      `https://config.api.bbci.co.uk/?application=simorgh&service=mundo&__amp_source_origin=https://www.bbc.com`,
    );
  });
});
