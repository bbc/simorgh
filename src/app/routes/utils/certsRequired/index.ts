import getEnvironment from '../getEnvironment';

export default (pathname: string) => {
  const environment = getEnvironment(pathname);
  const isLocal = environment === 'local' || !environment;
  const BFF_IS_LOCAL = process?.env?.BFF_PATH?.includes('localhost:3210');

  return (
    !BFF_IS_LOCAL &&
    !isLocal &&
    process.env.LIGHTHOUSE_BUILD !== 'true' &&
    process.env.CYPRESS_APP_ENV !== 'local'
  );
};
