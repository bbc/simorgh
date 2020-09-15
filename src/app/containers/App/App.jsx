import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';
import getToggles from '#app/lib/utilities/getToggles';
import routes from '#app/routes';

const getNextPageState = async pathname => {
  const routeProps = getRouteProps(pathname);
  const toggles = await getToggles(routeProps.service);
  const initialData = await routeProps.getInitialData({
    path: pathname,
    service: routeProps.service,
    variant: routeProps.variant,
    pageType: routeProps.pageType,
    toggles,
  });

  return {
    ...initialData,
    ...routeProps,
    currentPathname: pathname,
    toggles,
  };
};

const setFocusOnMainHeading = () => {
  const mainHeadingEl = document.querySelector('h1#content');

  if (mainHeadingEl) {
    mainHeadingEl.focus();
  }
};

export const App = ({ location, initialData, bbcOrigin, history }) => {
  const { pathname } = location;
  const hasMounted = useRef(false);
  const routeProps = getRouteProps(pathname);
  const previousLocationPath = usePrevious(pathname);
  const previousPath = history.action === 'POP' ? null : previousLocationPath; // clear the previous path on back clicks
  const [state, setState] = useState({
    ...initialData,
    ...routeProps,
    currentPathname: pathname,
    errorCode: routeProps.errorCode || initialData.errorCode,
  });
  const routeHasChanged = state.currentPathname !== pathname;

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

  return renderRoutes(routes, {
    ...state,
    bbcOrigin,
    previousPath,
    loading: routeHasChanged,
  });
};

export default withRouter(App);
