/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/
import news from './news';
import persian from './persian';
import igbo from './igbo';
import pidgin from './pidgin';
import thai from './thai';
import yoruba from './yoruba';

export default {
  default: {
    brandName: 'Default Brand Name',
    brandUrl: 'https://www.bbc.com',
    brandMinWidth: 240,
    brandMaxWidth: 380,
    brandSvgHeight: 24,
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
  thai,
  yoruba,
};
