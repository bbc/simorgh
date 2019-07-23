import { matchRoutes } from 'react-router-config';

const getRouteProps = (routes, url) => {
  let variantPath = null;
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  const { route, match } = matchedRoutes[0];
  const { amp, id, service, variant } = match.params;

  if (variant) {
    variantPath = variant.slice(1);
  }

  const isAmp = amp ? true : false; // eslint-disable-line no-unneeded-ternary

  return { isAmp, service, id, serviceVariant: variantPath, route, match };
};

export default getRouteProps;
