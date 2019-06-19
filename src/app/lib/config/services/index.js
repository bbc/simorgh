/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/
import news from './news';
import persian from './persian';
import igbo from './igbo';
import pidgin from './pidgin';
import yoruba from './yoruba';

export default {
  default: {
    atiAnalyticsAppName: 'default',
    brandName: 'Default Brand Name',
    dir: 'ltr',
    externalLinkText: ', default external link suffix',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    videoCaptionOffscreenText: 'Default video caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    themeColor: '#000',
    fonts: [],
  },
  news,
  persian,
  igbo,
  pidgin,
  yoruba,
};
