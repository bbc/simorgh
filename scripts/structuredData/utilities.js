/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';
import getBrandedImage from '../../cypress/support/helpers/getBrandedImage';

const isCps = (jsonData) => jsonData.promo.type === 'cps';

export const getImageSrc = (jsonData, serviceConfig) => {
  const imagePath = path(['promo', 'indexImage', 'path'], jsonData);

  return imagePath && isCps(jsonData)
    ? getBrandedImage({ imagePath, serviceName: serviceConfig.service })
    : serviceConfig.defaultImage;
};

export const getImageAltText = (jsonData, serviceConfig) => {
  const indexImage = path(['promo', 'indexImage'], jsonData);

  return indexImage && isCps(jsonData) && indexImage.altText
    ? indexImage.altText
    : serviceConfig.defaultImageAltText;
};
