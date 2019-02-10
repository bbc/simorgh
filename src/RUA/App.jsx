import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import loadInitialData from './loadInitialData';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const App = ({ initialData, location, routes }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadInitialDataPromise, setLoadInitialDataPromise] = useState(null);
  const previousLocation = usePrevious(location);

  const stuff = async () => {
    if (previousLocation && previousLocation.pathname !== location.pathname) {
      setData(null);
      setLoading(true);
      setError(null);
      setLoadInitialDataPromise(loadInitialData(location.pathname, routes));
    }

    if (loading) {
      try {
        setData(await loadInitialDataPromise);
        setLoading(false);
        setError(null);
        setLoadInitialDataPromise(null);
      } catch (err) {
        setData(null);
        setLoading(false);
        setError(err);
        setLoadInitialDataPromise(null);
      }
    }
  };

  useEffect(
    () => {
      stuff();
    },
    [location, loading],
  );

  return renderRoutes(routes, {
    data,
    loading,
    error,
  }); 
};

export default withRouter(App);
