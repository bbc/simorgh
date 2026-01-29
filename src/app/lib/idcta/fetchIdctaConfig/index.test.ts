import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import isLocal from '#app/lib/utilities/isLocal';
import { getIdctaConfigUrl } from '../getIdctaBaseUrl';
import fetchIdctaConfig from '.';

jest.mock('#app/lib/utilities/getToggleDefinition');
jest.mock('#app/lib/utilities/isLocal');
jest.mock('../getIdctaBaseUrl');
jest.mock('#app/lib/logger.node', () =>
  jest.fn(() => ({
    error: jest.fn(),
  })),
);

const mockGetToggleDefinitions = getToggleDefinitions as jest.Mock;
const mockIsLocal = isLocal as jest.Mock;
const mockGetIdctaConfigUrl = getIdctaConfigUrl as jest.Mock;

global.fetch = jest.fn();

describe('fetchIdctaConfig', () => {
  const mockToggles = {};
  const mockService = 'mundo';
  const mockIdctaConfigUrl = 'https://idcta.test.api.bbc.com/idcta/config';
  const mockIdctaConfig = {
    idctaBaseUrl: 'https://idcta.test.api.bbc.com/idcta',
    signInUrl: '/signin',
    registerUrl: '/register',
    'id-availability': true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetIdctaConfigUrl.mockReturnValue(mockIdctaConfigUrl);
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: true, value: 'mundo' },
    });
  });

  it('should return null when account toggle is disabled', async () => {
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: false },
    });

    const result = await fetchIdctaConfig(mockToggles, mockService);

    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should fetch config when account toggle is enabled', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockIdctaConfig),
    });

    const result = await fetchIdctaConfig(mockToggles, mockService);

    expect(result).toEqual(mockIdctaConfig);
    expect(fetch).toHaveBeenCalledWith(mockIdctaConfigUrl);
  });

  it('should fetch config when service matches in local environment', async () => {
    mockGetToggleDefinitions.mockReturnValue({
      account: { enabled: true, value: 'hindi|mundo' },
    });
    mockIsLocal.mockReturnValue(true);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockIdctaConfig),
    });

    const result = await fetchIdctaConfig(mockToggles, 'hindi');

    expect(result).toEqual(mockIdctaConfig);
    expect(fetch).toHaveBeenCalledWith(mockIdctaConfigUrl);
  });

  it('should return null when service value does not match in local environment', async () => {
    mockIsLocal.mockReturnValue(true);
    const result = await fetchIdctaConfig(mockToggles, 'hausa');

    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should return null when fetch throws an error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await fetchIdctaConfig(mockToggles, mockService);
    expect(result).toBeNull();
  });

  it('should return null when fetch fails with 500', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchIdctaConfig(mockToggles, mockService);
    expect(result).toBeNull();
  });

  it('should return parsed config when fetch is successful', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockIdctaConfig),
    });

    const result = await fetchIdctaConfig(mockToggles, mockService);

    expect(result).toEqual(mockIdctaConfig);
  });

  it('should return null when config is missing id-availability field', async () => {
    const invalidConfig = {
      signInUrl: '/signin',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(invalidConfig),
    });

    const result = await fetchIdctaConfig(mockToggles, mockService);

    expect(result).toBeNull();
  });
});
