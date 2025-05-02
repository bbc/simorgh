import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { ATIAnalyticsProps } from '../../types';

type ATIAnalyticsPropsExport = Pick<ATIAnalyticsProps, 'reverbParams'>;

const trackingPixelUrl = (
  reverbParams: ATIAnalyticsPropsExport['reverbParams'],
) => reverbUrlHelper.getTrackingPixelSrc(reverbParams);

export default trackingPixelUrl;
