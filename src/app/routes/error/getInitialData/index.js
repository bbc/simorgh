import { matchRoutes } from 'react-router-config';

export default pathRegex =>
  ({ path: pathname }) => {
    const matchingRoute = matchRoutes([{ path: pathRegex }], pathname);

    const errorCode = Number(matchingRoute[0].match.params.errorCode);

    return Promise.resolve({ status: 200, errorCode });
  };
