import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import { ATIProps } from './types';
import { buildATIUrl, buildReverbParams } from './params';

const ATIAnalytics = ({ atiData = {} }: ATIProps) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { isAmp } = requestContext;
  const { useReverb } = serviceContext;

  const urlPageViewParams = buildATIUrl({
    requestContext,
    serviceContext,
    atiData,
  }) as string;

  const reverbParams = useReverb
    ? buildReverbParams({
        requestContext,
        serviceContext,
        atiData,
      })
    : null;

  if (!urlPageViewParams) {
    return null;
  }

  return isAmp ? (
    <AmpATIAnalytics pageviewParams={urlPageViewParams} />
  ) : (
    <CanonicalATIAnalytics
      pageviewParams={urlPageViewParams}
      reverbParams={reverbParams}
    />
  );
};

export default ATIAnalytics;
