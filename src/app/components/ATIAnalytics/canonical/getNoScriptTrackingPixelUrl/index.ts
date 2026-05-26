import { reverbUrlHelper } from '@bbc/reverb-url-helper';

import type { ATIAnalyticsProps } from '../../types';

const getNoScriptTrackingPixelUrl = ({ reverbParams }: ATIAnalyticsProps) =>
  reverbUrlHelper.getTrackingPixelSrc(reverbParams);

export default getNoScriptTrackingPixelUrl;
