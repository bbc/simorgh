import isLive from '../../../../lib/utilities/isLive';

const getBrandedImage = (locator, service) => {
  const iChefHost = isLive()
    ? 'http://ichef.bbci.co.uk'
    : 'http://ichef.test.bbci.co.uk';
  return `${iChefHost}/news/1024/branded_${service}/${locator}`;
};

export default getBrandedImage;
