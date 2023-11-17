import { Environments } from '#app/models/types/global';

export default (pathname: string) => {
  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }

  // TODO: Remove once CAF testing is complete
  if (pathname.includes('renderer_env=caftest')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=caflive')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV as Environments;
};
