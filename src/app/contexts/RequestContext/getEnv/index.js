const getEnv = origin => {
  if (origin.includes('local')) {
    return 'local';
  }

  if (origin.includes('test')) {
    return 'test';
  }

  if (origin.includes('stage')) {
    return 'stage';
  }

  return 'live';
};

export default getEnv;
