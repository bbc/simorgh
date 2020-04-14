const {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
} = require('./utilities');

const getType = (jsonData) => {
  return jsonData.promo.type === 'cps' ? 'article' : 'website';
};

const facebookPresets = ({ jsonData, serviceConfig = {}, url }) => {
  return {
    name: 'Facebook',
    description: 'Facebook Presets',
    group: `Facebook: ${url}`,
    tests: [
      {
        test: '"fb:admins"',
        description: 'must have Facebook admin id',
        type: 'metatag',
        expect: '100004154058350',
      },
      {
        test: '"fb:app_id"',
        description: 'must have Facebook application id',
        type: 'metatag',
        expect: '1609039196070050',
      },
      {
        test: '"og:description"',
        description: 'must have OpenGraph description',
        type: 'metatag',
        expect: getDescription(jsonData),
      },
      {
        test: '"og:image"',
        description: 'must have OpenGraph image',
        type: 'metatag',
        expect: getImageSrc(jsonData, serviceConfig),
      },
      {
        test: '"og:image:alt"',
        description: 'must have OpenGraph image alt text',
        type: 'metatag',
        expect: getImageAltText(jsonData, serviceConfig),
      },
      {
        test: '"og:title"',
        description: 'must have OpenGraph title',
        type: 'metatag',
        expect: getTitle(jsonData, serviceConfig),
      },
      {
        test: '"og:site_name"',
        description: 'must have OpenGraph site name',
        type: 'metatag',
        expect: serviceConfig.brandName,
      },
      {
        test: '"og:url"',
        description: 'must have OpenGraph URL',
        type: 'metatag',
        expect: url,
      },
      {
        test: '"og:type"',
        description: 'must have OpenGraph type',
        type: 'metatag',
        expect: getType(jsonData),
      },
      {
        test: '"og:locale"',
        description: 'must have OpenGraph locale',
        type: 'metatag',
        expect: serviceConfig.locale,
      },
    ],
  };
};

module.exports = facebookPresets;
