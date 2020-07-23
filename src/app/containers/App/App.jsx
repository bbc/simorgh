import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import path from 'ramda/src/path';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';
import getRemoteConfig from '#lib/utilities/getRemoteConfig';

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

  const { pageData, remoteConfig, status, error, timeOnServer } = initialData;

  const [state, setState] = useState({
    pageData,
    remoteConfig,
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
  }, [state.loading, state.pageData]);

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
        route: { getInitialData, pageType: nextPageType },
      } = getRouteProps(routes, location.pathname);

      let loaderTimeout;
      const loaderPromise = new Promise(resolve => {
        loaderTimeout = setTimeout(resolve, 500);
      });

      loaderPromise.then(() => {
        setState({
          pageData: null,
          status: null,
          service: nextService,
          variant: nextVariant,
          id: nextId,
          assetUri: nextAssetUri,
          isAmp: nextIsAmp,
          pageType: nextPageType,
          loading: true,
          error: null,
          errorCode: null,
          timeOnServer: null,
        });
      });

      const updateRemoteConfig = async () => {
        const nextRemoteConfig = await getRemoteConfig(nextService);
        const data = await getInitialData({
          path: location.pathname,
          service: nextService,
          variant: nextVariant,
          pageType: nextPageType,
        });

        clearTimeout(loaderTimeout);
        shouldSetFocus.current = true;
        setState({
          service: nextService,
          variant: nextVariant,
          id: nextId,
          assetUri: nextAssetUri,
          isAmp: nextIsAmp,
          pageType: nextPageType,
          loading: false,
          pageData: path(['pageData'], data),
          remoteConfig: nextRemoteConfig,
          status: path(['status'], data),
          error: path(['error'], data),
          errorCode: null,
          timeOnServer: path(['timeOnServer'], data),
        });
      };

      updateRemoteConfig();
    }
  }, [routes, location.pathname, remoteConfig]);

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
