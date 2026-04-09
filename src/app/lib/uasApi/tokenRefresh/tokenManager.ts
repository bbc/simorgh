import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshToken';

const TOKEN_COOKIE_NAME = 'ckns_id';
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes before expiry
const TOKEN_EXPIRY_TIMESTAMP = 'tkn-exp';

interface DecodedTokenPayload {
  [TOKEN_EXPIRY_TIMESTAMP]?: number;
  [key: string]: unknown;
}

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

export const ensureTokens = async (): Promise<void> => {
  if (!onClient()) return;
  if (hasValidTokens()) return;

  try {
    await refreshTokens();
  } catch (error) {
    throw new Error(
      `Error while ensuring tokens: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export default ensureTokens;
