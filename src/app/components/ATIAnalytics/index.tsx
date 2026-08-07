import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ReverbParamsContext } from '#app/contexts/ReverbParamsContext';
import { AccountContext } from '#contexts/AccountContext'; // temp - this will be context provider
import { ServiceContext } from '#contexts/ServiceContext'; // temp - this will be context provider
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';
import buildResonanceParams from './params';
// import { ATIProps } from './types'; // blah merge conflict
// import buildReverbParams from './params'; // blah merge conflict
// also fetch buildResonanceParams from './resonanceParams', e.g. import buildResonanceParams from './resonanceParams';

const ATIAnalytics = () => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const { isSignedIn, hashedUserId: hashedId } = use(AccountContext);
  const { isAmp } = requestContext;
  // fetch useResonance from serviceContext, e.g.
  // const { useResonance } = serviceContext;

  const { reverbParams } = use(ReverbParamsContext);

  // to do - replace this with using context provider
  const resonanceParams = buildResonanceParams({
    requestContext,
    serviceContext,
    isSignedIn,
    hashedId,
  });

  // EITHER build resonance params here like we did for Reverb before these changes https://github.com/bbc/simorgh/pull/14120
  // Or build ResonanceParamsContext (not described in depth in this POC due to implementation change occuring after POC was created)

  // build resonance params if useResonance is true, e.g.
  //  const resonanceParams = useResonance
  //   ? buildResonanceParams({
  //       requestContext,
  //       serviceContext,
  //       atiData: atiData || {},
  //        ...
  //     })
  //   : null;

  return isAmp ? (
    <>
      <AmpGeo />
      <AmpATIAnalytics reverbParams={reverbParams} />
    </>
  ) : (
    <CanonicalATIAnalytics
      reverbParams={reverbParams}
      resonanceParams={resonanceParams} // add resonance params here, e.g. resonanceParams={resonanceParams}
    />
  );
};

export default ATIAnalytics;
