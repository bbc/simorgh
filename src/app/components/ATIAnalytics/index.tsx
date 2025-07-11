import React, { use, useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';
import { ATIProps } from './types';
import { buildATIUrl, buildReverbParams } from './params';

const ATIAnalytics = ({ atiData = {} }: ATIProps) => {
  // Use React 19's use() hook in production, but fallback to useContext in test environment
  const isTestEnvironment = typeof jest !== 'undefined' && process.env.NODE_ENV !== 'production';
  const requestContext = isTestEnvironment ? useContext(RequestContext) : use(RequestContext);
  const serviceContext = isTestEnvironment ? useContext(ServiceContext) : use(ServiceContext);
  
  if (!requestContext || !serviceContext) {
    return null;
  }
  
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
