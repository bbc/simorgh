import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshToken';

const TOKEN_COOKIE_NAME = 'ckns_id';
const AUTH_TOKEN_COOKIE_NAME = 'ckns_atkn';
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes before expiry
const TOKEN_EXPIRY_TIMESTAMP = 'tkn-exp';

const decodeBase64JsonString = encodedString => {
  try {
    const decodedValue = window.atob(encodedString);
    return JSON.parse(decodedValue);
  } catch (error) {
    return null;
  }
};

export const getDecodedToken = (token?: string) => {
  const decodedString = decodeURIComponent(token || '');

  return decodeBase64JsonString(decodedString);
};

// const decodeTokenExpiry = (token: string): number | null => {
//   try {
//     const parts = token.split('.');
//     if (parts.length < 2 || !parts[1]) return null;
//     const paddedPayload = parts[1]
//       .replace(/-/g, '+')
//       .replace(/_/g, '/')
//       .padEnd(Math.ceil(parts[1].length / 4) * 4, '=');
//     const payload = JSON.parse(atob(paddedPayload));
//     console.log('Decoding token expiry for token:', payload.exp * 1000);
//     return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
//   } catch {
//     return null;
//   }
// };

export const isTokenValidFor = (durationMs: number, token?: string) => {
  if (!token) return false;

  const { [TOKEN_EXPIRY_TIMESTAMP]: tokenExpiry } =
    getDecodedToken(token) || {};

  const earlyExpiryDate = new Date(tokenExpiry - durationMs);
  console.log(
    `Checking token validity: now=${Date.now()}, tokenExpiry=${tokenExpiry}, earlyExpiryDate=${earlyExpiryDate.getTime()}`,
  );
  return Date.now() < earlyExpiryDate.getTime();
};

// export const validateToken = (token: string): boolean => {
//   // const expiryMs = decodeTokenExpiry(token);
//   return isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, token);
//   // if (expiryMs === null) return false;
//   // return Date.now() < expiryMs - TOKEN_EXPIRY_BUFFER_MS;
// };

const hasValidTokens = (): boolean => {
  const idToken = Cookie.get(TOKEN_COOKIE_NAME);
  const atknToken = Cookie.get(AUTH_TOKEN_COOKIE_NAME);
  if (!idToken || !atknToken) return false;
  return isTokenValidFor(TOKEN_EXPIRY_BUFFER_MS, idToken);
};

export const ensureTokens = async (): Promise<void> => {
  if (!onClient()) return;
  if (hasValidTokens()) return;
  console.log('Tokens are invalid or expired', hasValidTokens());
  try {
    await refreshTokens();
  } catch (error) {
    throw new Error(
      `Error while ensuring tokens: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export default ensureTokens;
