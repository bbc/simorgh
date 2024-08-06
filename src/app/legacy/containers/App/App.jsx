import { renderRoutes } from 'react-router-config';
import pick from 'ramda/src/pick';
import mergeAll from 'ramda/src/mergeAll';
import path from 'ramda/src/path';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';

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
    mvtExperiments,
    isUK,
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
    bbcOrigin,
    showAdsBasedOnLocation,
    showCookieBannerBasedOnCountry,
    mvtExperiments,
    isUK,
  });
};

export default App;
