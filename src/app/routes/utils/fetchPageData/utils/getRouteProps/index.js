import { matchRoutes } from 'react-router-config';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { variantSanitiser } from '#lib/utilities/variantHandler';
import { fallbackAmpParam, fallbackServiceParam } from './routeFallbackParams';

const getRouteProps = (routes, url) => {
  const matchedRoutes = matchRoutes(routes, url);

  const route = path([0, 'route'], matchedRoutes);
  const match = path([0, 'match'], matchedRoutes);
  const params = pathOr({}, ['params'], match);

  const amp = path(['amp'], params);
  const service = path(['service'], params);
  const variantPath = path(['variant'], params);
  const id = path(['id'], params);
  const errorCode = path(['errorCode'], params);
  const assetUri = path(['assetUri'], params);
  const variant = variantSanitiser(variantPath);

  return {
    isAmp: 'amp' in params ? !!amp : fallbackAmpParam(url),
    service: service || fallbackServiceParam(url),
    variant,
    id,
    assetUri,
    route,
    match,
    errorCode: errorCode ? Number(errorCode) : errorCode,
  };
};

export default getRouteProps;
