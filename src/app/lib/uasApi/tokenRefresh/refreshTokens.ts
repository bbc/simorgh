import isLive from '#app/lib/utilities/isLive';
import { UAS_CLIENT_TIMEOUT_MS } from '..';
import UasError from '../errors';

const getSessionUrl = (): string => {
  return isLive()
    ? 'https://session.bbc.com/session'
    : 'https://session.test.bbc.com/session';
};

const refreshTokens = async (): Promise<Response> => {
  const url = getSessionUrl();

  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(UAS_CLIENT_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new UasError(response.status);
  }

  return response;
};

export default refreshTokens;
