import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';

const service = {
  lang: `zh-cn`,
  articleAuthor: `https://www.facebook.com/bbcworldservice/`,
  articleTimestampPrefix: 'TODO',
  atiAnalyticsAppName: 'news-ukchina',
  brandName: 'BBC News 中文',
  product: 'BBC News 中文',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukchina.png',
  defaultImageAltText: 'BBC News 中文',
  twitterCreator: '@BBCChina',
  dir: `ltr`,
  externalLinkText: 'TODO',
  imageCaptionOffscreenText: 'TODO',
  videoCaptionOffscreenText: 'TODO',
  audioCaptionOffscreenText: 'TODO',
  defaultCaptionOffscreenText: 'TODO',
  imageCopyrightOffscreenText: 'TODO',
  locale: `zh-cn`,
  datetimeLocale: `zh-cn`.toLowerCase(),
  service: 'ukchina',
  serviceName: 'News 中文',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCChina',
  twitterSite: '@BBCChina',
  noBylinesPolicy: 'TODO',
  publishingPrinciples: 'TODO',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
};

export default service;
