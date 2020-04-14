const {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
} = require('./utilities');

const twitterPresets = (jsonData, serviceConfig) => {
  return {
    name: 'Twitter',
    description: 'Twitter Presets',
    group: 'Twitter',
    tests: [
      {
        test: '"twitter:card"',
        description: 'must have card type',
        type: 'metatag',
        expect: 'summary_large_image',
      },
      {
        test: '"twitter:site"',
        description: 'must have account username',
        type: 'metatag',
        expect: serviceConfig.twitterSite,
      },
      {
        test: '"twitter:creator"',
        description: 'must have username of content creator',
        type: 'metatag',
        expect: serviceConfig.twitterCreator,
      },
      {
        test: '"twitter:image:src"',
        description: 'must have image URL',
        type: 'metatag',
        expect: getImageSrc(jsonData, serviceConfig),
      },
      {
        test: '"twitter:image:alt"',
        description: 'must have image alt text',
        type: 'metatag',
        expect: getImageAltText(jsonData, serviceConfig),
      },
      {
        test: '"twitter:title"',
        description: 'must have title',
        type: 'metatag',
        expect: getTitle(jsonData, serviceConfig),
      },
      {
        test: '"twitter:description"',
        description: 'must have description',
        type: 'metatag',
        expect: getDescription(jsonData),
      },
    ],
  };
};

module.exports = twitterPresets;
