import { useState, useEffect, useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import webLogger from '#lib/logger.web';

const logger = webLogger();

// we'd put this in a hooks folder, not with radio schedules
const useData = endpoint => {
  const { ssrData } = useContext(RequestContext); // we would put this in a different context probably
  const initialData = ssrData[endpoint] && ssrData[endpoint].json;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const handleResponse = async response => {
      const json = await response.json();
      setData(json);
    };

    const fetchData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    if (!data) {
      fetchData(endpoint);
    }

    return () => {
      // remove the initial data from context at this point
    };
  }, [endpoint, ssrData, data]);

  return data;
};

export default useData;
