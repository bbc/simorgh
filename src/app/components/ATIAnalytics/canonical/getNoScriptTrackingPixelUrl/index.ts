import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { ATIAnalyticsProps } from '../../types';

const getNoScriptTrackingPixelUrl = ({ reverbParams }: ATIAnalyticsProps) =>
  reverbUrlHelper.getTrackingPixelSrc(reverbParams);

export default getNoScriptTrackingPixelUrl;
