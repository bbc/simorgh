const { getDescription } = require('./utilities');

const getTileImage = (serviceConfig) => {
  return `https://news.files.bbci.co.uk/include/articles/public/${serviceConfig.service}/images/icons/icon-144x144.png`;
};

const metatagPresets = ({ jsonData, serviceConfig = {}, url }) => {
  return {
    name: 'Metatags',
    description: 'Metatags Presets',
    group: `Metatags: ${url}`,
    tests: [
      {
        test: '"X-UA-Compatible"',
        description: 'must have IE compatibility mode',
        type: 'metatag',
        expect: 'IE=edge',
      },
      {
        test: '"robots"',
        description: 'must have robots',
        type: 'metatag',
        expect: 'noodp,noydir',
      },
      {
        test: '"application-name"',
        description: 'must have application name',
        type: 'metatag',
        expect: serviceConfig.brandName,
      },
      {
        test: '"description"',
        description: 'must have description',
        type: 'metatag',
        expect: getDescription(jsonData),
      },
      {
        test: '"theme-color"',
        description: 'must have theme colour',
        type: 'metatag',
        expect: serviceConfig.themeColor,
      },
      {
        test: '"viewport"',
        description: 'must have viewport',
        type: 'metatag',
        expect: 'width=device-width, initial-scale=1, minimum-scale=1',
      },
      {
        test: '"apple-mobile-web-app-title"',
        description: 'must have Apple mobile web application title',
        type: 'metatag',
        expect: serviceConfig.brandName,
      },
      {
        test: '"mobile-web-app-capable"',
        description: 'must have mobile web application capability',
        type: 'metatag',
        expect: 'yes',
      },
      {
        test: '"msapplication-TileColor"',
        description: 'must have MS application tile colour',
        type: 'metatag',
        expect: serviceConfig.themeColor,
      },
      {
        test: '"msapplication-TileImage"',
        description: 'must have MS application tile image',
        type: 'metatag',
        expect: getTileImage(serviceConfig),
      },
    ],
  };
};

module.exports = metatagPresets;
