import isLive from '#app/lib/utilities/isLive';

const getSessionUrl = (): string => {
  return isLive()
    ? 'https://session.bbc.com/session'
    : 'https://session.test.bbc.com/session';
};

const getRefreshTokenFetchOptions = (): RequestInit => ({
  credentials: 'include',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

const refreshTokens = async (): Promise<Response> => {
  const url = getSessionUrl();
  const options = getRefreshTokenFetchOptions();

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Token refresh failed with status code ${response.status}`);
  }

  return response;
};

export default refreshTokens;
