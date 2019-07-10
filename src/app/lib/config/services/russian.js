import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';

const service = {
  lang: `ru-RU`,
  articleAuthor: `https://www.facebook.com/bbcrussian`,
  articleTimestampPrefix: 'TODO',
  atiAnalyticsAppName: 'news-russian',
  brandName: 'BBC News Русская служба',
  product: 'BBC News Русская служба',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/russian.png',
  defaultImageAltText: 'BBC News Русская служба',
  twitterCreator: '@bbcrussian',
  dir: `ltr`,
  externalLinkText: 'TODO',
  imageCaptionOffscreenText: 'TODO',
  videoCaptionOffscreenText: 'TODO',
  audioCaptionOffscreenText: 'TODO',
  defaultCaptionOffscreenText: 'TODO',
  imageCopyrightOffscreenText: 'TODO',
  locale: `ru-RU`,
  datetimeLocale: `ru-RU`.toLowerCase(),
  service: 'russian',
  serviceName: 'News Русская служба',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcrussian',
  twitterSite: '@bbcrussian',
  noBylinesPolicy: 'TODO',
  publishingPrinciples: 'TODO',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
};

export default service;
