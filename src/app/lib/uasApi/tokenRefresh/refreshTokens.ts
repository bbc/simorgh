import isLive from '#app/lib/utilities/isLive';

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
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed with status code ${response.status}`);
  }

  return response;
};

export default refreshTokens;
