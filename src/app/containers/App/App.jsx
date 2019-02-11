import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import loadInitialData from './loadInitialData';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || value;
};

const App = ({ initialData, location, routes }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousLocationPath = usePrevious(location.pathname);

  const fetchData = async () => {
    try {
      setData(null);
      setLoading(true);
      setError(null);
      setData(await loadInitialData(location.pathname, routes));
      setLoading(false);
    } catch (err) {
      setData(null);
      setLoading(false);
      setError(err);
    }
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
    error,
  });
};

export default withRouter(App);
