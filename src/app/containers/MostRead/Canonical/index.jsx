import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import webLogger from '#lib/logger.web';

const logger = webLogger();

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
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchMostReadData(endpoint);
  }, [endpoint]);

  return (
    <>
      <p>Last Updated: {data.lastRecordTimeStamp}</p>
      {promos.map(({ id, promo: { timestamp, headlines, locators } }) => (
        <ul key={id}>
          <li>{timestamp}</li>
          <li>{headlines.headline}</li>
          <li>{locators.assetUri}</li>
        </ul>
      ))}
    </>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalMostRead;
