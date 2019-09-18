import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { gahuza as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Europe/London';

const service = {
  default: {
    lang: `rw`,
    articleAuthor: `https://www.facebook.com/BBCGahuza`,
    articleTimestampPrefix: 'Vyavuguruwe ',
    atiAnalyticsAppName: 'news-gahuza',
    atiAnalyticsProducerId: '40',
    brandName: 'BBC News Gahuza',
    product: 'BBC News Gahuza',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/gahuza.png',
    defaultImageAltText: 'BBC News Gahuza',
    dir: `ltr`,
    externalLinkText: ', bivuye ahandi',
    imageCaptionOffscreenText: "Insiguro y'isanamu, ",
    videoCaptionOffscreenText: 'Insiguro ya video, ',
    audioCaptionOffscreenText: "Insiguro y'amajwi, ",
    defaultCaptionOffscreenText: 'Insiguro, ',
    imageCopyrightOffscreenText: 'Ahavuye isanamu, ',
    locale: `rw-RW`,
    datetimeLocale: `rw-rw`,
    service: 'gahuza',
    serviceName: 'News Gahuza',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcgahuza',
    twitterSite: '@bbcgahuza',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: "Urupapuro rw'itangiriro",
    translations: {
      seeAll: 'Raba vyose',
      home: `Urupapuro rw'itangiriro`,
      currentPage: 'Uru rupapuro',
      skipLinkText: 'Simbira ku birimwo',
      relatedContent: 'Ibindi bisa n’ibi',
      error: {
        404: {
          statusCode: '404',
          title: 'Urubapuro ntirwabonetse',
          message:
            'Tubabarire ntidushoboye kukuronsa urupapuro warondera. Tugusavye kugerageza:',
          solutions: [
            'Turi kugenzura umuhora ulr',
            'Gufyonda ubuto refresh mu buryo bwawe bwa internet',
            'Kurondera uru rupapuro uciye mu buryo bwa BBC bwo kurondera',
          ],
          callToActionFirst: "Nk'ubundi buryo, tugusavye kuja kuri ",
          callToActionLinkText: 'BBC News Gahuza',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/gahuza',
        },
        500: {
          statusCode: '500',
          title: "Ikibazo c'ubuhinga bwacu",
          message:
            'Tubabarire ntidushoboye kukuronsa urupapuro warondera. Tugusavye kugerageza:',
          solutions: [
            'Gufyonda ubuto refresh mu buryo bwawe bwa internet',
            'Uragaruka hanyuma',
          ],
          callToActionFirst: "Nk'ubundi buryo, tugusavye kuja kuri ",
          callToActionLinkText: 'BBC News Gahuza',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/gahuza',
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
        audio: 'Umviriza',
        photogallery: 'Amasanamu',
        video: 'Video',
        bbc_gahuza_radio: {
          title: 'Radio BBC Gahuza',
          subtitle:
            'Amakuru y’amahanga, ubusesenguzi, amakuru y’akarere k’ibiyaga bigari, ikinamico, ubuzima, imibereho y’abagore. Kuri FM no kuri internet.',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Ibisomwa cane',
      lastUpdated: 'Ibiheruka kuvugururwa: ',
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: "Soma ibijanye n'aho duhagaze ku mihora ijana ahandi",
      },
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Igituma ushobora kwizera BBC News',
        },
        {
          href: 'https://www.bbc.com/terms',
          text: 'Ingingo zo gukoresha urubuga',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Ibigenga ubuzima bwite',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Vugana na BBC',
        },
      ],
      copyrightText: 'BBC. BBC ntibazwa ibivuye ku zindi mbuga.',
    },
    fonts: [],
    timezone: 'Europe/London',
    navigation: [
      {
        title: "Urupapuro rw'itangiriro",
        url: '/gahuza',
      },
      {
        title: 'Amakuru',
        url: '/gahuza/amakuru',
      },
      {
        title: 'Imikino',
        url: '/gahuza/imikino',
      },
      {
        title: 'Umviriza',
        url: '/gahuza/media/audio',
      },
      {
        title: 'Video',
        url: '/gahuza/media/video',
      },
    ],
  },
};

export default service;
