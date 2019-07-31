export const isLocal =
  process && process.env && process.env.APP_ENV === 'local';

const getEnv = origin => {
  if (isLocal || origin.includes('local')) {
    return 'local';
  }

  if (origin.includes('test')) {
    return 'test';
  }

  return 'live';
};

export default getEnv;
