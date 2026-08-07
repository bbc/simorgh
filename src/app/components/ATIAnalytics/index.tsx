import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ReverbParamsContext } from '#app/contexts/ReverbParamsContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';
// import buildResonanceParams from './params';
// import { ATIProps } from './types'; // blah merge conflict
// import buildReverbParams from './params'; // blah merge conflict
// also fetch buildResonanceParams from './resonanceParams', e.g. import buildResonanceParams from './resonanceParams';

const ATIAnalytics = () => {
  const requestContext = use(RequestContext);
  const { isAmp } = requestContext;

  const { reverbParams } = use(ReverbParamsContext);

  // const { resonanceParams } = use(ResonanceParamsContext); // if we make new one

  // const { reverbParams, resonanceParams } = use(AnalyticsParamsContext); // if we refactor

  // EITHER build resonance params here like we did for Reverb before these changes https://github.com/bbc/simorgh/pull/14120
  // Or build ResonanceParamsContext (not described in depth in this POC due to implementation change occuring after POC was created)
  // We will still need to evaluate useResonance somewhere - that could be in the context provider
  // fetch useResonance from serviceContext, e.g.
  // const { useResonance } = serviceContext;

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
