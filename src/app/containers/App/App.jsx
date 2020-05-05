import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import path from 'ramda/src/path';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';

export const App = ({ routes, location, initialData, bbcOrigin, history }) => {
  const {
    service,
    isAmp,
    variant,
    id,
    assetUri,
    errorCode,
    route: { pageType },
  } = getRouteProps(routes, location.pathname);

  const { data, status, error, timeOnServer } = initialData;

  const [state, setState] = useState({
    data,
    status,
    service,
    variant,
    id,
    assetUri,
    isAmp,
    pageType,
    error,
    loading: false,
    errorCode: errorCode || initialData.errorCode,
    timeOnServer,
  });

  const isInitialMount = useRef(true);
  const shouldSetFocus = useRef(false);

  useEffect(() => {
    if (shouldSetFocus.current) {
      const contentEl = document.querySelector('h1#content');
      if (contentEl) {
        contentEl.focus();
      }
      shouldSetFocus.current = false;
    }
  }, [state.loading, state.data]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Only update on subsequent page renders
      const {
        service: nextService,
        variant: nextVariant,
        id: nextId,
        assetUri: nextAssetUri,
        isAmp: nextIsAmp,
        route,
      } = getRouteProps(routes, location.pathname);

      let loaderTimeout;
      const loaderPromise = new Promise(resolve => {
        loaderTimeout = setTimeout(resolve, 500);
      });

      loaderPromise.then(() => {
        setState({
          data: null,
          status: null,
          service: nextService,
          variant: nextVariant,
          id: nextId,
          assetUri: nextAssetUri,
          isAmp: nextIsAmp,
          pageType: route.pageType,
          loading: true,
          error: null,
          errorCode: null,
          timeOnServer: null,
        });
      });

      route
        .getInitialData({
          path: location.pathname,
          service: nextService,
          variant: nextVariant,
        })
        .then(initialPageData => {
          clearTimeout(loaderTimeout);
          shouldSetFocus.current = true;
          setState({
            service: nextService,
            variant: nextVariant,
            id: nextId,
            assetUri: nextAssetUri,
            isAmp: nextIsAmp,
            pageType: route.pageType,
            loading: false,
            data: { ...initialPageData },
            status: path(['status'], initialPageData),
            error: path(['error'], initialPageData),
            errorCode: null,
            timeOnServer: path(['timeOnServer'], initialPageData),
          });
        });
    }
  }, [routes, location.pathname]);

  const previousLocationPath = usePrevious(location.pathname);

  // clear the previous path on back clicks
  const previousPath = history.action === 'POP' ? null : previousLocationPath;
  return renderRoutes(routes, {
    ...state,
    bbcOrigin,
    pathname: location.pathname,
    previousPath,
  });
};

export default withRouter(App);
