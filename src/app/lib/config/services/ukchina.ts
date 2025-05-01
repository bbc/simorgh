import noAscendersOrDescenders from '../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/GMT';
import 'moment/locale/zh-cn';
import withContext from '../../../contexts/utils/withContext';
import { ChineseConfig } from '../../../models/types/serviceConfig';
import { Direction, Services } from '../../../models/types/global';

const baseServiceConfig = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  articleTimestampPrefix: '更新',
  articleTimestampSuffix: '',
  atiAnalyticsAppName: 'news-ukchina',
  atiAnalyticsProducerId: '93',
  atiAnalyticsProducerName: 'UK_CHINA',
  useReverb: true,
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
  manifestPath: '/ukchina/manifest.json',
  swPath: '/sw.js',
  showAdPlaceholder: true,
  showRelatedTopics: true,
  timezone: 'GMT',
};

export const service: ChineseConfig = {
  simp: {
    ...baseServiceConfig,
    externalLinkText: ', 外部',
    homePageTitle: '主页',
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
      header: 'Popular Reads',
      lastUpdated: '最近更新: ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      header: '熱讀',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
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
    translations: {
      pagination: {
        previousPage: '前页',
        nextPage: '后页',
        pageXOfY: 'Page {x} 的 {y}',
      },
      ads: {
        advertisementLabel: '广告',
      },
      seeAll: '浏览全部',
      home: '主页',
      currentPage: '目前页面',
      skipLinkText: '跳过此内容',
      relatedContent: '更多相关内容',
      relatedTopics: '相关主题内容',
      navMenuText: '分类',
      mediaAssetPage: {
        mediaPlayer: '多媒体播放器',
        audioPlayer: '音频播放器',
        videoPlayer: '视频播放器',
      },
      liveExperiencePage: {
        liveLabel: '直播',
        liveCoverage: '现场直播',
        breaking: '最新消息',
        postedAt: '张贴于',
        summary: '概要',
        shareButtonText: '分享',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: '概要',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: '接受数据收集并继续',
            reject: '拒绝数据收集并继续',
            initial: {
              title: '请告知是否允许我们在AMP收集数据',
              description: {
                first: '我们及合作伙伴使用例如',
                linkText: 'cookies',
                last: '的科技，收集浏览数据以便给您带来最佳上网体验，以及个人化内容和广告配置。请告知是否可以。',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: '管理我的设置',
            },
            manage: {
              title: '管理AMP页面认可授权设置',
              description: {
                para1:
                  '上述设置仅用于AMP页面。如果您再度访问沒有AMP技术的BBC.com网页，也可能会被要求设定个人选项。',
                para2:
                  '您刚刚浏览的上述轻载移动页面，建立时使用了谷歌AMP技术。',
                heading2: '仅限于必需数据收集',
                para3:
                  '为使网页运作正常，我们或在未争得许可时收集有限必要资讯。',
                para4: {
                  text: '阅读更多我们在您的浏览器上存储必需数据，以便页面正常运作的相关资讯',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5: '我们使用本地存储，将选项存储于您的浏览工具上。',
                heading3: '可选项数据收集',
                para6:
                  '认可AMP页面收集数据，也就是认可您在英国之外区域浏览页面时我们可以显示个人化的广告。',
                para7: {
                  text: '阅读更多有关BBC及合作伙伴如何实现广告个人化的资讯',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  '您可以选择点击“拒绝数据收集并继续”，选择不接受个人化广告。请注意，这一选项并不意味着您将不再看到广告，只是您看到的广告将不具备个人化设置。',
                para9:
                  '您可以点击页面下边“Ad Choices / Do not sell my info”选项，更改这些设置。',
              },
            },
          },
          canonical: {
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
                first: '我们使用',
                linkText: 'cookies',
                last: '以便给您最好的网上体验。请告知您是否认同使cookies。',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: '可以，我同意',
            reject: '不可，带我去设置页面',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: '你的器材不支持播放多媒体材料',
        contentExpired: '此内容已不存在',
        contentNotYetAvailable: '有关内容暂时尚未可以为你提供。',
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
        recentEpisodes: '存档节目',
        closeVideo: '退出',
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
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: '头条内容',
      featuresAnalysisTitle: '特别推荐',
    },
  },
  trad: {
    ...baseServiceConfig,
    lang: `zh-hant`,
    locale: `zh-hant`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'zh-Hant',
    externalLinkText: ', 外部',
    homePageTitle: '主頁',
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
      header: 'Popular Reads',
      lastUpdated: '最近更新: ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    recommendations: {
      header: '熱讀',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
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
    translations: {
      pagination: {
        previousPage: '前页',
        nextPage: '后页',
        pageXOfY: 'Page {x} 的 {y}',
      },
      ads: {
        advertisementLabel: '廣告',
      },
      seeAll: '瀏覽全部',
      home: '主頁',
      currentPage: '目前頁面',
      skipLinkText: '跳過此內容',
      relatedContent: '更多相關內容',
      relatedTopics: '相關主題內容',
      navMenuText: '分類',
      mediaAssetPage: {
        mediaPlayer: '多媒體播放器',
        audioPlayer: '音頻播放器',
        videoPlayer: '視頻播放器',
      },
      liveExperiencePage: {
        liveLabel: '直播',
        liveCoverage: '現場直播',
        breaking: '最新消息',
        postedAt: '張貼在',
        summary: '概要',
        shareButtonText: '分享',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: '概要',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: '接受數據收集並繼續',
            reject: '拒絕數據收集並繼續',
            initial: {
              title: '請告知是否允許我們在AMP收集數據',
              description: {
                first: '我們及合作夥伴使用例如',
                linkText: 'cookies',
                last: '的科技，收集瀏覽數據以便給您帶來最佳上網體驗，以及個人化內容和廣告配置。請告知是否可以。',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: '管理我的設置',
            },
            manage: {
              title: '管理AMP頁面認可授權設置',
              description: {
                para1:
                  '上述設置僅用於AMP頁面。如果您再度訪問沒有AMP技術的BBC.com網頁，也可能會被要求設定個人選項。',
                para2:
                  '您剛剛瀏覽的上述輕載移動頁面，建立時使用了谷歌AMP技術。',
                heading2: '僅限於必須數據收集',
                para3:
                  '為使網頁運作正常，我們或在未爭得許可時收集有限必要資訊。',
                para4: {
                  text: '閲讀更多我們在您的瀏覽器上存儲必需數據，以便頁面正常運作的相關資訊',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5: '我們使用本地存儲，將選項存儲於您的瀏覽工具上。',
                heading3: '可選項數據收集',
                para6:
                  '認可AMP頁面收集數據，也就是認可您在英國之外區域瀏覽頁面時我們可以顯示個人化的廣告。',
                para7: {
                  text: '閲讀更多有關BBC及合作夥伴如何實現廣告個人化的咨訊',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  '您可以選擇點擊“拒絕數據收集並繼續”，選擇不接受個人化廣告。請注意，這一選項並不意味著您將不再看到廣告，只是您看到的廣告將不具備個人化設置。',
                para9:
                  '您可以點擊頁面下邊“Ad Choices / Do not sell my info”選項，更改這些設置。',
              },
            },
          },
          canonical: {
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
                last: '的科技，收集瀏覽數據以便給您帶來最佳上網體驗，以及個人化內容和廣告配置。請告知是否可以。',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: '可以，我同意',
            reject: '不可，帶我去設置頁面',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: '你的器材不支持播放多媒體材料',
        contentExpired: '有關內容已經不再向讀者觀眾提供。',
        contentNotYetAvailable: '有关内容暂时尚未可以为你提供。',
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
        recentEpisodes: '存档节目',
        closeVideo: '退出',
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
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: '頭條內容',
      featuresAnalysisTitle: '特別推薦',
    },
  },
};

export default withContext(service);
