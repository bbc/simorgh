/* eslint-disable import/prefer-default-export */
import getBrandedImage from '../../cypress/support/helpers/getBrandedImage';

export const getImageSrc = (jsonData, serviceConfig) => {
  const imagePath = jsonData.promo.indexImage.path;
  const isCps = jsonData.promo.type === 'cps';

  return imagePath && isCps
    ? getBrandedImage({ imagePath, serviceName: serviceConfig.service })
    : serviceConfig.defaultImage;
};
