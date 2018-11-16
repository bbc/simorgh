import faTranslations from '../translations/fa';
import enGbTranslations from '../translations/en-gb';

const persian = {
  brandName: 'BBC News فارسی',
  serviceName: 'Persian',
  service: 'persian',
  articleAuthor: 'https://www.facebook.com/bbcnews',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
  defaultImageAltText: 'BBC News فارسی',
  locale: 'fa',
  twitterCreator: '@bbcpersian',
  twitterSite: '@bbcpersian',
  translations: { ...enGbTranslations, ...faTranslations },
};

export default persian;
