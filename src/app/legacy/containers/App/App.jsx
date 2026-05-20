import mergeAll from 'ramda/src/mergeAll';
import path from 'ramda/src/path';
import pick from 'ramda/src/pick';
import { renderRoutes } from 'react-router-config';

import routes from '#app/routes';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';

const mapToState = ({ pathname, initialData, routeProps, toggles }) => {
  const pageType = path(['route', 'pageType'], routeProps);

  return mergeAll([
    pick(
      [
        'service',
        'isAmp',
        'isApp',
        'isLite', // isLite is here as it can come from the .lite route extension
        'variant',
        'id',
        'assetUri',
        'cspHeader',
        'nonce',
        'errorCode',
      ],
      routeProps,
    ),
    pick(
      [
        'pageData',
        'status',
        'error',
        'timeOnServer',
        'errorCode',
        'isLite', // isLite is here as it can come from the 'save-data' header setting
        'nonce',
        'cspHeader',
        'navItems',
      ],
      initialData,
    ),
    {
      pathname,
      pageType,
      toggles,
    },
  ]);
};

export const App = ({ initialData, bbcOrigin }) => {
  const {
    path: pathname,
    showAdsBasedOnLocation,
    showCookieBannerBasedOnCountry,
    toggles,
    serverSideExperiments,
    isUK,
    country,
  } = initialData;

  const routeProps = getRouteProps(pathname);

  const state = mapToState({
    pathname,
    initialData,
    routeProps,
    toggles,
  });

  return renderRoutes(routes, {
    ...state,
    country,
    bbcOrigin,
    showAdsBasedOnLocation,
    showCookieBannerBasedOnCountry,
    serverSideExperiments,
    isUK,
  });
};

export default App;
