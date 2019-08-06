import { matchRoutes } from 'react-router-config';
import pathOr from 'ramda/src/pathOr';
import { fallbackAmpParam, fallbackServiceParam } from './routeFallbackParams';

const getRouteProps = (routes, url) => {
  const matchedRoutes = matchRoutes(routes, url);

  const amp = pathOr(undefined, [0, 'match', 'params', 'amp'], matchedRoutes);
  const service = pathOr(
    undefined,
    [0, 'match', 'params', 'service'],
    matchedRoutes,
  );
  const id = pathOr(undefined, [0, 'match', 'params', 'id'], matchedRoutes);
  const route = pathOr(undefined, [0, 'route'], matchedRoutes);
  const match = pathOr(undefined, [0, 'match'], matchedRoutes);

  return {
    isAmp: amp ? !!amp : fallbackAmpParam(url),
    service: service || fallbackServiceParam(url),
    id,
    route,
    match,
  };
};

export default getRouteProps;
