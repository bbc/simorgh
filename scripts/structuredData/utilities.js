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

export const getDescription = (jsonData) => {
  const promoSummary = path(['promo', 'summary'], jsonData);
  const metadataSummary = path(['metadata', 'summary'], jsonData);
  return promoSummary || metadataSummary;
};

export const getTitle = (jsonData, serviceConfig) => {
  const headline = path(['promo', 'headlines', 'headline'], jsonData);
  const seoHeadline = path(['promo', 'headlines', 'seoHeadline'], jsonData);
  const { frontPageTitle } = serviceConfig;
  const promoName = path(['promo', 'name'], jsonData);

  const pageTypeTitle = {
    MAP: headline,
    STY: headline,
    PGL: headline,
    article: seoHeadline,
    'WS-LIVE': promoName,
    IDX: frontPageTitle,
    WSRADIO: headline,
  };

  return `${pageTypeTitle[jsonData.metadata.type]} - ${
    serviceConfig.brandName
  }`;
};
