import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalPageViewTracking from './canonical';
import AmpPageViewTracking from './amp';
import { ATIProps } from './types';
import { getATIPageViewParams, getReverbParams } from './params';

export default ({ atiData = {} }: ATIProps) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { isAmp } = requestContext;
  const { useReverb } = serviceContext;

  const pageViewParams = getATIPageViewParams({
    requestContext,
    serviceContext,
    atiData,
  }) as string;

  const reverbParams = useReverb
    ? getReverbParams({
        requestContext,
        serviceContext,
        atiData,
      })
    : null;

  if (!pageViewParams) {
    return null;
  }

  return isAmp ? (
    <AmpPageViewTracking pageViewParams={pageViewParams} />
  ) : (
    <CanonicalPageViewTracking
      pageViewParams={pageViewParams}
      reverbParams={reverbParams}
    />
  );
};
