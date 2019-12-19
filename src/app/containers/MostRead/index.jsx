import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
// import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';
import Amp from './Amp';

const getLocalMostReadEndpoint = (service, variant) => {
  const localServiceURL = `/${service}`;

  return variant
    ? `${localServiceURL}/most_read/${variant}.json`
    : `${localServiceURL}/most_read.json`;
};

const MostReadContainer = () => {
  const { variant, platform } = useContext(RequestContext);
  const { service, script } = useContext(ServiceContext);

  // const { enabled } = useToggle('mostRead');
  // if (!enabled) {
  // return null;
  // }

  return platform === 'amp' ? (
    <Amp
      endpoint={getLocalMostReadEndpoint(service, variant)}
      service={service}
      script={script}
    />
  ) : (
    <Canonical
      endpoint={getLocalMostReadEndpoint(service, variant)}
      service={service}
      script={script}
    />
  );
};

export default MostReadContainer;
