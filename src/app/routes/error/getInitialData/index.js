import { ERROR_PAGE } from '#routes/utils/pageTypes';
import { matchRoutes } from 'react-router-config';

export default pathRegex =>
  ({ path: pathname }) => {
    const matchingRoute = matchRoutes([{ path: pathRegex }], pathname);

    const errorCode = Number(
      matchingRoute?.[0]?.match?.params?.errorCode || 404,
    );

    return Promise.resolve({
      status: 200,
      errorCode,
      pageData: { metadata: { type: ERROR_PAGE } },
    });
  };
