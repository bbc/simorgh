/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import getMatchedRoutes from '../getMatchedRoutes';

const loadInitialData = async (url, routes) => {
  const { route, match } = getMatchedRoutes(url, routes);

  if (!route.getInitialData) {
    return {};
  }

  return route.getInitialData({ match });
};

export default loadInitialData;
