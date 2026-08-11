import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { ReverbBeaconConfig } from '../../types';

const getNoScriptTrackingPixelUrl = ({
  reverbParams,
}: {
  reverbParams: ReverbBeaconConfig;
}) => reverbUrlHelper.getTrackingPixelSrc(reverbParams);

export default getNoScriptTrackingPixelUrl;
