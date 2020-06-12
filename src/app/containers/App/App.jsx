import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import usePrevious from '#lib/utilities/usePrevious';
import getRouteData from '#lib/utilities/getRouteData';
import routes from '#app/routes';

const updatePage = async ({ setState, pathname }) => {
  const { data, isAmp, service, variant } = await getRouteData({
    path: pathname,
  });

  setState({
    ...data,
    isAmp,
    service,
    variant,
  });
};

const setFocusOnMainHeading = () => {
  const mainHeadingEl = document.querySelector('h1#content');

  if (mainHeadingEl) {
    mainHeadingEl.focus();
  }
};

export default withRouter(
  ({ location, initialData, bbcOrigin, history, isAmp, service, variant }) => {
    const { pathname } = location;
    const isMounted = useRef(false);
    const [state, setState] = useState({
      ...initialData,
      isAmp,
      service,
      variant,
    });

    useEffect(() => {
      if (isMounted.current) {
        updatePage({ setState, pathname });
      } else {
        isMounted.current = true;
      }
    }, [pathname]);

    useLayoutEffect(() => {
      if (isMounted.current) {
        setFocusOnMainHeading();
      }
    }, [state.pageData.metadata.id]);

    const previousLocationPath = usePrevious(pathname);

    // clear the previous path on back clicks
    const previousPath = history.action === 'POP' ? null : previousLocationPath;

    return renderRoutes(routes, {
      ...state,
      bbcOrigin,
      pathname,
      previousPath,
    });
  },
);
