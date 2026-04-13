import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshTokens';

const TOKEN_COOKIE_NAME = 'ckns_id';
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes before expiry
const TOKEN_EXPIRY_TIMESTAMP = 'tkn-exp';

interface DecodedTokenPayload {
  [TOKEN_EXPIRY_TIMESTAMP]?: number;
  [key: string]: unknown;
}

// Lock mechanism to prevent parallel token refreshes
let tokenRefreshPromise: Promise<void> | null = null;

const decodeBase64JsonString = (encodedString: string): unknown => {
  try {
    const decodedValue = window.atob(encodedString);
    return JSON.parse(decodedValue);
  } catch (error) {
    return null;
  }
};

export const getDecodedToken = (token: string): DecodedTokenPayload | null => {
  const decodedString = decodeURIComponent(token);
  const decoded = decodeBase64JsonString(decodedString);

  return (decoded as DecodedTokenPayload) || null;
};

export const isTokenValidFor = (durationMs: number, token: string): boolean => {
  const decodedToken = getDecodedToken(token);
  const tokenExpiry = decodedToken?.[TOKEN_EXPIRY_TIMESTAMP];

  if (typeof tokenExpiry !== 'number') {
    return false;
  }

  const earlyExpiryDate = new Date(tokenExpiry - durationMs);
  return Date.now() < earlyExpiryDate.getTime();
};

const hasValidTokens = (): boolean => {
  const idToken = Cookie.get(TOKEN_COOKIE_NAME);
  if (!idToken) return false;
  return isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, idToken);
};

// Ensure tokens are valid before making the API request.
// This will refresh tokens if they are expired or about to expire.
export const refreshTokensIfExpired = async (): Promise<void> => {
  if (!onClient()) return;
  if (hasValidTokens()) return;

  // If refresh is already in progress, wait for it instead of starting a new one
  if (tokenRefreshPromise) {
    await tokenRefreshPromise;
    return;
  }

  // Create a new refresh promise and store it
  tokenRefreshPromise = (async () => {
    try {
      await refreshTokens();
    } catch (error) {
      throw new Error(
        `Error while ensuring tokens: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      // Clear the promise after refresh completes (success or failure)
      tokenRefreshPromise = null;
    }
  })();

  // Wait for the refresh to complete
  await tokenRefreshPromise;
};
