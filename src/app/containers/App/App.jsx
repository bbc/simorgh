import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import loadInitialData from '../../routes/loadInitialData';

// number of ms before the loading screen is displayed.
const loadingScreenDelay = 1000;

const usePrevious = value => {
  const ref = useRef();

  useEffect(
    () => {
      ref.current = value;
    },
    [value],
  );

  return ref.current || value;
};

const resetScroll = () => window.scrollTo(0, 0);

export const App = ({ initialData, location, routes }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const previousLocationPath = usePrevious(location.pathname);

  const fetchData = async () => {
    const timer = setTimeout(() => {
      setLoading(true);
      resetScroll();
    }, loadingScreenDelay);

    setData(await loadInitialData(location.pathname, routes));

    clearTimeout(timer);
    setLoading(false);
    resetScroll();
  };

  useEffect(
    () => {
      if (previousLocationPath !== location.pathname) {
        fetchData();
      }
    },
    [location],
  );

  return renderRoutes(routes, {
    data,
    loading,
  });
};

export default withRouter(App);
