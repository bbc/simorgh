/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/

import news from './news';
import persian from './persian';

export default {
  default: {
    brandName: 'Default Brand Name',
    externalLinkText: ', default external link suffix',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    themeColor: '#000',
  },
  news: { ...news, article: true, manifest: true, sw: true },
  persian: { ...persian, article: true, manifest: true, sw: true },
  yoruba: { ...news, frontpage: true, sw: true },
  igbo: { ...news, frontpage: true, sw: true },
  pidgin: { ...news, frontpage: true, sw: true },
  thai: { ...news, frontpage: true, sw: true },
};
