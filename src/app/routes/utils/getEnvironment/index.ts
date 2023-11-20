import { Environments } from '#app/models/types/global';

export default (pathname: string) => {
  const url = new URL(`https://www.bbc.com${pathname}`);

  const pathParams = new URLSearchParams(url.search);

  const rendererEnv = pathParams.get('renderer_env');

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
      return process.env.SIMORGH_APP_ENV as Environments;
  }
};
