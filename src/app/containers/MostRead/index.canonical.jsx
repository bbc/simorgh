import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';

const CanonicalMostRead = ({ endpoint }) => {
  const [promos, setPromo] = useState([]);
  const [data, setData] = useState({});

  const handleResponse = async response => {
    const mostReadData = await response.json();
    setPromo(mostReadData.records.slice(0, 10));
    setData(mostReadData);
  };

  useEffect(() => {
    const fetchMostReadData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(error => console.log(error)); // eslint-disable-line no-console

    fetchMostReadData(endpoint);
  }, [endpoint]);

  return (
    <div>
      <p>Last Updated: {data.lastRecordTimeStamp}</p>
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

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalMostRead;
