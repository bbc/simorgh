/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import { matchRoutes } from 'react-router-config';
import getDials from './getDials';

const loadInitialData = async (url, routes) => {
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  const { route, match } = matchedRoutes[0];

  if (!route.getInitialData) {
    return {};
  }

  const data = await route.getInitialData({ match });

  data.dials = getDials();
  return data;
};

export default loadInitialData;
