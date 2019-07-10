import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';

const service = {
  lang: `ko-KO`,
  articleAuthor: `https://www.facebook.com/bbcnewskorean`,
  articleTimestampPrefix: 'TODO',
  atiAnalyticsAppName: 'news-korean',
  brandName: 'BBC News 코리아',
  product: 'BBC News 코리아',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
  defaultImageAltText: 'BBC News 코리아',
  twitterCreator: '@bbcworld',
  dir: `ltr`,
  externalLinkText: 'TODO',
  imageCaptionOffscreenText: 'TODO',
  videoCaptionOffscreenText: 'TODO',
  audioCaptionOffscreenText: 'TODO',
  defaultCaptionOffscreenText: 'TODO',
  imageCopyrightOffscreenText: 'TODO',
  locale: `ko-KO`,
  datetimeLocale: `ko-KO`.toLowerCase(),
  service: 'korean',
  serviceName: 'News 코리아',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcworld',
  twitterSite: '@bbcworld',
  noBylinesPolicy: 'TODO',
  publishingPrinciples: 'TODO',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
};

export default service;
