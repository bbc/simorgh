import path from 'ramda/src/path';
import { getImageParts } from '../../src/app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';

const isCps = (jsonData) => jsonData.promo.type === 'cps';

const getBrandedImage = ({ service, imagePath }) => {
  const [, locator] = getImageParts(imagePath);
  return `http://ichef.test.bbci.co.uk/news/1024/branded_${service}/${locator}`;
};

export const getImageSrc = (jsonData, serviceConfig) => {
  const imagePath = path(['promo', 'indexImage', 'path'], jsonData);

  return imagePath && isCps(jsonData)
    ? getBrandedImage({ imagePath, service: serviceConfig.service })
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
