import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export default (pathname: string) => {
  const url = new URL(pathname, 'https://www.bbc.com');
  const rendererEnv = url.searchParams.get('renderer_env');

  switch (rendererEnv) {
    case 'test':
      return 'test';
    case 'live':
      return 'live';
    default:
      return getEnvConfig().SIMORGH_APP_ENV;
  }
};
