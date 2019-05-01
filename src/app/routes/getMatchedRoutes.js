import { matchRoutes } from 'react-router-config';

const getMatchedRoutes = (url, routes) => {
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  return matchedRoutes[0];
};

export default getMatchedRoutes;
