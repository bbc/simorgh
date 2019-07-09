import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { igbo as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from 'drew-testing-123/esm/scripts';
import '@bbc/psammead-locales/moment/ig';

const igbo = {
  product: 'BBC News',
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-igbo',
  brandName: 'BBC News Ìgbò',
  locale: 'ig',
  datetimeLocale: 'ig',
  service: 'igbo',
  serviceName: 'Igbo',
  serviceLocalizedName: 'Ìgbò',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
  defaultImageAltText: 'BBC News Ìgbò',
  dir: 'ltr',
  brandSVG,
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  fonts: [],
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCNews', // to be updated
  twitterSite: '@BBCNews', // to be updated
  translations: {
    home: 'Akụkọ',
    currentPage: 'Peegi ị nọ ugbua',
    skipLinkText: 'Wụga n’ọdịnaya',
    error: {
      404: {
        statusCode: '404',
        title: 'Page cannot be found',
        message:
          "Sorry, we're unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC News homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/news',
      },
      500: {
        statusCode: '500',
        title: 'Internal server error',
        message:
          "Sorry, we're currently unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC News homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/news',
      },
    },
    consentBanner: {
      privacy: {
        title: 'Anyị ewelitela ihe nzuzo anyị nakwa iwu dị na ya.',
        description: {
          uk: {
            first:
              'Anyị agbanwela ụfọdụ ihe dị mkpa nye ihe nzuzo anyị na iwu dị na ya nakwa anyị chọrọ ka ị mata ihe nke a pụtara nye gị na data gị.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'Anyị agbanwela ụfọdụ ihe dị mkpa nye ihe nzuzo anyị na iwu dị na ya nakwa anyị chọrọ ka ị mata ihe nke a pụtara nye gị na data gị.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'Ọ dị mma',
        reject: 'Chọpụta ihe gbanwere',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Ka anyị mara ma i kwernyere na iwu ndị a',
        description: {
          uk: {
            first: 'Anyị na-eji ',
            linkText: 'cookies',
            last:
              ' enye gị nke kacha mkpa na ịntanetị. Biko me ka anyị mata ma i kwenyere.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Anyị na ndị anyị na ha na-emekọrịta na-eji teknụzụdịka ',
            linkText: 'cookies',
            last:
              ', were na-amịị ozi banyere gị iji were na-enye gị ụdị ihe ị chọrọ dịka o si gbasaa ihe akụkọ anyị na ozi azụmahịa anyị na-egosi gị. Biko me ka anyị mata ma ọ dị gị mma.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Eeh, ekwere m',
        reject: "Mba, duga m n'ebe mwube",
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Ọdịyo',
      video: 'Vidio',
    },
  },
  navigation: [
    {
      title: 'Akụkọ',
      url: '/igbo',
    },
    {
      title: 'Egwuregwu',
      url: '/igbo/egwuregwu',
    },
    {
      title: 'Ihe nkiri',
      url: '/igbo/media/video',
    },
    {
      title: 'Nke ka ewuewu',
      url: '/igbo/popular/read',
    },
  ],
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Usoro anyị maka njikọ dị na mpụga.',
    },
    links: [
      {
        href: 'https://www.bbc.com/igbo/institutional-48529074',
        text: 'Ihe mere ị ga-eji nwee ntụkwasiobi na BBC News',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/terms',
        text: 'Usoro Ojiji',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
        text: 'Iwu Nzuzo',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
        text: 'Kuki',
      },
      {
        href: 'https://www.bbc.com/igbo/institutional-43090448',
        text: 'Kpọtụrụ BBC',
      },
    ],
    copyrightText:
      'BBC. BBC anaghị ahụta maka ọdịnaya nke saịtị ndị dị na mpụga.',
  },
};

export default igbo;
