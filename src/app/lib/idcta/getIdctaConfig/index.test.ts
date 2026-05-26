import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import isLocal from '#app/lib/utilities/isLocal';
import fetchIdctaConfig from '../fetchIdctaConfig';
import getIdctaConfig from '.';

jest.mock('#app/lib/utilities/getToggleDefinition');
jest.mock('#app/lib/utilities/isLocal');
jest.mock('../fetchIdctaConfig');

const mockGetToggleDefinitions = getToggleDefinitions as jest.Mock;
const mockIsLocal = isLocal as jest.Mock;
const mockFetchIdctaConfig = fetchIdctaConfig as jest.Mock;

describe('getIdctaConfig', () => {
  const mockToggles = {
    account: {
      enabled: true,
      value: 'mundo',
    },
  };
  const mockService = 'mundo';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: true, value: 'mundo' },
    });
    mockIsLocal.mockReturnValue(false);
  });

  it('should return null when account toggle is disabled', async () => {
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: false },
    });

    const result = await getIdctaConfig(mockToggles, mockService);

    expect(result).toBeNull();
    expect(mockFetchIdctaConfig).not.toHaveBeenCalled();
  });

  it('should fetch config when account toggle is enabled', async () => {
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, mockService);

    expect(result).toEqual(expect.objectContaining(mockIdctaConfig));
    expect(mockFetchIdctaConfig).toHaveBeenCalled();
  });

  it('should fetch config when service matches in local environment', async () => {
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: true, value: 'hindi|mundo' },
    });
    mockIsLocal.mockReturnValue(true);
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, 'hindi');

    expect(result).toEqual(expect.objectContaining(mockIdctaConfig));
    expect(mockFetchIdctaConfig).toHaveBeenCalled();
  });

  it('should return null when service value does not match in local environment', async () => {
    mockIsLocal.mockReturnValue(true);
    const result = await getIdctaConfig(mockToggles, 'hausa');

    expect(result).toBeNull();
    expect(mockFetchIdctaConfig).not.toHaveBeenCalled();
  });

  it('should return null when fetchIdctaConfig fails', async () => {
    mockFetchIdctaConfig.mockResolvedValue(null);

    const result = await getIdctaConfig(mockToggles, mockService);
    expect(result).toBeNull();
  });

  it('should return parsed config when fetch is successful', async () => {
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, mockService);

    expect(result).toEqual(expect.objectContaining(mockIdctaConfig));
  });

  it('should return null when config is missing id-availability field', async () => {
    const invalidConfig = {
      signInUrl: '/signin',
    };

    mockFetchIdctaConfig.mockResolvedValue(invalidConfig);

    const result = await getIdctaConfig(mockToggles, mockService);

    expect(result).toBeNull();
  });

  it('should set initialIsSignedIn to true when x-id-oidc-signedin header is "1"', async () => {
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, mockService, {
      'x-id-oidc-signedin': '1',
    });

    expect(result?.initialIsSignedIn).toBe(true);
  });

  it('should set initialIsSignedIn to false when x-id-oidc-signedin header is "0"', async () => {
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, mockService, {
      'x-id-oidc-signedin': '0',
    });

    expect(result?.initialIsSignedIn).toBe(false);
  });

  it('should set initialIsSignedIn to false when x-id-oidc-signedin header is absent', async () => {
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, mockService, {});

    expect(result?.initialIsSignedIn).toBe(false);
  });

  it('should strip extra fields not required by AccountContext', async () => {
    mockFetchIdctaConfig.mockResolvedValue({
      ...mockIdctaConfig,
      accessTokenUrl: 'https://bbc.com/access_token',
      announce_url: 'https://bbc.com/announce',
      randomData: 'should be stripped',
    });

    const result = await getIdctaConfig(mockToggles, mockService);

    expect(result).not.toHaveProperty('accessTokenUrl');
    expect(result).not.toHaveProperty('announce_url');
    expect(result).not.toHaveProperty('randomData');
  });

  it('should set initialIsSignedIn to false when x-id-oidc-signedin header has an invalid value', async () => {
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, mockService, {
      'x-id-oidc-signedin': 'invalid',
    });

    expect(result?.initialIsSignedIn).toBe(false);
  });
});
