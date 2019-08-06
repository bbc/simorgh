import { matchRoutes } from 'react-router-config';
import pathOr from 'ramda/src/pathOr';
import services from '../../../lib/config/services/loadableConfig';

const guessAmp = url => {
  return url.includes('.amp') || url.includes('/amp');
};

const guessService = url => {
  const foundService = url
    .split('/')
    .filter(Boolean)
    .find(part => Object.keys(services).includes(part));

  return foundService || 'news';
};

const getRouteProps = (routes, url) => {
  const matchedRoutes = matchRoutes(routes, url);

  const amp = pathOr(null, [0, 'match', 'params', 'amp'], matchedRoutes);
  const service = pathOr(
    null,
    [0, 'match', 'params', 'service'],
    matchedRoutes,
  );
  const id = pathOr(null, [0, 'match', 'params', 'id'], matchedRoutes);
  const route = pathOr(null, [0, 'route'], matchedRoutes);
  const match = pathOr(null, [0, 'match'], matchedRoutes);

  return {
    isAmp: amp ? !!amp : guessAmp(url),
    service: service || guessService(url),
    id,
    route,
    match,
  };
};

export default getRouteProps;
