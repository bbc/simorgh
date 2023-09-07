import { Environments } from '#app/models/types/global';

export default (pathname: string) => {
  if (process.env.CI) {
    return 'local';
  }

  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV as Environments;
};
