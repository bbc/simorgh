import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';

const service = {
  lang: `ar-SA`,
  articleAuthor: `http://www.facebook.com/bbcarabic`,
  articleTimestampPrefix: 'TODO',
  atiAnalyticsAppName: 'news-arabic',
  brandName: 'BBC News Arabic',
  product: 'BBC News Arabic',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
  defaultImageAltText: 'BBC News Arabic',
  twitterCreator: '@BBCArabic',
  dir: `ltr`,
  externalLinkText: 'TODO',
  imageCaptionOffscreenText: 'TODO',
  videoCaptionOffscreenText: 'TODO',
  audioCaptionOffscreenText: 'TODO',
  defaultCaptionOffscreenText: 'TODO',
  imageCopyrightOffscreenText: 'TODO',
  locale: `ar-SA`,
  datetimeLocale: `ar-SA`.toLowerCase(),
  service: 'arabic',
  serviceName: 'News Arabic',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCArabic',
  twitterSite: '@BBCArabic',
  noBylinesPolicy: 'TODO',
  publishingPrinciples: 'TODO',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
};

export default service;
