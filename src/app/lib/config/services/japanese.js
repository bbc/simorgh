import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';

const service = {
  lang: `ja-JP`,
  articleAuthor: `https://www.facebook.com/bbcnewsjapan/`,
  articleTimestampPrefix: 'TODO',
  atiAnalyticsAppName: 'news-japanese',
  brandName: 'BBCニュース',
  product: 'BBCニュース',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/twitter/bbc_japan_1024.png',
  defaultImageAltText: 'BBCニュース',
  twitterCreator: '@bbcnewsjapan',
  dir: `ltr`,
  externalLinkText: 'TODO',
  imageCaptionOffscreenText: 'TODO',
  videoCaptionOffscreenText: 'TODO',
  audioCaptionOffscreenText: 'TODO',
  defaultCaptionOffscreenText: 'TODO',
  imageCopyrightOffscreenText: 'TODO',
  locale: `ja-JP`,
  datetimeLocale: `ja-JP`.toLowerCase(),
  service: 'japanese',
  serviceName: 'ニュース',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcnewsjapan',
  twitterSite: '@bbcnewsjapan',
  noBylinesPolicy: 'TODO',
  publishingPrinciples: 'TODO',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
};

export default service;
