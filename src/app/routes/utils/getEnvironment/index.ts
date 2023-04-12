// eslint-disable-next-line import/no-unresolved
import { Environments } from '#app/models/types/global.js';

export default (pathname: string) => {
  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV as Environments;
};
