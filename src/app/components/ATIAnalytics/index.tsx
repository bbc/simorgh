import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import { ATIProps } from './types';
import buildATIUrl from './params';

const ATIAnalytics = ({ data, atiData }: ATIProps) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { isAmp, isLow } = requestContext;

  const pageviewParams = buildATIUrl({
    requestContext,
    serviceContext,
    data,
    atiData,
  }) as string;

  if (!pageviewParams) {
    return null;
  }

  return isAmp || isLow ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

export default ATIAnalytics;
