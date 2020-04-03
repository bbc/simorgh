import { useState, useEffect } from 'react';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const useData = (endpoint, initialData) => {
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
  }, [endpoint, data]);

  return data;
};

export default useData;
