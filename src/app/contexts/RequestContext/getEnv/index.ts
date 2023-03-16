import { AppEnvs } from '#app/models/types/global';

const getEnv = (origin: string): AppEnvs => {
  if (origin.includes('local')) {
    return 'local';
  }

  if (origin.includes('test') || origin.includes('stage')) {
    return 'test';
  }

  return 'live';
};

export default getEnv;
