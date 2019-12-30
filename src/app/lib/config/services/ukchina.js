import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { ukchina as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/bbcworldservice/`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-ukchina',
  atiAnalyticsProducerId: '93',
  brandName: 'BBC 英伦网',
  product: 'BBC',
  serviceLocalizedName: '英伦网',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukchina.png',
  defaultImageAltText: 'BBC 英伦网',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  datetimeLocale: `zh-cn`,
  service: 'ukchina',
  serviceName: '英伦网',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCChina',
  twitterSite: '@BBCChina',
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
        callToActionLinkUrl: 'https://www.bbc.com/ukchina',
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
        callToActionLinkUrl: 'https://www.bbc.com/ukchina',
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
      listen: 'Listen',
      watch: 'Watch',
      liveLabel: 'LIVE',
      previousRadioShow: 'Previous radio show',
      nextRadioShow: 'Next radio show',
      duration: 'Duration',
    },
  },
  brandSVG,
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
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    navigation: [
      {
        title: '主页',
        url: '/ukchina/simp',
      },
      {
        title: 'BBC精选',
        url: '/ukchina/simp/horizon',
      },
      {
        title: '英伦风采',
        url: '/ukchina/simp/cool_britannia',
      },
      {
        title: '记者来鸿',
        url: '/ukchina/simp/fooc',
      },
      {
        title: '英国体坛',
        url: '/ukchina/simp/sport',
      },
      {
        title: '视频内容',
        url: '/ukchina/simp/media/video',
      },
      {
        title: '图辑精选',
        url: '/ukchina/simp/media/photogalleries',
      },
    ],
    navigationSection: '分类',
  },
  trad: {
    ...baseServiceConfig,
    lang: `zh-hant`,
    locale: `zh-hant`,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    navigation: [
      {
        title: '主頁',
        url: '/ukchina/trad',
      },
      {
        title: 'BBC精選',
        url: '/ukchina/trad/horizon',
      },
      {
        title: '英倫風采',
        url: '/ukchina/trad/cool_britannia',
      },
      {
        title: '記者來鴻',
        url: '/ukchina/trad/fooc',
      },
      {
        title: '英國體壇',
        url: '/ukchina/trad/sport',
      },
      {
        title: '視頻內容',
        url: '/ukchina/trad/media/video',
      },
      {
        title: '圖輯精選',
        url: '/ukchina/trad/media/photogalleries',
      },
    ],
    navigationSection: '分類',
  },
};

export default withContext(service);
