import { useEffect, useState } from 'react';

const useFetch = (initialData, fetchData) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(typeof initialData === 'undefined');

  useEffect(() => {
    async function getData() {
      if (data) {
        return;
      }

      setLoading(true);
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    }

    getData();

    // return () => {
    // could remove initial data from context here rather than
    // on page transition
    // }
  }, []);

  return [data, loading, error];
};

export default useFetch;
