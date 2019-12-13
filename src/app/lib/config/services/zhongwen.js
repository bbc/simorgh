import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { zhongwen as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/bbcworldservice/`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-zhongwen',
  atiAnalyticsProducerId: '38',
  brandName: 'BBC News 中文',
  product: 'BBC News',
  serviceLocalizedName: '中文',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/zhongwen.png',
  defaultImageAltText: 'BBC News 中文',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  datetimeLocale: `zh-cn`,
  service: 'zhongwen',
  serviceName: 'News 中文',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcchinese',
  twitterSite: '@bbcchinese',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  isTrustProjectParticipant: true,
  script: noAscendersOrDescenders,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: '主页',
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
  translations: {
    seeAll: 'See all',
    home: 'Home',
    currentPage: 'Current page',
    skipLinkText: 'Skip to content',
    relatedContent: '更多有关此项报道的内容',
    mediaAssetPage: {
      mediaPlayer: 'Media player',
      audioPlayer: 'Audio player',
      videoPlayer: 'Video player',
    },
    error: {
      404: {
        statusCode: '404',
        title: '404-找不到网页',
        message: '这可能是因为你输入错误的网址。请检查网址和拼写方法。',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC新闻网主页',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/zhongwen',
      },
      500: {
        statusCode: '500',
        title: '500-错误',
        message: '出现了错误。请刷新网页。',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC新闻网主页',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/zhongwen',
      },
    },
    consentBanner: {
      privacy: {
        title: "We've updated our Privacy and Cookies Policy",
        description: {
          uk: {
            first:
              "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'OK',
        reject: "Find out what's changed",
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Let us know you agree to cookies',
        description: {
          uk: {
            first: 'We use ',
            linkText: 'cookies',
            last:
              ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'We and our partners use technologies, such as ',
            linkText: 'cookies',
            last:
              ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Yes, I agree',
        reject: 'No, take me to settings',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: '音频',
      photogallery: '图辑',
      video: '视频',
      bbc_cantonese_radio: {
        title: 'BBC时事一周',
        subtitle:
          'BBC中文部提供的国际新闻、分析和资讯、时事和专题内容。可收听或浏览香港电台FM电台广播及网站',
      },
      listen: 'Listen',
      watch: 'Watch',
      liveLabel: 'LIVE',
      previousRadioShow: 'Previous radio show',
      nextRadioShow: 'Next radio show',
      duration: 'Duration',
    },
  },
  brandSVG,
  mostRead: {
    header: 'Most read',
    lastUpdated: 'Last updated: ',
  },
  footer: {
    trustProjectLink: {
      href: 'https://www.bbc.com/news/help-41670342',
      text: 'Why you can trust the BBC',
    },
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Read about our approach to external linking.',
    },
    links: [
      {
        href: 'https://www.bbc.com/terms',
        text: 'Terms of Use',
      },
      {
        href: 'https://www.bbc.com/privacy/',
        text: 'Privacy Policy',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'Contact the BBC',
      },
    ],
    copyrightText: 'BBC。BBC不为BBC以外的网站的内容负责',
  },
  fonts: [],
  timezone: 'GMT',
};

export const service = {
  simp: {
    ...baseServiceConfig,
    lang: `zh-hans`,
    locale: `zh-hans`,
    scriptLinkText: '繁',
    scriptLinkOffscreenText: 'Traditional',
    scriptLinkVariant: 'trad',
    navigation: [
      {
        title: '主页',
        url: '/zhongwen/simp',
      },
      {
        title: '国际',
        url: '/zhongwen/simp/world',
      },
      {
        title: '两岸',
        url: '/zhongwen/simp/chinese_news',
      },
      {
        title: '英国',
        url: '/zhongwen/simp/uk',
      },
      {
        title: '评论',
        url: '/zhongwen/simp/indepth',
      },
      {
        title: '科技',
        url: '/zhongwen/simp/science',
      },
      {
        title: '财经',
        url: '/zhongwen/simp/business',
      },
      {
        title: '图辑',
        url: '/zhongwen/simp/media/photogalleries',
      },
      {
        title: '音频材料',
        url: '/zhongwen/simp/media/audio',
      },
      {
        title: '视频材料',
        url: '/zhongwen/simp/media/video',
      },
      {
        title: 'BBC英伦网',
        url: 'http://www.bbc.co.uk/ukchina/simp',
      },
    ],
    navigationSection: '分类',
  },
  trad: {
    ...baseServiceConfig,
    lang: `zh-hant`,
    locale: `zh-hant`,
    scriptLinkText: '简',
    scriptLinkOffscreenText: 'Simplified',
    scriptLinkVariant: 'simp',
    navigation: [
      {
        title: '主頁',
        url: '/zhongwen/trad',
      },
      {
        title: '國際',
        url: '/zhongwen/trad/world',
      },
      {
        title: '兩岸',
        url: '/zhongwen/trad/chinese_news',
      },
      {
        title: '英國',
        url: '/zhongwen/trad/uk',
      },
      {
        title: '評論',
        url: '/zhongwen/trad/indepth',
      },
      {
        title: '科技',
        url: '/zhongwen/trad/science',
      },
      {
        title: '財經',
        url: '/zhongwen/trad/business',
      },
      {
        title: '圖輯',
        url: '/zhongwen/trad/media/photogalleries',
      },
      {
        title: '音頻材料',
        url: '/zhongwen/trad/media/audio',
      },
      {
        title: '視頻材料',
        url: '/zhongwen/trad/media/video',
      },
      {
        title: 'BBC英倫網',
        url: 'http://www.bbc.co.uk/ukchina/trad',
      },
    ],
    navigationSection: '分類',
  },
};

export default withContext(service);
