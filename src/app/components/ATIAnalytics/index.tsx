import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';
import { ATIProps } from './types';
import buildReverbParams from './params';

const ATIAnalytics = ({ atiData = {} }: ATIProps) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const { isAmp } = requestContext;
  const { isSignedIn, hashedUserId: hashedId } = use(AccountContext);

  const reverbParams = buildReverbParams({
    requestContext,
    serviceContext,
    atiData,
    isSignedIn,
    hashedId,
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
