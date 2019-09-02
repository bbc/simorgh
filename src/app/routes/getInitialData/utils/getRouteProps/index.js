import { matchRoutes } from 'react-router-config';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { fallbackAmpParam, fallbackServiceParam } from './routeFallbackParams';

const getRouteProps = (routes, url) => {
  const matchedRoutes = matchRoutes(routes, url);

  const route = path([0, 'route'], matchedRoutes);
  const match = path([0, 'match'], matchedRoutes);
  const params = pathOr({}, ['params'], match);

  const amp = path(['amp'], params);
  const service = path(['service'], params);
  const id = path(['id'], params);

  return {
    isAmp: 'amp' in params ? !!amp : fallbackAmpParam(url),
    service: service || fallbackServiceParam(url),
    id,
    route,
    match,
  };
};

export default getRouteProps;
