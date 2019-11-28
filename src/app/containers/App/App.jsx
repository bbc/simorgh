import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import path from 'ramda/src/path';
import getRouteProps from '../../routes/getInitialData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';

export const App = ({ routes, location, initialData, bbcOrigin, history }) => {
  const {
    service,
    isAmp,
    variant,
    id,
    errorCode,
    route: { pageType },
  } = getRouteProps(routes, location.pathname);

  const { pageData, status, error } = initialData;

  const [state, setState] = useState({
    pageData,
    status,
    service,
    variant,
    id,
    isAmp,
    pageType,
    error,
    loading: false,
    errorCode,
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
  }, [state.loading]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Only update on subsequent page renders
      const {
        service: nextService,
        variant: nextVariant,
        id: nextId,
        isAmp: nextIsAmp,
        route,
      } = getRouteProps(routes, location.pathname);

      setState({
        pageData: null,
        status: null,
        service: nextService,
        variant: nextVariant,
        id: nextId,
        isAmp: nextIsAmp,
        pageType: route.pageType,
        loading: true,
        error: null,
        errorCode: null,
      });

      route.getInitialData(location.pathname).then(data => {
        shouldSetFocus.current = true;
        setState(prevState => ({
          ...prevState,
          loading: false,
          pageData: path(['pageData'], data),
          status: path(['status'], data),
          error: path(['error'], data),
        }));
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
