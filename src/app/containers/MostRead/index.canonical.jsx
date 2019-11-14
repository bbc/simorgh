import React, { useContext, useEffect, useState } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const Canonical = () => {
  const { variant } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const [promos, setPromo] = useState([]);
  const [data, setData] = useState({});

  const localMostReadData = variant
    ? `http://localhost:7080/${service}/most_read/${variant}.json`
    : `http://localhost:7080/${service}/most_read.json`;

  const handleResponse = async response => {
    const mostReadData = await response.json();
    setPromo(mostReadData.records.slice(0, 10));
    setData(mostReadData);
  };

  useEffect(() => {
    const fetchMostReadData = pathname =>
      fetch(pathname)
        .then(handleResponse)
        .catch(error => console.log(error)); // eslint-disable-line no-console

    fetchMostReadData(localMostReadData);
  }, [localMostReadData]);

  return (
    <div>
      <p>Generated: {data.generated}</p>
      {promos.map(promo => (
        <ul key={promo.id}>
          <li>{promo.promo.timestamp}</li>
          <li>{promo.promo.headlines.headline}</li>
          <li>{promo.promo.locators.assetUri}</li>
        </ul>
      ))}
    </div>
  );
};

export default Canonical;
