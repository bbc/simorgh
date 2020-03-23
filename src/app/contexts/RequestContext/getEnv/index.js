const getEnv = (origin) => {
  if (origin.includes('local')) {
    return 'local';
  }

  if (origin.includes('test')) {
    return 'test';
  }

  return 'live';
};

export default getEnv;
