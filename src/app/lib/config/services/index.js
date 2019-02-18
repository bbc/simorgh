/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/

import news from './news';
import persian from './persian';

export default {
  default: {
    brandName: 'Default Brand Name',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    translations: {
      consentBanner: {
        title: 'Cookie banner heading',
        description: 'Cookie banner description',
        accept: 'Accept text',
        reject: 'Reject text',
      },
    },
  },
  news,
  persian,
};
