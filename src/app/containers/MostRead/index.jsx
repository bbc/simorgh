import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getLocalMostReadEndpoint = (service, variant) => {
  const localhostURL = 'http://localhost:7080';
  const localServiceURL = `${localhostURL}/${service}`;

  return variant
    ? `${localServiceURL}/most_read/${variant}.json`
    : `${localServiceURL}/most_read.json`;
};

const MostReadContainer = () => {
  const { variant } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');
  if (!enabled) {
    return null;
  }

  return <Canonical endpoint={getLocalMostReadEndpoint(service, variant)} />;
};

export default MostReadContainer;
