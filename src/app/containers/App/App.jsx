import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import getRouteProps from '../../routes/getInitialData/utils/getRouteProps';

export const App = ({ routes, location, initialData, bbcOrigin }) => {
  const { service, isAmp, id } = getRouteProps(routes, location.pathname);

  const [state, setState] = useState({
    data: initialData,
    service,
    id,
    isAmp,
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
        id: nextId,
        isAmp: nextIsAmp,
        route,
        match,
      } = getRouteProps(routes, location.pathname);

      setState({
        data: null,
        service: nextService,
        id: nextId,
        isAmp: nextIsAmp,
        loading: true,
        error: null,
      });

      const fetchData = async () => {
        try {
          const newData = await route.getInitialData(match.params);
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

  return renderRoutes(routes, { ...state, bbcOrigin });
};

export default withRouter(App);
