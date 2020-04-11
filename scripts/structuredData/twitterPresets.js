import {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
} from './utilities';

const twitterPresets = (jsonData, serviceConfig) => {
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

export default twitterPresets;
