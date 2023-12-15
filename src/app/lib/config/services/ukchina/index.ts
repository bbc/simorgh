import noAscendersOrDescenders from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/GMT';
import 'moment/locale/zh-cn';
import withContext from '../../../../contexts/utils/withContext';
import { ChineseConfig } from '../../../../models/types/serviceConfig';
import { Direction, Services } from '../../../../models/types/global';
import { simpTranslations, tradTranslations } from './translations';

const baseServiceConfig = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  articleTimestampPrefix: '更新',
  articleTimestampSuffix: '',
  atiAnalyticsAppName: 'news-ukchina',
  atiAnalyticsProducerId: '93',
  chartbeatDomain: 'ukchina.bbc.co.uk',
  brandName: 'BBC 英伦网',
  product: 'BBC',
  serviceLocalizedName: '英伦网',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukchina.png',
  defaultImageAltText: 'BBC 英伦网',
  dir: 'ltr' as Direction,
  datetimeLocale: `zh-cn`,
  service: 'ukchina' as Services,
  serviceName: 'UK China',
  languageName: 'Chinese',
  twitterCreator: '@BBCChina',
  twitterSite: '@BBCChina',
  isTrustProjectParticipant: true,
  script: noAscendersOrDescenders,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  showAdPlaceholder: true,
  showRelatedTopics: true,
  timezone: 'GMT',
};

export const service: ChineseConfig = {
  simp: {
    ...baseServiceConfig,
    externalLinkText: ', 外部',
    frontPageTitle: '主页',
    lang: `zh-hans`,
    locale: `zh-hans`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'zh-Hans',
    defaultCaptionOffscreenText: '说明文字, ',
    audioCaptionOffscreenText: '音频加注文字, ',
    videoCaptionOffscreenText: '视频加注文字, ',
    imageCaptionOffscreenText: '图像加注文字, ',
    imageCopyrightOffscreenText: '图像来源, ',
    noBylinesPolicy:
      'https://www.bbc.com/ukchina/simp/institutional-51359562#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/ukchina/simp/institutional-51359562',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/ukchina/simp/institutional-51359562',
        text: 'BBC值得信赖的原因',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: '阅读了解我们对待外部链接的做法。',
      },
      links: [
        {
          href: 'https://www.bbc.com/ukchina/simp/institutional-38732865',
          text: '使用条款',
        },
        {
          href: 'https://www.bbc.com/ukchina/simp/institutional-38733670',
          text: '隐私政策',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/ukchina/send/u50853863',
          text: '联络BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC对外部网站内容不负责任。',
    },
    mostRead: {
      header: '热读',
      lastUpdated: '最近更新: ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: '热播',
      numberOfItems: 5,
      hasMostWatched: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: '主页',
        url: '/ukchina/simp',
      },
    ],
    scriptLink: {
      text: '繁',
      variant: 'trad',
    },
    translations: { ...simpTranslations },
  },
  trad: {
    ...baseServiceConfig,
    lang: `zh-hant`,
    locale: `zh-hant`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'zh-Hant',
    externalLinkText: ', 外部',
    frontPageTitle: '主頁',
    defaultCaptionOffscreenText: '說明文字, ',
    audioCaptionOffscreenText: '音頻加註文字，',
    videoCaptionOffscreenText: '視頻加註文字，',
    imageCaptionOffscreenText: '圖像加註文字，',
    imageCopyrightOffscreenText: '圖像來源，',
    noBylinesPolicy:
      'https://www.bbc.com/ukchina/trad/institutional-51359562#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/ukchina/trad/institutional-51359562',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/ukchina/trad/institutional-51359562',
        text: 'BBC值得信賴的原因',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: '閱讀了解我們對待外部鏈接的做法。',
      },
      links: [
        {
          href: 'https://www.bbc.com/ukchina/trad/institutional-38732865',
          text: '使用條款',
        },
        {
          href: 'https://www.bbc.com/ukchina/trad/institutional-38733670',
          text: '隱私政策',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/ukchina/trad/institutional-38733406',
          text: '聯絡BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC對外部網站內容不負責任。',
    },
    mostRead: {
      header: '熱讀',
      lastUpdated: '最近更新: ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: '熱播',
      numberOfItems: 5,
      hasMostWatched: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: '主頁',
        url: '/ukchina/trad',
      },
    ],
    scriptLink: {
      text: '简',
      variant: 'simp',
    },
    translations: { ...tradTranslations },
  },
};

export default withContext(service);
