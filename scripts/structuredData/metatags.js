/* eslint-disable no-unused-vars */
import {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
} from './utilities';

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
    ],
  };
};
