import {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
} from './utilities';

const getType = (jsonData) => {
  switch (jsonData.metadata.type) {
    case 'MAP':
    case 'PGL':
    case 'STY':
    case 'article':
      return 'article';
    default:
      return 'website';
  }
};

export default (jsonData, serviceConfig, url) => {
  return {
    name: 'Facebook',
    description: 'Facebook Presets',
    group: 'Facebook',
    tests: [
      {
        test: '"fb:admins"',
        type: 'metatag',
        expect: '100004154058350',
      },
      {
        test: '"fb:app_id"',
        type: 'metatag',
        expect: '1609039196070050',
      },
      {
        test: '"og:description"',
        type: 'metatag',
        expect: getDescription(jsonData),
      },
      {
        test: '"og:image"',
        type: 'metatag',
        expect: getImageSrc(jsonData, serviceConfig),
      },
      {
        test: '"og:image:alt"',
        type: 'metatag',
        expect: getImageAltText(jsonData, serviceConfig),
      },
      {
        test: '"og:title"',
        type: 'metatag',
        expect: getTitle(jsonData, serviceConfig),
      },
      {
        test: '"og:site_name"',
        type: 'metatag',
        expect: serviceConfig.brandName,
      },
      {
        test: '"og:url"',
        type: 'metatag',
        expect: url,
      },
      {
        test: '"og:type"',
        type: 'metatag',
        expect: getType(jsonData),
      },
    ],
  };
};
