import nodeLogger from '#lib/logger.node';
import {
  CLIENT_SIDE_REQUEST_FAILED,
  SERVER_SIDE_REQUEST_FAILED,
} from '#lib/logger.const';
import onClient from '#lib/utilities/onClient';
import routes from '#app/routes';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';

const logger = nodeLogger(__filename);

export default async ({ path, headers }) => {
  const routeProps = getRouteProps(routes, path);

  try {
    const pageData = await routeProps.route.getInitialData({
      path,
      service: routeProps.service,
      variant: routeProps.variant,
    });

    return {
      data: pageData,
      ...routeProps,
    };
  } catch (error) {
    logger.error(
      onClient() ? CLIENT_SIDE_REQUEST_FAILED : SERVER_SIDE_REQUEST_FAILED,
      {
        status: onClient() ? 502 : 500,
        message: error.toString(),
        url: path,
        headers,
      },
    );

    return {
      ...routeProps,
      status: 500,
      error,
    };
  }
};
