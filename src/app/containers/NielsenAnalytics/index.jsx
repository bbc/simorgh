import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpNielsenAnalytics from './Amp';

const NielsenAnalytics = ({ articleId }) => {
  const { isAmp } = useContext(RequestContext);
  // We need a nielsenAnalytics toggle - using this now so it runs locally
  const { enabled } = useToggle('comscoreAnalytics');
  if (!enabled || !isAmp) {
    return <div>NIELSEN DISABLE</div>;
  }
  // News and Sport only
  // News 474C2B0B-0C04-4182-BCFB-FC9469A48C9B
  // Sport DC4AFDB2-B352-4D51-81EF-38BE41114F22
  const nielsenData = {
    "vars": {
      "apid": "474C2B0B-0C04-4182-BCFB-FC9469A48C9B",
      "apv": "1.0",
      "apn": "My AMP Website",
      "section": "BBC News Business",
      "segC": "BBC – Google AMP", //static data
      "type": "static", //static data
      "assetid": "c6v11qzyv8po" //Required and needs to be unique per asset
    }
  }
  return <AmpNielsenAnalytics nielsenData={nielsenData}/>;
};

export default NielsenAnalytics;
