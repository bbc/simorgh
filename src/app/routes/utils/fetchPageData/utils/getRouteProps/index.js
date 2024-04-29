import { matchRoutes } from 'react-router-config';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { variantSanitiser } from '#lib/utilities/variantHandler';
import isAmpPath from '#app/routes/utils/isAmpPath';
import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';
import routes from '#app/routes';
import fallbackServiceParam from './fallbackServiceParam';

const getNonCanonicalPlatformId = params => {
  const renderPlatform =
    path(['amp'], params) ||
    path(['nonCanonicalArticleRenderPlatform'], params);
  const supportedPlatforms = {
    '.amp': { amp: true },
    '.app': { app: true },
    '.lite': { lite: true },
  };

  return pathOr({}, [renderPlatform], supportedPlatforms);
};

const getRouteProps = url => {
  const matchedRoutes = matchRoutes(routes, url);

  const route = path([0, 'route'], matchedRoutes);
  const match = path([0, 'match'], matchedRoutes);
  const params = pathOr({}, ['params'], match);

  const { amp, app, lite } = getNonCanonicalPlatformId(params);
  const service = path(['service'], params);
  const variantPath = path(['variant'], params);
  const id = path(['id'], params);
  const assetUri = path(['assetUri'], params);
  const variant = variantSanitiser(variantPath);
  const errorCode = path(['errorCode'], params);

  const cpsId =
    service && assetUri
      ? `${service}${variant ? `/${variant}` : ''}/${assetUri}`
      : undefined;

  return {
    isAmp: amp || isAmpPath(url),
    isApp: app || isAppPath(url),
    isLite: lite || isLitePath(url),
    service: service || fallbackServiceParam(url),
    variant,
    id: id || cpsId,
    assetUri,
    route,
    match,
    errorCode: errorCode ? Number(errorCode) : errorCode,
  };
};

export default getRouteProps;
