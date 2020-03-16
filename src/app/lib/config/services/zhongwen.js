import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { zhongwen as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import 'moment/locale/zh-cn';
import withContext from '../../../contexts/utils/withContext';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/bbcworldservice/`,
  articleTimestampPrefix: '最近更新：',
  atiAnalyticsAppName: 'news-zhongwen',
  atiAnalyticsProducerId: '38',
  chartbeatDomain: 'zhongwen.bbc.co.uk',
  brandName: 'BBC News 中文',
  product: 'BBC News',
  serviceLocalizedName: '中文',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/zhongwen.png',
  defaultImageAltText: 'BBC News 中文',
  dir: `ltr`,
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
  radioSchedule: {
    hasRadioSchedule: false,
  },
  brandSVG,
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
  fonts: [],
  timezone: 'GMT',
};

export const service = {
  simp: {
    ...baseServiceConfig,
    externalLinkText: ', 外部链接',
    frontPageTitle: '主页',
    lang: `zh-hans`,
    locale: `zh-hans`,
    defaultCaptionOffscreenText: '说明文字，',
    audioCaptionOffscreenText: '音频加注文字，',
    videoCaptionOffscreenText: '视频加注文字，',
    imageCaptionOffscreenText: '图像加注文字，',
    imageCopyrightOffscreenText: '图像来源，',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'BBC值得信赖的原因',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: '阅读了解我们对待外部链接的做法。',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: '使用条款',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: '隐私政策',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: '联络BBC',
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
    scriptLink: {
      text: '繁',
      offscreenText: 'Traditional',
      variant: 'trad',
    },
    translations: {
      seeAll: '浏览全部',
      home: '主页',
      currentPage: '目前页面',
      skipLinkText: '跳过此内容',
      relatedContent: '更多相关内容',
      navMenuText: '分类',
      mediaAssetPage: {
        mediaPlayer: '多媒体播放器',
        audioPlayer: '音频播放器',
        videoPlayer: '视频播放器',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404-页面无法找到',
          message: '对不起，我们无法找到您所需页面。请尝试：',
          solutions: [
            '双次点击这个链接',
            '点击浏览器上的更新钮',
            '使用BBC搜索栏搜寻此页面',
          ],
          callToActionFirst: '或者，请访问',
          callToActionLinkText: 'BBC 英伦网',
          callToActionLast: '官网主页',
          callToActionLinkUrl: 'https://www.bbc.com/ukchina/simp',
        },
        500: {
          statusCode: '500',
          title: '500-内部伺服器错误',
          message: '对不起，我们无法找到您所需页面。请尝试：',
          solutions: ['点击浏览器上的更新钮', '请稍候再试'],
          callToActionFirst: '或者，请访问',
          callToActionLinkText: 'BBC 英伦网',
          callToActionLast: '官网主页',
          callToActionLinkUrl: 'https://www.bbc.com/ukchina/simp',
        },
      },
      consentBanner: {
        privacy: {
          title: '我们更新了隐私和Cookies条款',
          description: {
            uk: {
              first:
                '我们在隐私和Cookies条款上有重要更新，希望告知这对您和您的数据意味着什么。',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                '我们在隐私和Cookies条款上有重要更新，希望告知这对您和您的数据意味着什么。',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: '可以',
          reject: '了解更新内容',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: '请告知您认可接受Cookies',
          description: {
            uk: {
              first: '我们使用',
              linkText: 'cookies',
              last: '以便给您最好的网上体验。请告知您是否认同使cookies。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: '我们及合作伙伴使用例如',
              linkText: 'cookies',
              last:
                '的科技，收集浏览数据以便给您带来最佳上网体验，以及个人化内容和广告配置。请告知是否可以。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: '可以，我同意',
          reject: '不可，带我去设置页面',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: '你的器材不支持播放多媒体材料',
        contentExpired: '有关内容已经不再向读者观众提供',
        audio: '音频',
        photogallery: '图辑专页',
        video: '视频',
        listen: '收听',
        watch: '观看',
        liveLabel: '直播',
        previousRadioShow: '上期广播节目',
        nextRadioShow: '下期广播节目',
        duration: '节目全长',
      },
    },
  },
  trad: {
    ...baseServiceConfig,
    lang: `zh-hant`,
    locale: `zh-hant`,
    externalLinkText: ', 外部鏈接',
    frontPageTitle: '主頁',
    defaultCaptionOffscreenText: '說明文字，',
    audioCaptionOffscreenText: '音频加注文字，',
    videoCaptionOffscreenText: '音頻加註文字，',
    imageCaptionOffscreenText: '圖像加註文字，',
    imageCopyrightOffscreenText: '圖像來源，',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'BBC值得信賴的原因',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: '閱讀了解我們對待外部鏈接的做法。',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: '使用條款',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: '隱私政策',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: '聯絡BBC',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
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
    scriptLink: {
      text: '简',
      offscreenText: 'Simplified',
      variant: 'simp',
    },
    translations: {
      seeAll: '瀏覽全部',
      home: '主頁',
      currentPage: '目前頁面',
      skipLinkText: '跳過此內容',
      relatedContent: '更多相關內容',
      navMenuText: '分類',
      mediaAssetPage: {
        mediaPlayer: '多媒體播放器',
        audioPlayer: '音頻播放器',
        videoPlayer: '視頻播放器',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404-頁面無法找到',
          message: '對不起，我們無法找到您所需頁面。請嘗試：',
          solutions: [
            '雙次點擊這個鏈接',
            '點擊瀏覽器上的更新鈕',
            '使用BBC搜索欄搜尋此頁面',
          ],
          callToActionFirst: '或者，請訪問',
          callToActionLinkText: 'BBC 英伦网',
          callToActionLast: '官網主頁',
          callToActionLinkUrl: 'https://www.bbc.com/ukchina/trad',
        },
        500: {
          statusCode: '500',
          title: '500-內部伺服器錯誤',
          message: '對不起，我們無法找到您所需頁面。請嘗試：',
          solutions: ['點擊瀏覽器上的更新鈕', '請稍候再試'],
          callToActionFirst: '或者，請訪問',
          callToActionLinkText: 'BBC 英伦网',
          callToActionLast: '官網主頁',
          callToActionLinkUrl: 'https://www.bbc.com/ukchina/trad',
        },
      },
      consentBanner: {
        privacy: {
          title: '我們更新了隱私和Cookies條款',
          description: {
            uk: {
              first:
                '我們在隱私和Cookies條款上有重要更新，希望告知這對您和您的數據意味著什麼。',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                '我們在隱私和Cookies條款上有重要更新，希望告知這對您和您的數據意味著什麼。',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: '可以',
          reject: '了解更新內容',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: '請告知您認可接受Cookies',
          description: {
            uk: {
              first: '我們使用',
              linkText: 'cookies',
              last: '以便給您最好的網上體驗。請告知您是否認同使cookies。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: '我們及合作夥伴使用例如',
              linkText: 'cookies',
              last:
                '的科技，收集瀏覽數據以便給您帶來最佳上網體驗，以及個人化內容和廣告配置。請告知是否可以。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: '可以，我同意',
          reject: '不可，帶我去設置頁面',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: '你的器材不支持播放多媒體材料',
        contentExpired: '有關內容已經不再向讀者觀眾提供。',
        audio: '音頻',
        photogallery: '圖輯專頁',
        video: '視頻',
        listen: '收聽',
        watch: '觀看',
        liveLabel: '直播',
        previousRadioShow: '上期廣播節目',
        nextRadioShow: '下期廣播節目',
        duration: '節目全長',
      },
    },
  },
};

export default withContext(service);
