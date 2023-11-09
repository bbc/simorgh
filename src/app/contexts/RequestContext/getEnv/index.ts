const getEnv = (origin: string) => {
  if (origin.includes('local')) {
    return 'local';
  }

  if (origin.includes('test') || origin.includes('stage')) {
    return 'test';
  }

  return 'live';
};

export default getEnv;
