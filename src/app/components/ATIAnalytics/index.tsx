import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import AmpGeo from '#app/legacy/components/AmpGeo';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';
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
    <>
      <AmpGeo />
      <AmpATIAnalytics
        pageviewParams={urlPageViewParams}
        reverbParams={reverbParams}
      />
    </>
  ) : (
    <CanonicalATIAnalytics
      pageviewParams={urlPageViewParams}
      reverbParams={reverbParams}
    />
  );
};

export default ATIAnalytics;
