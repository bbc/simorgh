import { getImageSrc } from './utilities';

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
        name: 'twitter image',
        test: '"twitter:image:src"',
        type: 'metatag',
        expect: getImageSrc(jsonData, serviceConfig),
      },
    ],
  };
};
