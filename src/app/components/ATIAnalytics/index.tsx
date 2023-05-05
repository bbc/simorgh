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
  const { isAmp } = requestContext;

  const pageviewParams = buildATIUrl(
    data,
    atiData,
    requestContext,
    serviceContext,
  ) as string;

  if (!pageviewParams) {
    return null;
  }

  return isAmp ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

export default ATIAnalytics;
