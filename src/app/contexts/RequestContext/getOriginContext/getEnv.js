const getEnv = origin => {
  if (origin.includes('.stage.')) {
    return 'stage';
  }

  if (origin.includes('.test.')) {
    return 'test';
  }

  if (origin.includes('localhost')) {
    return 'local';
  }

  return 'live';
};

export default getEnv;
