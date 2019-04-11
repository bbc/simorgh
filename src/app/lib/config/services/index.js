/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/

import news from './news';
import persian from './persian';
import hausa from './hausa';
import igbo from './igbo';
import pidgin from './pidgin';
import yoruba from './yoruba';

export default {
  default: {
    brandName: 'Default Brand Name',
    externalLinkText: ', default external link suffix',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    themeColor: '#000',
  },
  news,
  persian,
  hausa,
  igbo,
  pidgin,
  yoruba,
};
