import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ServiceContext } from '#contexts/ServiceContext';

const MostReadContainer = () => {
  const { service, variant } = useContext(ServiceContext);

  const [data, setData] = useState({ records: [] });
  // const [promos, setPromos] = useState([]);

  const localMostReadData = variant
    ? `http://localhost:7080/${service}/most_read/${variant}.json`
    : `http://localhost:7080/news/most_read.json`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(localMostReadData);
      setData(result.data);
    };
    fetchData();
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

export default MostReadContainer;
