import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import getRouteProps from '../../routes/getInitialData/utils/getRouteProps';
import usePrevious from '../../lib/utilities/usePrevious';

export const App = ({
  routes,
  location,
  initialData,
  bbcOrigin,
  dials,
  history,
}) => {
  const {
    service,
    serviceVariant,
    isAmp,
    id,
    route: { pageType },
  } = getRouteProps(routes, location.pathname);

  const [state, setState] = useState({
    data: initialData,
    service,
    serviceVariant,
    id,
    isAmp,
    pageType,
    loading: false,
    error: null,
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Only update on subsequent page renders
      const {
        service: nextService,
        serviceVariant: nextServiceVariant,
        id: nextId,
        isAmp: nextIsAmp,
        route,
        match,
      } = getRouteProps(routes, location.pathname);

      setState({
        data: null,
        service: nextService,
        serviceVariant: nextServiceVariant,
        id: nextId,
        isAmp: nextIsAmp,
        pageType: route.pageType,
        loading: true,
        error: null,
      });

      const fetchData = async () => {
        try {
          const newData = await route.getInitialData(service, serviceVariant);
          setState(prevState => ({
            ...prevState,
            data: newData,
            loading: false,
          }));
        } catch (error) {
          setState(prevState => ({
            ...prevState,
            error,
            loading: false,
          }));
        }
      };
      fetchData();
    }
  }, [routes, location.pathname]);

  const previousLocationPath = usePrevious(location.pathname);

  // clear the previous path on back clicks
  const previousPath = history.action === 'POP' ? null : previousLocationPath;

  return renderRoutes(routes, {
    ...state,
    bbcOrigin,
    dials,
    previousPath,
  });
};

export default withRouter(App);
