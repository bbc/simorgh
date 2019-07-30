const getEnv = origin => {
  if (origin.includes('local')) {
    return 'local';
  }

  if (origin.includes('test')) {
    return 'test';
  }

  return 'live';
};
export const isLocal =
  process && process.env && process.env.APP_ENV === 'local';

export default getEnv;
