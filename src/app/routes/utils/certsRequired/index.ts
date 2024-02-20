import getEnvironment from '../getEnvironment';

export default (pathname: string) => {
  const environment = getEnvironment(pathname);
  const isLocal = environment === 'local' || !environment;
  const BFF_IS_LOCAL =
    process.env.JEST_WORKER_ID === undefined &&
    process?.env?.BFF_PATH?.includes('localhost:3210');

  return (
    !BFF_IS_LOCAL &&
    !isLocal &&
    process.env.INTEGRATION_TEST_BUILD !== 'true' &&
    process.env.LIGHTHOUSE_BUILD !== 'true'
  );
};
