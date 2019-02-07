import { matchRoutes } from 'react-router-config';

const loadInitialData = async (url, routes) => {
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  const { route, match } = matchedRoutes[0];

  if (!route.getInitialData) {
    return {};
  }

  return await route.getInitialData({ match });
};

export default loadInitialData;
