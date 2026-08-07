import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ReverbParamsContext } from '#app/contexts/ReverbParamsContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';

const ATIAnalytics = () => {
  const requestContext = use(RequestContext);
  const { isAmp } = requestContext;

  // @ts-expect-error - testing
  const { reverbParams, resonanceParams } = use(ReverbParamsContext);

  console.log('resonanceParams', resonanceParams);

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
