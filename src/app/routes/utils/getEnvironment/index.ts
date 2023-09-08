import { Environments } from '#app/models/types/global';

export default (pathname: string) => {
  let environment = process.env.SIMORGH_APP_ENV;

  if (process.env.CI) {
    environment = 'local';
  }

  if (pathname.includes('renderer_env=test')) {
    environment = 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    environment = 'live';
  }

  console.log({
    CI: process.env.CI,
    APP_ENV: process.env.SIMORGH_APP_ENV,
    pathname,
    environment,
  });

  return environment as Environments;
};
