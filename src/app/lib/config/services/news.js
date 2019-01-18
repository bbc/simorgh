/* eslint-disable global-require */
import { C_POSTBOX } from '@bbc/psammead-styles/colours';

const news = {
  articleAuthor: `https://www.facebook.com/bbcnews`,
  brandName: 'BBC News',
  defaultImage:
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
  defaultImageAltText: 'BBC News',
  imageCaptionOffscreenText: 'Image caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: 'en_GB',
  service: 'news',
  serviceName: 'News',
  twitterCreator: '@BBCNews',
  twitterSite: '@BBCNews',
  start_url: '/news/articles/c9rpqy7pmypo',
  site_colour: C_POSTBOX,
  icons: {
    '72x72': require('../../../../../public/images/news/icons/icon-72x72.png'),
    '96x96': require('../../../../../public/images/news/icons/icon-96x96.png'),
    '128x128': require('../../../../../public/images/news/icons/icon-128x128.png'),
    '144x144': require('../../../../../public/images/news/icons/icon-144x144.png'),
    '152x152': require('../../../../../public/images/news/icons/icon-152x152.png'),
    '192x192': require('../../../../../public/images/news/icons/icon-192x192.png'),
    '384x384': require('../../../../../public/images/news/icons/icon-384x384.png'),
    '512x512': require('../../../../../public/images/news/icons/icon-512x512.png'),
  },
};

export default news;
