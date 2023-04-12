import React, { useContext } from 'react';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import AmpAd from './Amp';
import CanonicalAd from './Canonical';
import { AdProps } from './types';

const Ad = ({ slotType, className }: AdProps) => {
  const { isAmp } = useContext(RequestContext);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  const AdComponent = isAmp ? AmpAd : CanonicalAd;
  return <AdComponent slotType={slotType} className={className} />;
};

export default Ad;
