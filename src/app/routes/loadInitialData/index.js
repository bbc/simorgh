/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import getRouteProps from '../getInitialData/utils/getRouteProps';
import getDials from './getDials';

const loadInitialData = async (url, routes) => {
  const { route, match } = getRouteProps(routes, url);

  if (!route.getInitialData) {
    return {};
  }

  const data = await route.getInitialData({ match });

  data.dials = getDials();
  return data;
};

export default loadInitialData;
