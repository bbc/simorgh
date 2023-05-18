import { useState } from 'react';
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
      ['service', 'isAmp', 'isApp', 'variant', 'id', 'assetUri', 'errorCode'],
      routeProps,
    ),
    pick(
      ['pageData', 'status', 'error', 'timeOnServer', 'errorCode'],
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
    path: location,
    showAdsBasedOnLocation,
    toggles,
    mvtExperiments,
  } = initialData;

  const routeProps = getRouteProps(location);

  const [state] = useState(
    mapToState({
      pathname: location,
      initialData,
      routeProps,
      toggles,
    }),
  );

  const routeHasChanged = state.pathname !== location;

  return renderRoutes(routes, {
    ...state,
    loading: routeHasChanged,
    bbcOrigin,
    showAdsBasedOnLocation,
    mvtExperiments,
  });
};

export default App;
