import { Environments } from '#app/models/types/global';

import Url from 'url-parse';

export default (pathname: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = new Url(`https://www.bbc.com${pathname}`, true);

  // const rendererEnv = url?.query?.renderer_env;
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
      return process.env.SIMORGH_APP_ENV as Environments;
  }
};
