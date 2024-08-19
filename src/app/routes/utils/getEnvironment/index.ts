import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

import Url from 'url-parse';

export default (pathname: string) => {
  const url = new Url(`https://www.bbc.com${pathname}`, true);

  const rendererEnv = url?.query?.renderer_env;

  switch (rendererEnv) {
    case 'test':
      return 'test';
    case 'live':
      return 'live';
    default:
      return getEnvConfig().SIMORGH_APP_ENV;
  }
};
