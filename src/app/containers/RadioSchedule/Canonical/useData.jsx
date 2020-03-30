import { useState, useEffect, useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const useData = endpoint => {
  const { ssrData } = useContext(RequestContext);
  const initialData = ssrData && ssrData[endpoint];
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const handleResponse = async response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
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

    // return () => {
    // for onward journeys, we should remove the initial data from context at this point
    // };
  }, [endpoint, ssrData, data]);

  return data;
};

export default useData;
