import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import Canonical from './Canonical';
import Amp from './Amp';

const MostReadContainer = () => {
  const { platform, variant } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  const localMostReadData = variant
    ? `http://localhost:7080/${service}/most_read/${variant}.json`
    : `http://localhost:7080/${service}/most_read.json`;

  return platform === 'amp' ? (
    <Amp endpoint={localMostReadData} />
  ) : (
    <Canonical endpoint={localMostReadData} />
  );
};

export default MostReadContainer;
