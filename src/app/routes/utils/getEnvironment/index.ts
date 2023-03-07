export default (pathname: string) => {
  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }
  // CAF testing will always hit the Live environment so we can test against real assets
  if (pathname.includes('renderer_env=caf')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV;
};
