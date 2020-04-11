import path from 'ramda/src/path';
import { getImageSrc, getImageAltText } from './utilities';

const getTitle = (jsonData, serviceConfig) => {
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

const getDescription = (jsonData) => {
  const promoSummary = path(['promo', 'summary'], jsonData);
  const metadataSummary = path(['metadata', 'summary'], jsonData);
  return promoSummary || metadataSummary;
};

export default (jsonData, serviceConfig) => {
  return {
    name: 'Twitter',
    description: 'Twitter Presets',
    group: 'Twitter',
    tests: [
      {
        test: '"twitter:card"',
        type: 'metatag',
        expect: 'summary_large_image',
      },
      {
        test: '"twitter:site"',
        type: 'metatag',
        expect: serviceConfig.twitterSite,
      },
      {
        test: '"twitter:creator"',
        type: 'metatag',
        expect: serviceConfig.twitterCreator,
      },
      {
        test: '"twitter:image:src"',
        type: 'metatag',
        expect: getImageSrc(jsonData, serviceConfig),
      },
      {
        test: '"twitter:image:alt"',
        type: 'metatag',
        expect: getImageAltText(jsonData, serviceConfig),
      },
      {
        test: '"twitter:title"',
        type: 'metatag',
        expect: getTitle(jsonData, serviceConfig),
      },
      {
        test: '"twitter:description"',
        type: 'metatag',
        expect: getDescription(jsonData),
      },
    ],
  };
};
