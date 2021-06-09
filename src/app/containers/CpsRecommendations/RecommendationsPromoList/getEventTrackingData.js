import { getHeadline, getUrl } from '#lib/utilities/getStoryPromoInfo';

export default ({ item, index } = {}) => {
  const block = {
    componentName: 'wsoj',
  };
  const headline = getHeadline(item);
  const url = getUrl(item);
  const advertiserID = url && url.split('/')[1];

  if ([headline, url, advertiserID].every(Boolean)) {
    const link = {
      componentName: encodeURIComponent(headline),
      url: advertiserID,
      format: `CHD=promo::${index + 1}`,
    };

    return {
      block,
      link,
    };
  }

  return { block };
};
