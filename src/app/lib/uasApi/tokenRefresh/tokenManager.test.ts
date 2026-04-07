import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshToken';
import ensureTokens, { validateToken } from './tokenManager';

jest.mock('js-cookie');
jest.mock('#app/lib/utilities/onClient');
jest.mock('./refreshToken');

const mockCookieGet = Cookie.get as jest.Mock;
const mockOnClient = onClient as jest.Mock;
const mockRefreshTokens = refreshTokens as jest.Mock;

const ONE_HOUR_FROM_NOW = Math.floor(Date.now() / 1000) + 3600;
const ONE_HOUR_AGO = Math.floor(Date.now() / 1000) - 3600;
const FOUR_MINUTES_FROM_NOW = Math.floor(Date.now() / 1000) + 4 * 60;

const createTestToken = (expSeconds: number): string => {
  const payload = btoa(JSON.stringify({ exp: expSeconds }));
  return `header.${payload}.signature`;
};

describe('validateToken', () => {
  it('returns false for a non-JWT string', () => {
    expect(validateToken('not-a-jwt')).toBe(false);
  });

  it('returns false for a token with no exp claim', () => {
    const payload = btoa(JSON.stringify({ sub: 'user123' }));
    expect(validateToken(`header.${payload}.sig`)).toBe(false);
  });

  it('returns false for an expired token', () => {
    expect(validateToken(createTestToken(ONE_HOUR_AGO))).toBe(false);
  });

  it('returns false for a token expiring within the 5-minute buffer', () => {
    expect(validateToken(createTestToken(FOUR_MINUTES_FROM_NOW))).toBe(false);
  });

  it('returns true for a token with expiry well beyond the buffer', () => {
    expect(validateToken(createTestToken(ONE_HOUR_FROM_NOW))).toBe(true);
  });
});

describe('ensureTokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClient.mockReturnValue(true);
    mockRefreshTokens.mockResolvedValue(undefined);
  });

  it('does nothing when not running on the client', async () => {
    mockOnClient.mockReturnValue(false);
    await ensureTokens();
    expect(mockRefreshTokens).not.toHaveBeenCalled();
  });

  it('does not refresh when both tokens are present and ckns_id is valid', async () => {
    const validToken = createTestToken(ONE_HOUR_FROM_NOW);
    mockCookieGet.mockImplementation((name: string) => {
      if (name === 'ckns_id') return validToken;
      if (name === 'ckns_atkn') return 'valid-access-token';
      return undefined;
    });

    await ensureTokens();

    expect(mockRefreshTokens).not.toHaveBeenCalled();
  });

  it('triggers refresh when ckns_id cookie is missing', async () => {
    mockCookieGet.mockImplementation((name: string) => {
      if (name === 'ckns_atkn') return 'valid-access-token';
      return undefined;
    });

    await ensureTokens();

    expect(mockRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('triggers refresh when ckns_atkn cookie is missing', async () => {
    const validToken = createTestToken(ONE_HOUR_FROM_NOW);
    mockCookieGet.mockImplementation((name: string) => {
      if (name === 'ckns_id') return validToken;
      return undefined;
    });

    await ensureTokens();

    expect(mockRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('triggers refresh when ckns_id is expired', async () => {
    const expiredToken = createTestToken(ONE_HOUR_AGO);
    mockCookieGet.mockImplementation((name: string) => {
      if (name === 'ckns_id') return expiredToken;
      if (name === 'ckns_atkn') return 'valid-access-token';
      return undefined;
    });

    await ensureTokens();

    expect(mockRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('triggers refresh when ckns_id expires within the buffer window', async () => {
    const soonExpiringToken = createTestToken(FOUR_MINUTES_FROM_NOW);
    mockCookieGet.mockImplementation((name: string) => {
      if (name === 'ckns_id') return soonExpiringToken;
      if (name === 'ckns_atkn') return 'valid-access-token';
      return undefined;
    });

    await ensureTokens();

    expect(mockRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('includes the original error message when the refresh request fails', async () => {
    mockCookieGet.mockReturnValue(undefined);
    mockRefreshTokens.mockRejectedValue(new Error('Network error'));

    await expect(ensureTokens()).rejects.toThrow(
      'Error while ensuring tokens: Network error',
    );
  });

  it('does not throw when refresh succeeds', async () => {
    mockCookieGet.mockReturnValue(undefined);
    mockRefreshTokens.mockResolvedValue(undefined);

    await expect(ensureTokens()).resolves.toBeUndefined();
  });
});
