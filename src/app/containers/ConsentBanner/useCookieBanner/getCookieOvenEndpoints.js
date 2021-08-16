export default ({ origin, policy }) => {
  const path = 'cookieoven';
  const params = `policy=${policy}`;

  if (origin.includes('localhost')) {
    const localhostEndpoint = `${origin}/${path}?${params}`;

    return [localhostEndpoint];
  }

  const liveOrigin = 'https://www.bbc';
  const testOrigin = 'https://www.test.bbc';
  const isTestEnv = ['.stage.', '.test.'].some(subDomain =>
    origin.includes(subDomain),
  );
  const cookieOvenOrigin = isTestEnv ? testOrigin : liveOrigin;
  const outsideUkEndpoint = `${cookieOvenOrigin}.com/${path}?${params}`;
  const ukEndpoint = `${cookieOvenOrigin}.co.uk/${path}?${params}`;

  return [outsideUkEndpoint, ukEndpoint];
};
