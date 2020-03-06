import React, { useContext } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
// import useToggle from '../Toggle/useToggle';

const AdContainer = () => {
  const { id, isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  const Ad = isAmp ? Amp : Canonical;

  return <Ad id={id} service={service} />;
};

export default AdContainer;
