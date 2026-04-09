import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshToken';
import ensureTokens, { isTokenValidFor } from './tokenManager';

jest.mock('js-cookie');
jest.mock('#app/lib/utilities/onClient');
jest.mock('./refreshToken');

const mockCookieGet = Cookie.get as jest.Mock;
const mockOnClient = onClient as jest.Mock;
const mockRefreshTokens = refreshTokens as jest.Mock;

const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes
const ONE_HOUR_FROM_NOW = Date.now() + 3600 * 1000;
const ONE_HOUR_AGO = Date.now() - 3600 * 1000;
const FOUR_MINUTES_FROM_NOW = Date.now() + 4 * 60 * 1000;

const createTestToken = (expiryMs: number): string => {
  const payload = btoa(JSON.stringify({ 'tkn-exp': expiryMs }));
  return encodeURIComponent(payload);
};

describe('isTokenValidFor', () => {
  it('returns false for an empty token', () => {
    expect(isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, '')).toBe(false);
  });

  it('returns false for an expired token', () => {
    const expiredToken = createTestToken(ONE_HOUR_AGO);
    expect(isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, expiredToken)).toBe(false);
  });

  it('returns false for a token expiring within the buffer window', () => {
    const soonExpiringToken = createTestToken(FOUR_MINUTES_FROM_NOW);
    expect(isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, soonExpiringToken)).toBe(
      false,
    );
  });

  it('returns true for a token with expiry well beyond the buffer', () => {
    const validToken = createTestToken(ONE_HOUR_FROM_NOW);
    expect(isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, validToken)).toBe(true);
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

  it('does not refresh when ckns_id token is valid and present', async () => {
    const validToken = createTestToken(ONE_HOUR_FROM_NOW);
    mockCookieGet.mockReturnValue(validToken);

    await ensureTokens();

    expect(mockRefreshTokens).not.toHaveBeenCalled();
  });

  it('triggers refresh when ckns_id cookie is missing', async () => {
    mockCookieGet.mockReturnValue(undefined);

    await ensureTokens();

    expect(mockRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('triggers refresh when ckns_id is expired', async () => {
    const expiredToken = createTestToken(ONE_HOUR_AGO);
    mockCookieGet.mockReturnValue(expiredToken);

    await ensureTokens();

    expect(mockRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('triggers refresh when ckns_id expires within the buffer window', async () => {
    const soonExpiringToken = createTestToken(FOUR_MINUTES_FROM_NOW);
    mockCookieGet.mockReturnValue(soonExpiringToken);

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
});
