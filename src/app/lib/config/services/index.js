/* 
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/

import news from './news';
import persian from './persian';
import translations from '../translations/en-gb';

export default {
  default: {
    brandName: 'Default Brand Name',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    service: 'default',
    translations,
  },
  news,
  persian,
};
