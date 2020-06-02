import getTogglesEndpoint from './index';

beforeEach(() => {
  process.env.SIMORGH_TOGGLES_URL = 'https://toggles.test.api.bbci.co.uk';
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Toggles endpoint constructor', () => {
  it('returns correct endpoint during ssr', () => {
    expect(getTogglesEndpoint('mundo', null)).toEqual(
      `https://toggles.test.api.bbci.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com`,
    );
  });

  it('returns correct endpoint when on live', () => {
    process.env.SIMORGH_TOGGLES_URL = 'https://toggles.api.bbci.co.uk';

    expect(getTogglesEndpoint('mundo', 'https://www.bbc.com')).toEqual(
      `https://toggles.api.bbci.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.bbc.com`,
    );
  });
});
