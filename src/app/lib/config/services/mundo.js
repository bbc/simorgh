import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import { mundo as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/es';

const service = {
  default: {
    lang: `es`,
    articleAuthor: `https://www.facebook.com/bbcmundo`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-mundo',
    atiAnalyticsProducerId: '62',
    brandName: 'BBC News Mundo',
    product: 'BBC News Mundo',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
    defaultImageAltText: 'BBC News Mundo',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `es-005`,
    datetimeLocale: `es-005`,
    service: 'mundo',
    serviceName: 'News Mundo',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcmundo',
    twitterSite: '@bbcmundo',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latinDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Noticias',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'Noticias',
      currentPage: 'Current page',
      skipLinkText: 'Ir al contenido',
      relatedContent: 'Related content',
      error: {
        404: {
          statusCode: '404',
          title: '404 - Página no encontrada',
          message:
            'Es posible que haya escrito la dirección en forma incorrecta. Por favor compruebe que la dirección es correcta.',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC Mundo Inicio',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/mundo',
        },
        500: {
          statusCode: '500',
          title: '500 - Error',
          message: 'Ha ocurrido un error, por favor actualice la página',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC Mundo Inicio',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/mundo',
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
        audio: 'Audio',
        photogallery: 'Fotos',
        video: 'Video',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Read about our approach to external linking.',
      },
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
      copyrightText:
        'BBC. El contenido de las páginas externas no es responsabilidad de la BBC.',
    },
    fonts: [],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Noticias',
        url: '/mundo',
      },
      {
        title: 'Hay Festival',
        url: '/mundo/noticias-36795069',
      },
      {
        title: 'América Latina',
        url: '/mundo/america_latina',
      },
      {
        title: 'Internacional',
        url: '/mundo/internacional',
      },
      {
        title: 'Economía',
        url: '/mundo/topics/ca170ae3-99c1-48db-9b67-2866f85e7342',
      },
      {
        title: 'Tecnología',
        url: '/mundo/topics/31684f19-84d6-41f6-b033-7ae08098572a',
      },
      {
        title: 'Ciencia',
        url: '/mundo/topics/0f469e6a-d4a6-46f2-b727-2bd039cb6b53',
      },
      {
        title: 'Salud',
        url: '/mundo/topics/c4794229-7f87-43ce-ac0a-6cfcd6d3cef2',
      },
      {
        title: 'Cultura',
        url: '/mundo/topics/6a73afa3-ea6b-45c1-80bb-49060b99f864',
      },
      {
        title: 'Deportes',
        url: '/mundo/topics/4063f80f-cccc-44c8-9449-5ca44e4c8592',
      },
      {
        title: 'Video',
        url: '/mundo/media/video',
      },
      {
        title: 'Centroamérica Cuenta',
        url: '/mundo/noticias-43826245',
      },
    ],
  },
};

export default service;
