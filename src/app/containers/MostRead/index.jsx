import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ServiceContext } from '#contexts/ServiceContext';

const MostReadContainer = () => {
  const { service, variant } = useContext(ServiceContext);

  const [data, setData] = useState();

  const localEndpoint = variant
    ? `http://localhost:7080/${service}/most_read/${variant}.json`
    : `http://localhost:7080/news/most_read.json`;

  useEffect(() => {
    axios.get(localEndpoint).then(response => {
      setData(response.data);
    });
  }, [localEndpoint]);

  return <div>{JSON.stringify(data)}</div>;
};

export default MostReadContainer;
