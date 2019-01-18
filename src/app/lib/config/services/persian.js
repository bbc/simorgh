/* eslint-disable global-require */
import { C_POSTBOX } from '@bbc/psammead-styles/colours';

const persian = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  brandName: 'BBC News فارسی',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
  defaultImageAltText: 'BBC News فارسی',
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  imageCopyrightOffscreenText: ' ، منبع تصویر',
  locale: 'fa',
  service: 'persian',
  serviceName: 'Persian',
  twitterCreator: '@bbcpersian',
  twitterSite: '@bbcpersian',
  start_url: '/persian/articles/cwv2xv848j5o',
  site_colour: C_POSTBOX,
  icons: {
    '72x72': require('../../../../../public/images/persian/icons/icon-72x72.png'),
    '96x96': require('../../../../../public/images/persian/icons/icon-96x96.png'),
    '128x128': require('../../../../../public/images/persian/icons/icon-128x128.png'),
    '144x144': require('../../../../../public/images/persian/icons/icon-144x144.png'),
    '152x152': require('../../../../../public/images/persian/icons/icon-152x152.png'),
    '192x192': require('../../../../../public/images/persian/icons/icon-192x192.png'),
    '384x384': require('../../../../../public/images/persian/icons/icon-384x384.png'),
    '512x512': require('../../../../../public/images/persian/icons/icon-512x512.png'),
  },
};

export default persian;
