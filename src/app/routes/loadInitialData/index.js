/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import { matchRoutes } from 'react-router-config';

const loadInitialData = async (url, routes) => {
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  const { route, match } = matchedRoutes[0];

  if (!route.data) {
    console.log('oopsie')
    return {};
  }

  return route.data({ match });
};

export default loadInitialData;
