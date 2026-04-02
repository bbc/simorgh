import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import refreshTokens from './refreshToken';

interface TokenValidationResult {
  isValid: boolean;
  shouldRefresh: boolean;
}

const TOKEN_COOKIE_NAME = 'ckns_id';
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry

const getStoredToken = (): string | undefined => {
  if (!onClient()) {
    return undefined;
  }
  return Cookie.get(TOKEN_COOKIE_NAME);
};

const validateToken = (token: string): boolean => {};

const checkTokenValidity = (): TokenValidationResult => {};

export const ensureTokens = async (): Promise<void> => {
  //   if (shouldRefresh) {
  //     try {
  //       await refreshTokens();
  //     } catch (error) {
  //       throw new Error(
  //         `Failed to refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`,
  //       );
  //     }
  //   }
};

export default ensureTokens;
