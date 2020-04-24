import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import Amp from './Amp';
import useToggle from '#hooks/useToggle';

const AdContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { service, ads } = useContext(ServiceContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled || !hasAds) {
    return null;
  }

  // const Ad = isAmp ? Amp : Canonical;
  if (isAmp) {
    return <Amp service={service} />;
  }

  return null;
};

export default AdContainer;
