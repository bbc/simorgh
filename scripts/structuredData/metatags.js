/* eslint-disable no-unused-vars */
import {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
} from './utilities';

const getTileImage = (serviceConfig) => {
  return `https://news.files.bbci.co.uk/include/articles/public/${serviceConfig.service}/images/icons/icon-144x144.png`;
};

export default (jsonData, serviceConfig, url) => {
  return {
    name: 'Metatags',
    description: 'Metatags Presets',
    group: 'Metatags',
    tests: [
      {
        test: '"X-UA-Compatible"',
        type: 'metatag',
        expect: 'IE=edge',
      },
      {
        test: '"robots"',
        type: 'metatag',
        expect: 'noodp,noydir',
      },
      {
        test: '"application-name"',
        type: 'metatag',
        expect: serviceConfig.brandName,
      },
      {
        test: '"description"',
        type: 'metatag',
        expect: getDescription(jsonData),
      },
      {
        test: '"theme-color"',
        type: 'metatag',
        expect: serviceConfig.themeColor,
      },
      {
        test: '"viewport"',
        type: 'metatag',
        expect: 'width=device-width, initial-scale=1, minimum-scale=1',
      },
      {
        test: '"apple-mobile-web-app-title"',
        type: 'metatag',
        expect: serviceConfig.brandName,
      },
      {
        test: '"mobile-web-app-capable"',
        type: 'metatag',
        expect: 'yes',
      },
      {
        test: '"msapplication-TileColor"',
        type: 'metatag',
        expect: serviceConfig.themeColor,
      },
      {
        test: '"msapplication-TileImage"',
        type: 'metatag',
        expect: getTileImage(serviceConfig),
      },
    ],
  };
};
