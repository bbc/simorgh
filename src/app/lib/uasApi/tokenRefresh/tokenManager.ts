import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshToken';

const TOKEN_COOKIE_NAME = 'ckns_id';
const AUTH_TOKEN_COOKIE_NAME = 'ckns_atkn';
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes before expiry

const decodeTokenExpiry = (token: string): number | null => {
  try {
    const parts = token.split('.');
    if (parts.length < 2 || !parts[1]) return null;
    const paddedPayload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(parts[1].length / 4) * 4, '=');
    const payload = JSON.parse(atob(paddedPayload));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const validateToken = (token: string): boolean => {
  const expiryMs = decodeTokenExpiry(token);
  if (expiryMs === null) return false;
  return Date.now() < expiryMs - TOKEN_EXPIRY_BUFFER_MS;
};

const hasValidTokens = (): boolean => {
  const idToken = Cookie.get(TOKEN_COOKIE_NAME);
  const atknToken = Cookie.get(AUTH_TOKEN_COOKIE_NAME);
  if (!idToken || !atknToken) return false;
  return validateToken(idToken);
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
