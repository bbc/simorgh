import getTogglesEndpoint from './index';
import onClient from '#lib/utilities/onClient';

jest.mock('#lib/utilities/onClient', () => jest.fn());

beforeEach(() => {
  process.env.SIMORGH_TOGGLES_URL = 'https://toggles.test.api.bbci.co.uk';
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Toggles endpoint constructor', () => {
  it('returns correct endpoint during ssr', () => {
    onClient.mockReturnValue(false);

    expect(getTogglesEndpoint('mundo', null)).toEqual(
      `https://toggles.test.api.bbci.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com`,
    );
  });

  it('returns correct endpoint during csr', () => {
    onClient.mockReturnValue(true);

    expect(getTogglesEndpoint('mundo', null)).toEqual(
      `https://toggles.test.api.bbci.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true`,
    );
  });

  it('returns correct endpoint when on live', () => {
    process.env.SIMORGH_TOGGLES_URL = 'https://toggles.api.bbci.co.uk';
    onClient.mockReturnValue(false);

    expect(getTogglesEndpoint('mundo', 'https://www.bbc.com')).toEqual(
      `https://toggles.api.bbci.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.bbc.com`,
    );
  });
});
