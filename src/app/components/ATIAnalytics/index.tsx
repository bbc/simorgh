import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ReverbParamsContext } from '#app/contexts/ReverbParamsContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';
// import { ATIProps } from './types'; // blah merge conflict
// import buildReverbParams from './params'; // blah merge conflict
// also fetch buildResonanceParams from './resonanceParams', e.g. import buildResonanceParams from './resonanceParams';

const ATIAnalytics = () => {
  const requestContext = use(RequestContext);
  const { isAmp } = requestContext;
  // fetch useResonance from serviceContext, e.g.
  // const { useResonance } = serviceContext;

  const { reverbParams } = use(ReverbParamsContext);

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
      reverbParams={reverbParams} // add resonance params here, e.g. resonanceParams={resonanceParams}
    />
  );
};

export default ATIAnalytics;
