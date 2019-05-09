/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import getRouteProps from '../getInitialData/utils/getRouteProps';

const loadInitialData = async (url, routes) => {
  const { route, match } = getRouteProps(routes, url);

  if (!route.getInitialData) {
    return {};
  }

  return route.getInitialData({ match });
};

export default loadInitialData;
