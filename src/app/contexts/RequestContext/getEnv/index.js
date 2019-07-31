const getEnv = origin => {
  if (
    origin.includes('local') ||
    (process && process.env && process.env.APP_ENV === 'local')
  ) {
    return 'local';
  }

  if (origin.includes('test')) {
    return 'test';
  }

  return 'live';
};

export default getEnv;
