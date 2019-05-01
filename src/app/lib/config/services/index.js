/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/

export default {
  default: {
    brandName: 'Default Brand Name',
    externalLinkText: ', default external link suffix',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    themeColor: '#000',
  },
  news: () => import(/* webpackChunkName: 'news' */ `./news.js`),
  persian: () => import(/* webpackChunkName: 'persian' */ `./persian.js`),
  igbo: () => import(/* webpackChunkName: 'igbo' */ `./igbo.js`),
  pidgin: () => import(/* webpackChunkName: 'pidgin' */ `./thai.js`),
  thai: () => import(/* webpackChunkName: 'thai' */ `./thai.js`),
  yoruba: () => import(/* webpackChunkName: 'yoruba' */ `./yoruba.js`),
};
