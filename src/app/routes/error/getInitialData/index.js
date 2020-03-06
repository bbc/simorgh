import { matchPath } from 'react-router';

export default pathRegex => pathname => {
  const match = matchPath(pathname, {
    path: pathRegex,
  });
  const errorCode = match ? Number(match.params.errorCode) : 404;

  return Promise.resolve({ status: 200, errorCode });
};
