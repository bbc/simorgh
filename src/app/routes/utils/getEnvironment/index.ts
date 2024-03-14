import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_pathname: string) => {
  const rendererEnv = 'live' as string;

  switch (rendererEnv) {
    case 'test':
      return 'test';
    case 'live':
      return 'live';
    case 'caftest':
      return 'test';
    case 'caflive':
      return 'live';
    default:
      return getEnvConfig().SIMORGH_APP_ENV;
  }
};
