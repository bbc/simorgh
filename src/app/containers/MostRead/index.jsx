import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ServiceContext } from '#contexts/ServiceContext';

const MostReadContainer = () => {
  const { service, variant } = useContext(ServiceContext);
  console.log(service);
  console.log(variant);

  const [data, setData] = useState();
  const localEndpoint = variant
    ? `http://localhost:7080/${service}/most_read/${variant}.json`
    : `http://localhost:7080/news/most_read.json`;

  console.log(localEndpoint);

  useEffect(() => {
    async () => {
      await axios.get(localEndpoint).then(response => {
        setData(response.data);
        console.log(response.data);
      });
    };
  }, [localEndpoint]);

  return <div>{console.log(data)}</div>;
};

export default MostReadContainer;
