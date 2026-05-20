import { use } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AmpGeo from '../../legacy/components/AmpGeo';
import AmpATIAnalytics from './amp';
import CanonicalATIAnalytics from './canonical';
import buildReverbParams from './params';
import type { ATIProps } from './types';

const ATIAnalytics = ({ atiData = {} }: ATIProps) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const { isAmp } = requestContext;

  const reverbParams = buildReverbParams({
    requestContext,
    serviceContext,
    atiData,
  });

  return isAmp ? (
    <>
      <AmpGeo />
      <AmpATIAnalytics reverbParams={reverbParams} />
    </>
  ) : (
    <CanonicalATIAnalytics reverbParams={reverbParams} />
  );
};

export default ATIAnalytics;
