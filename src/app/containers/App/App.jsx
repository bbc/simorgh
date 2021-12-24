/* eslint-disable react/prop-types */
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import pick from 'ramda/src/pick';
import mergeAll from 'ramda/src/mergeAll';
import path from 'ramda/src/path';

import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import getToggles from '#lib/utilities/getToggles';
import ErrorPage from '#pages/ErrorPage';
import routes from '#app/routes';
import { ERROR_PAGE } from '#app/routes/utils/pageTypes';

const mapToState = ({ pathname, initialData, routeProps, toggles }) => {
  const pageType = path(['route', 'pageType'], routeProps);

  return mergeAll([
    pick(
      ['service', 'isAmp', 'variant', 'id', 'assetUri', 'errorCode'],
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

const getNextPageState = async pathname => {
  const routeProps = getRouteProps(pathname);
  const { service, variant, route } = routeProps;
  const { pageType, getInitialData } = route;
  const toggles = await getToggles(service);
  const initialData = await getInitialData({
    path: pathname,
    service,
    variant,
    pageType,
    toggles,
  });

  return mapToState({ pathname, initialData, routeProps, toggles });
};

const setFocusOnMainHeading = () => {
  const mainHeadingEl = document.querySelector('h1#content');

  if (mainHeadingEl) {
    mainHeadingEl.focus();
  }
};

export const App = ({ initialData, bbcOrigin, history }) => {
  const location = useLocation();
  const { pathname } = location;
  const hasMounted = useRef(false);
  const routeProps = getRouteProps(pathname);
  const previousPath = useRef(null);
  const { showAdsBasedOnLocation, toggles } = initialData;
  const [state, setState] = useState(
    mapToState({
      pathname,
      initialData,
      routeProps,
      toggles,
    }),
  );
  const routeHasChanged = state.pathname !== pathname;

  useEffect(() => {
    if (history.action === 'POP') {
      previousPath.current = null; // clear the previous path on back clicks
    }
    return () => {
      previousPath.current = pathname;
    };
  }, [pathname, history]);

  useEffect(() => {
    if (hasMounted.current) {
      getNextPageState(pathname).then(setState);
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      if (routeHasChanged) {
        window.scrollTo(0, 0);
      } else {
        setFocusOnMainHeading();
      }
    }
  }, [routeHasChanged]);

  const renderRoute = route => {
    const { component: Component } = route;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Component
            {...state}
            bbcOrigin={bbcOrigin}
            previousPath={previousPath.current}
            loading={routeHasChanged}
            showAdsBasedOnLocation={showAdsBasedOnLocation}
          />
        }
      />
    );
  };

  return (
    <Routes>
      {routes.map(renderRoute)}
      {/* A better to ensure we always fallback to a 404 when no route matches. This was previously done in src/app/routes/index.js */}
      <Route
        key="no-match"
        path="*"
        element={
          <ErrorPage
            {...state}
            pageType={ERROR_PAGE}
            status={404}
            errorCode={404}
          />
        }
      />
    </Routes>
  );
};

export default App;
