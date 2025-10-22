import { renderRoutes } from 'react-router-config';
import pick from 'ramda/src/pick';
import mergeAll from 'ramda/src/mergeAll';
import path from 'ramda/src/path';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';
import errorNoRouteMatch from '#app/routes/errorNoRouteMatch';

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

  const { enabled: siteIsLiveToAudience, value: permittedPathString } =
    toggles.siteIsLiveToAudience || {
      enabled: true,
      value: '',
    };

  let permittedPaths = [];
  if (siteIsLiveToAudience) {
    permittedPaths = [pathname];
  } else {
    permittedPaths = permittedPathString?.split(',');
  }

  console.log({ siteIsLiveToAudience, permittedPathString, permittedPaths });

  const routesToRender =
    siteIsLiveToAudience && permittedPaths.includes(pathname)
      ? routes
      : [errorNoRouteMatch];

  return renderRoutes(routesToRender, {
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
