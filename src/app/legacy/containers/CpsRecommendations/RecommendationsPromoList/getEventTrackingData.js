import { getHeadline, getUrl } from '#lib/utilities/getStoryPromoInfo';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export default ({ item, index, optimizely } = {}) => {
  const block = {
    componentName: 'wsoj',
    ...(optimizely && { optimizely }),
  };
  const headline = getHeadline(item);
  const url = getUrl(item);
  const advertiserID = url && url.split('/')[1];

  if ([headline, url, advertiserID, index >= 0].every(Boolean)) {
    const link = {
      campaignID: 'cps_wsoj',
      componentName: headline,
      advertiserID,
      url: `${getEnvConfig().SIMORGH_BASE_URL}${url}`,
      format: { CHD: `promo::${index + 1}` },
      ...(optimizely && { optimizely }),
    };

    return {
      block,
      link,
    };
  }

  return { block };
};
