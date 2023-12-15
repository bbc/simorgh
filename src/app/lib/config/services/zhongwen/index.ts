import noAscendersOrDescenders from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/GMT';
import 'moment/locale/zh-cn';
import withContext from '../../../../contexts/utils/withContext';
import { ZhongwenConfig } from '../../../../models/types/serviceConfig';
import { Direction, Services } from '../../../../models/types/global';
import { simpTranslations, tradTranslations } from './translations';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/bbcworldservice/`,
  articleTimestampPrefix: '最近更新：',
  articleTimestampSuffix: '',
  atiAnalyticsAppName: 'news-zhongwen',
  atiAnalyticsProducerId: '38',
  chartbeatDomain: 'zhongwen.bbc.co.uk',
  brandName: 'BBC News 中文',
  product: 'BBC News',
  serviceLocalizedName: '中文',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/zhongwen.png',
  defaultImageAltText: 'BBC News 中文',
  dir: 'ltr' as Direction,
  datetimeLocale: `zh-cn`,
  service: 'zhongwen' as Services,
  serviceName: 'News 中文',
  languageName: 'Chinese',
  twitterCreator: '@bbcchinese',
  twitterSite: '@bbcchinese',
  isTrustProjectParticipant: true,
  script: noAscendersOrDescenders,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  radioSchedule: {
    hasRadioSchedule: false,
  },
  recommendations: {
    hasStoryRecommendations: false,
  },
  podcastPromo: {
    title: 'Podcast',
    brandTitle: 'BBC 時事一周 Newsweek (Cantonese)',
    brandDescription:
      'BBC國際台粵語節目，重溫一周國際大事，兩岸四地消息，英國境況。並備有專題環節：〈記者來鴻〉、〈英國生活點滴〉和〈華人談天下〉。',
    image: {
      src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p02h1mg5.jpg',
      alt: 'BBC 時事一周 Newsweek (Cantonese)',
    },
    linkLabel: {
      text: '分集',
      href: 'https://www.bbc.com/zhongwen/trad/podcasts/p02pc9xp',
    },
  },
  showAdPlaceholder: true,
  showRelatedTopics: true,
  fonts: [],
  timezone: 'GMT',
};

export const service: ZhongwenConfig = {
  simp: {
    ...baseServiceConfig,
    externalLinkText: ', 外部',
    frontPageTitle: '主页',
    lang: `zh-hans`,
    locale: `zh-hans`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'zh-Hans',
    defaultCaptionOffscreenText: '说明文字，',
    audioCaptionOffscreenText: '音频加注文字，',
    videoCaptionOffscreenText: '视频加注文字，',
    imageCaptionOffscreenText: '图像加注文字，',
    imageCopyrightOffscreenText: '图像来源，',
    noBylinesPolicy:
      'https://www.bbc.com/zhongwen/simp/institutional-51359584#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/zhongwen/simp/institutional-51359584',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/zhongwen/simp/institutional-51359584',
        text: 'BBC值得信赖的原因',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: '阅读了解我们对待外部链接的做法。',
      },
      links: [
        {
          href: 'https://www.bbc.com/zhongwen/simp/institutional-38652837',
          text: '使用条款',
        },
        {
          href: 'https://www.bbc.com/zhongwen/simp/institutional-38652843',
          text: '隐私政策',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/zhongwen/send/u50778626',
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
      lastUpdated: '最近更新：',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: '热播',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    navigation: [
      {
        title: '主页',
        url: '/zhongwen/simp',
      },
      {
        title: '国际',
        url: '/zhongwen/simp/topics/ck2l9z0em07t',
      },
      {
        title: '两岸',
        url: '/zhongwen/simp/topics/cxe2wdp384wt',
      },
      {
        title: '英国',
        url: '/zhongwen/simp/topics/c1nq04exqmlt',
      },
      {
        title: '科技',
        url: '/zhongwen/simp/topics/c9mjeq29pxlt',
      },
      {
        title: '财经',
        url: '/zhongwen/simp/topics/cdlxq9k9nqkt',
      },
      {
        title: '视频材料',
        url: '/zhongwen/simp/topics/ck5rznle6edt',
      },
      {
        title: 'BBC英伦网',
        url: 'http://www.bbc.co.uk/ukchina/simp',
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
    defaultCaptionOffscreenText: '說明文字，',
    audioCaptionOffscreenText: '音频加注文字，',
    videoCaptionOffscreenText: '音頻加註文字，',
    imageCaptionOffscreenText: '圖像加註文字，',
    imageCopyrightOffscreenText: '圖像來源，',
    noBylinesPolicy:
      'https://www.bbc.com/zhongwen/trad/institutional-51359584#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/zhongwen/trad/institutional-51359584',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/zhongwen/trad/institutional-51359584',
        text: 'BBC值得信賴的原因',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: '閱讀了解我們對待外部鏈接的做法。',
      },
      links: [
        {
          href: 'https://www.bbc.com/zhongwen/trad/institutional-38652837',
          text: '使用條款',
        },
        {
          href: 'https://www.bbc.com/zhongwen/trad/institutional-38652843',
          text: '隱私政策',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/zhongwen/trad/institutional-38664417',
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
      lastUpdated: '最近更新：',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: '熱播',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    navigation: [
      {
        title: '主頁',
        url: '/zhongwen/trad',
      },
      {
        title: '國際',
        url: '/zhongwen/trad/topics/c83plve5vmjt',
      },
      {
        title: '兩岸',
        url: '/zhongwen/trad/topics/c9wpm0e5zv9t',
      },
      {
        title: '英國',
        url: '/zhongwen/trad/topics/c1ez1k4emn0t',
      },
      {
        title: '科技',
        url: '/zhongwen/trad/topics/c32p4kj2yzqt',
      },
      {
        title: '財經',
        url: '/zhongwen/trad/topics/cq8nqywy37yt',
      },
      {
        title: '視頻材料',
        url: '/zhongwen/trad/topics/cgvl47l38e1t',
      },
      {
        title: 'BBC英倫網',
        url: 'http://www.bbc.co.uk/ukchina/trad',
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
