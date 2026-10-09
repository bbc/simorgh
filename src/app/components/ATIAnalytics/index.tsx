import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ReverbParamsContext } from '#app/contexts/ReverbParamsContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import AmpGeo from '../../legacy/components/AmpGeo';

const ATIAnalytics = () => {
  const { isAmp } = use(RequestContext);
  const { reverbParams, resonanceParams } = use(ReverbParamsContext);

  return isAmp ? (
    <>
      <AmpGeo />
      <AmpATIAnalytics reverbParams={reverbParams} />
    </>
  ) : (
    <CanonicalATIAnalytics
      reverbParams={reverbParams}
      resonanceParams={resonanceParams}
    />
  );
};

export default ATIAnalytics;
