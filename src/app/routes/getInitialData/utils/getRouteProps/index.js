import { matchRoutes } from 'react-router-config';
import pathOr from 'ramda/src/pathOr';
import { fallbackAmpParam, fallbackServiceParam } from './routeFallbackParams';

const getRouteProps = (routes, url) => {
  const matchedRoutes = matchRoutes(routes, url);

  const route = pathOr(undefined, [0, 'route'], matchedRoutes);
  const match = pathOr(undefined, [0, 'match'], matchedRoutes);
  const params = pathOr({}, ['params'], match);

  const amp = pathOr(undefined, ['amp'], params);
  const service = pathOr(fallbackServiceParam(url), ['service'], params);
  const id = pathOr(undefined, ['id'], params);

  return {
    isAmp: 'amp' in params ? !!amp : fallbackAmpParam(url),
    service,
    id,
    route,
    match,
  };
};

export default getRouteProps;
