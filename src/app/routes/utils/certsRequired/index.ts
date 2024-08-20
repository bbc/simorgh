import getEnvironment from '../getEnvironment';

export default (pathname: string) => {
  const environment = getEnvironment(pathname);
  const isLocal = environment === 'local' || !environment;
  return (
    !isLocal &&
    process.env.LIGHTHOUSE_BUILD !== 'true' &&
    process.env.CYPRESS_APP_ENV !== 'local'
  );
};
