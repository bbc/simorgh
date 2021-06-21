import { getHeadline, getUrl } from '#lib/utilities/getStoryPromoInfo';

export default ({ item, index } = {}) => {
  const block = {
    componentName: 'wsoj',
  };
  const headline = getHeadline(item);
  const url = getUrl(item);
  const advertiserID = url && url.split('/')[1];

  if ([headline, url, advertiserID, index >= 0].every(Boolean)) {
    const link = {
      campaignID: 'cps_wsoj',
      componentName: encodeURIComponent(headline),
      advertiserID,
      url: `${process.env.SIMORGH_BASE_URL}${url}`,
      format: `CHD=promo::${index + 1}`,
    };

    return {
      block,
      link,
    };
  }

  return { block };
};
