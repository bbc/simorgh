import { getImageSrc } from './utilities';

const getTitle = (jsonData, serviceConfig) => {
  return `${jsonData.promo.headlines.headline} - ${serviceConfig.brandName}`;
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
        expect: jsonData.promo.indexImage.altText,
      },
      {
        test: '"twitter:title"',
        type: 'metatag',
        expect: getTitle(jsonData, serviceConfig),
      },
      {
        test: '"twitter:description"',
        type: 'metatag',
        expect: jsonData.promo.summary,
      },
    ],
  };
};
