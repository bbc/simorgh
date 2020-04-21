import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { ukchina as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import 'moment/locale/zh-cn';
import withContext from '../../../contexts/utils/withContext';

const baseServiceConfig = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  articleTimestampPrefix: '更新',
  atiAnalyticsAppName: 'news-ukchina',
  atiAnalyticsProducerId: '93',
  chartbeatDomain: 'ukchina.bbc.co.uk',
  brandName: 'BBC 英伦网',
  product: 'BBC',
  serviceLocalizedName: '英伦网',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukchina.png',
  defaultImageAltText: 'BBC 英伦网',
  dir: `ltr`,
  datetimeLocale: `zh-cn`,
  service: 'ukchina',
  serviceName: 'UK China',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCChina',
  twitterSite: '@BBCChina',
  isTrustProjectParticipant: true,
  script: noAscendersOrDescenders,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
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
    ads: {
      hasAds: false,
    },
    externalLinkText: ', 外部链接',
    frontPageTitle: '主页',
    lang: `zh-hans`,
    locale: `zh-hans`,
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
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
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
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasRecommendations: false,
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
        title: '视频内容',
        url: '/ukchina/simp/media/video',
      },
    ],
    scriptLink: {
      text: '繁',
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
          title: '页面无法找到',
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
          title: '内部伺服器错误',
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
        contentExpired: '此内容已不存在',
        audio: '音频',
        photogallery: '图辑专页',
        video: '视频',
        listen: '收听',
        watch: '观看',
        liveLabel: '直播',
        nextLabel: 'NEXT',
        previousRadioShow: '上期广播节目',
        nextRadioShow: '下期广播节目',
        duration: '节目全长',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: '视频加注文字，',
          text: '告知：第三方内容可能包含广告',
        },
        fallback: {
          text: '无内容',
          linkText: '继续浏览 %provider_name%',
          linkTextSuffixVisuallyHidden: ', 外部链接',
          warningText: 'BBC对外部网站内容不负责任。',
        },
        skipLink: {
          text: '"跳过 %provider_name% 帖子',
          endTextVisuallyHidden: '结尾 %provider_name% 帖子 ',
        },
      },
    },
  },
  trad: {
    ...baseServiceConfig,
    ads: {
      hasAds: false,
    },
    lang: `zh-hant`,
    locale: `zh-hant`,
    externalLinkText: ', 外部鏈接',
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
      lastUpdated: '最近更新: ',
      numberOfItems: 10,
      hasMostRead: true,
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
        title: '視頻內容',
        url: '/ukchina/trad/media/video',
      },
    ],
    scriptLink: {
      text: '简',
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
          title: '頁面無法找到',
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
          title: '內部伺服器錯誤',
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
        nextLabel: 'NEXT',
        previousRadioShow: '上期廣播節目',
        nextRadioShow: '下期廣播節目',
        duration: '節目全長',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: '視頻加註文字，',
          text: '告知：協作方內容可能包含廣告',
        },
        fallback: {
          text: '無內容',
          linkText: '繼續瀏覽 %provider_name%',
          linkTextSuffixVisuallyHidden: ', 外部鏈接',
          warningText: 'BBC對外部網站內容不負責任。',
        },
        skipLink: {
          text: '跳過 %provider_name% 帖子',
          endTextVisuallyHidden: '結尾 %provider_name% 帖子',
        },
      },
    },
  },
};

export default withContext(service);
