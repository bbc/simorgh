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
  const mockIdctaConfig = {
    idctaBaseUrl: 'https://idcta.test.api.bbc.com/idcta',
    signInUrl: '/signin',
    registerUrl: '/register',
    'id-availability': 'GREEN',
    initialIsSignedIn: false,
  };

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

    expect(result).toEqual(mockIdctaConfig);
    expect(mockFetchIdctaConfig).toHaveBeenCalled();
  });

  it('should fetch config when service matches in local environment', async () => {
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: true, value: 'hindi|mundo' },
    });
    mockIsLocal.mockReturnValue(true);
    mockFetchIdctaConfig.mockResolvedValue(mockIdctaConfig);

    const result = await getIdctaConfig(mockToggles, 'hindi');

    expect(result).toEqual(mockIdctaConfig);
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

    expect(result).toEqual(mockIdctaConfig);
  });

  it('should return null when config is missing id-availability field', async () => {
    const invalidConfig = {
      signInUrl: '/signin',
    };

    mockFetchIdctaConfig.mockResolvedValue(invalidConfig);

    const result = await getIdctaConfig(mockToggles, mockService);

    expect(result).toBeNull();
  });
});
