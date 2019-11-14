import React, { useContext, useEffect, useState } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const Canonical = () => {
  const { variant } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const [data, setData] = useState({ records: [] });

  const localMostReadData = variant
    ? `http://localhost:7080/${service}/most_read/${variant}.json`
    : `http://localhost:7080/${service}/most_read.json`;

  const handleResponse = async response => {
    const mostReadData = await response.json();
    setData(mostReadData);
  };

  useEffect(() => {
    const fetchCanonicalData = pathname =>
      fetch(pathname)
        .then(handleResponse)
        .catch(error => console.log(error));

    try {
      fetchCanonicalData(localMostReadData);
    } catch (error) {
      // TO-DO: how should we handle failed data response
      console.log(error);
    }
  }, []);

  return (
    <div>
      <p>Generated: {data.generated}</p>
      <ul>
        {data.records.slice(0, 10).map(record => (
          <li key={record.id}>
            <p>{record.promo.timestamp}</p>
            <p>{record.promo.headlines.headline}</p>
            <p>{record.promo.locators.assetUri}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Canonical;
