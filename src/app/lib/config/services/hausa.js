import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { hausa as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Europe/London';

const service = {
  default: {
    lang: `ha`,
    articleAuthor: `https://www.facebook.com/bbchausa?v=wall&ref=mf`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-hausa',
    atiAnalyticsProducerId: '51',
    brandName: 'BBC News Hausa',
    product: 'BBC News Hausa',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hausa.png',
    defaultImageAltText: 'BBC News Hausa',
    dir: `ltr`,
    externalLinkText: ', adireshin waje',
    imageCaptionOffscreenText: 'Bayanan hoto, ',
    videoCaptionOffscreenText: 'Bayanan bidiyo, ',
    audioCaptionOffscreenText: 'Bayanan sauti',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Asalin hoton, ',
    locale: `ha-GH`,
    datetimeLocale: `ha-gh`,
    service: 'hausa',
    serviceName: 'News Hausa',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbchausa',
    twitterSite: '@bbchausa',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latin,
    manifestPath: '/hausa/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Labaran Duniya',
    translations: {
      seeAll: 'Duba su baki daya',
      home: 'Labaran Duniya',
      currentPage: 'Current page',
      skipLinkText: 'Tsallaka zuwa abubuwan da ke ciki',
      relatedContent: 'Related content',
      error: {
        404: {
          statusCode: '404',
          title: '404 - Ba za a samu wannan shafin ba',
          message:
            'Afuwa, ba za mu iya kawo maku wannan shafin da kuke nema ba. Sake gwadawa:',
          solutions: [
            'Sake duba adireshin',
            'Sabunta shafin',
            'Bincika shafin ta hanyar amfani da gurbin binciken BBC',
          ],
          callToActionFirst: 'Maimakon haka, ziyarci shafin sashen ',
          callToActionLinkText: 'BBC News Hausa',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/hausa',
        },
        500: {
          statusCode: '500',
          title: "500 - Matsalar na'ura",
          message:
            'Afuwa, ba za mu iya kawo maku wannan shafin da kuke nema ba. Sake gwadawa:',
          solutions: ['Sabunta shafin', 'Ziyarci shafin daga baya'],
          callToActionFirst: 'Maimakon haka, ziyarci shafin sashen ',
          callToActionLinkText: 'BBC News Hausa',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/hausa',
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
        audio: 'Sauti',
        photogallery: 'Hotuna',
        video: 'Bidiyo',
        bbc_hausa_radio: {
          title: 'BBC Hausa Rediyo',
          subtitle:
            "Labaran duniya da sharhi da kuma bayanai kan al'amuran yau da kullum daga sashin Hausa na BBC.",
        },
        bbc_hausa_tv: {
          title: 'Labaran Talabijin',
          subtitle:
            "Sashen Hausa na BBC ya fara gabatar da shirin talabijin a ranakun Litinin zuwa Juma'a na kowane mako.",
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Wanda aka fi karantawa',
      lastUpdated: 'Na baya-bayan nan ',
    },
    footer: {
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Why you can trust the BBC',
        },
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
      copyrightText: 'BBC. BBC ba tada alhaki game da shafukan da ba nata ba',
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Karanta hanyoyin da muke bi dangane da adireshin waje.',
      },
    },
    fonts: [],
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Labaran Duniya',
        url: '/hausa',
      },
      {
        title: 'Wasanni',
        url: '/hausa/wasanni',
      },
      {
        title: 'Mujalla',
        url: '/hausa/mujalla',
      },
      {
        title: 'Cikakkun Rahotanni',
        url: '/hausa/rahotanni',
      },
      {
        title: 'Bidiyo',
        url: '/hausa/media/video',
      },
      {
        title: 'Shirye-shirye na Musamman',
        url: '/hausa/shirye_shirye_na_musamman',
      },
      {
        title: 'Shirye-shiryen rediyo',
        url: '/hausa/media-43322903',
      },
      {
        title: 'Hotuna',
        url: '/hausa/media/photogalleries',
      },
    ],
  },
};

export default service;
