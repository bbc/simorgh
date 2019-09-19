import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { swahili as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Africa/Nairobi';

const service = {
  default: {
    lang: `sw`,
    articleAuthor: `https://www.facebook.com/pages/BBC-Swahili/160894643929209?v=wall`,
    articleTimestampPrefix: 'Imeboreshwa',
    atiAnalyticsAppName: 'news-swahili',
    atiAnalyticsProducerId: '86',
    brandName: 'BBC News Swahili',
    product: 'BBC News Swahili',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/swahili.png',
    defaultImageAltText: 'BBC News Swahili',
    dir: `ltr`,
    externalLinkText: ', ya nje',
    imageCaptionOffscreenText: 'Maelezo ya picha, ',
    videoCaptionOffscreenText: 'Maelezo ya video, ',
    audioCaptionOffscreenText: 'Maelezo ya sauti, ',
    defaultCaptionOffscreenText: 'Maelezo, ',
    imageCopyrightOffscreenText: 'Chanzo cha picha, ',
    locale: `sw-KE`,
    datetimeLocale: `sw-ke`,
    service: 'swahili',
    serviceName: 'News Swahili',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcswahili',
    twitterSite: '@bbcswahili',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Swahili',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Tazama zote',
      home: 'Habari',
      currentPage: 'Ukurasa uliopo',
      skipLinkText: 'Ruka hadi maelezo',
      relatedContent: 'Related content',
      error: {
        404: {
          statusCode: '404',
          title: '404 - Ukurasa haupatikani',
          message:
            'Samahani, hatuwezi kukupeleka kwenye ukurasa unaoutafuta. Tafadhali jaribu:',
          solutions: [
            'Tunaitazama kwa mara ya pili url',
            'Kubonyeza kitufe cha kufungua upya ukurasa',
            'Tafuta ukurasa huu kwa kutumia sehemu ya Tafuta kwenye ukurasa wa BBC',
          ],
          callToActionFirst: 'Pia, tafadhali tembelea ukurasa wa ',
          callToActionLinkText: 'kwanza wa BBC News Swahili',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/swahili',
        },
        500: {
          statusCode: '500',
          title: '500 - Hitilafu katika server ya ndani',
          message:
            'Samahani, hatuwezi kukuletea ukurasa unaoutafuta. Tafadhali jaribu:',
          solutions: [
            'Kubonyeza kitufe cha kufungua upya ukurasa',
            'Inarudi tena baadaye',
          ],
          callToActionFirst: 'Pia, tafadhali tembelea ukurasa wa ',
          callToActionLinkText: 'kwanza wa BBC News Swahili',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/swahili',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Tumeboresha sera yetu ya faragha na vidakuzi au cookies',
          description: {
            uk: {
              first:
                'Tumefanya mabadiliko muhimu katika sera zetu za faragha na vidakuzi au cookies na tungependa ufahamu ina maana gani kwako na data yako.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Tumefanya mabadiliko muhimu katika sera zetu za faragha na vidakuzi au cookies na tungependa ufahamu ina maana gani kwako na data yako.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ndio',
          reject: 'Fahamu kilichobadilika',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Tufahamishe iwapo unakubali kupokea cookies',
          description: {
            uk: {
              first: 'Tunatumia ',
              linkText: 'kuki',
              last:
                ' kukufanya ufurahie mtandao. Tafadhali tufahamishe iwapo unakubali kupokea cookies au vidakuzi vyote hivi',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Sisi na washirika wetu tunatumia teknolojia kama vile ',
              linkText: 'vidakuzi au cookies',
              last:
                ', na tunakusanya data katika mtandao kukufanya ufurahie matumizi ya mtandao na kukupa taarifa zinazokuvutia na matangazo unayoyaona. Tafadhali tufahamishe iwapo unakubali.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Ndio, ninakubali',
          reject: 'Hapana, nipeleke kwa mpangilio',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'Sauti',
        photogallery: 'Mkusanyiko wa picha',
        video: 'Video',
        bbc_swahili_radio: {
          title: 'BBC Swahili Radio',
          subtitle:
            'Habari za kimataifa, michezo na uchambuzi kutoka kwa idhaa ya dunia.',
        },
        bbc_swahili_tv: {
          title: 'Mitikasi Leo',
          subtitle:
            'Mitikasi Leo ina taarifa za biashara, uchambuzi na maoni ya wataalam wa 100bora kila siku.',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Iliyosomwa zaidi',
      lastUpdated: 'Imeboreshwa mwisho: ',
    },
    footer: {
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Kwanini unaweza kuiamini BBC News',
        },
        {
          href: 'https://www.bbc.com/terms',
          text: 'Sheria ya matumizi',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Sera ya faragha',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Wasiliana na BBC',
        },
      ],
      copyrightText: 'BBC. BBC haihusiki na taarifa za kutoka mitandao ya nje.',
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Soma kuhusu mtazamo wetu wa viambatanishi vya nje.',
      },
    },
    fonts: [],
    timezone: 'Africa/Nairobi',
    navigation: [
      {
        title: 'Habari',
        url: '/swahili',
      },
      {
        title: 'Michezo',
        url: '/swahili/michezo',
      },
      {
        title: 'Video',
        url: '/swahili/media/video',
      },
      {
        title: 'Sauti',
        url: '/swahili/media/audio',
      },
      {
        title: 'Vipindi vya Redio',
        url: '/swahili/kwa_kina/redio',
      },
      {
        title: 'Picha',
        url: '/swahili/media/photogalleries',
      },
    ],
  },
};

export default service;
