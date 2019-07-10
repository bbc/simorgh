import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';

const service = {
  lang: `zh_CN`,
  articleAuthor: `https://www.facebook.com/bbcworldservice/`,
  articleTimestampPrefix: 'TODO',
  atiAnalyticsAppName: 'news-zhongwen',
  brandName: 'BBC News 中文',
  product: 'BBC News 中文',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/zhongwen.png',
  defaultImageAltText: 'BBC News 中文',
  twitterCreator: '@bbcchinese',
  dir: `ltr`,
  externalLinkText: 'TODO',
  imageCaptionOffscreenText: 'TODO',
  videoCaptionOffscreenText: 'TODO',
  audioCaptionOffscreenText: 'TODO',
  defaultCaptionOffscreenText: 'TODO',
  imageCopyrightOffscreenText: 'TODO',
  locale: `zh_CN`,
  datetimeLocale: `zh_CN`.toLowerCase(),
  service: 'zhongwen',
  serviceName: 'News 中文',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcchinese',
  twitterSite: '@bbcchinese',
  noBylinesPolicy: 'TODO',
  publishingPrinciples: 'TODO',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
};

export default service;
