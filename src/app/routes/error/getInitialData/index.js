import { matchPath } from 'react-router';

export default (pathRegex) => (pathname) => {
  const { params } = matchPath(pathname, {
    path: pathRegex,
  });
  const errorCode = Number(params.errorCode);

  return Promise.resolve({ status: 200, errorCode });
};
