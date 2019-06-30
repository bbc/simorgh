import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { igbo as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import '@bbc/psammead-locales/moment/ig';

const igbo = {
  product: 'BBC News',
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
  noBylinesPolicy: '/news/help-41670342#authorexpertise',
  publishingPrinciples: '/news/help-41670342',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCNews', // to be updated
  twitterSite: '@BBCNews', // to be updated
  translations: {
    home: 'Akụkọ',
    currentPage: 'Current page',
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
        callToActionLinkUrl: '/news',
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
        callToActionLinkUrl: '/news',
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
        rejectUrl: '/usingthebbc/your-data-matters',
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
              '/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Anyị na ndị anyị na ha na-emekọrịta na-eji teknụzụdịka ',
            linkText: 'cookies',
            last:
              ', were na-amịị ozi banyere gị iji were na-enye gị ụdị ihe ị chọrọ dịka o si gbasaa ihe akụkọ anyị na ozi azụmahịa anyị na-egosi gị. Biko me ka anyị mata ma ọ dị gị mma.',
            linkUrl:
              '/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Eeh, ekwere m',
        reject: "Mba, duga m n'ebe mwube",
        rejectUrl:
          '/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
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
      href: '/help/web/links/',
      text: 'Usoro anyị maka njikọ dị na mpụga.',
    },
    links: [
      {
        href: '/igbo/institutional-48529074',
        text: 'Ihe mere ị ga-eji nwee ntụkwasiobi na BBC News',
      },
      {
        href: '/usingthebbc/terms',
        text: 'Usoro Ojiji',
      },
      {
        href: '/usingthebbc/privacy/',
        text: 'Iwu Nzuzo',
      },
      {
        href: '/usingthebbc/cookies/',
        text: 'Kuki',
      },
      {
        href: '/igbo/institutional-43090448',
        text: 'Kpọtụrụ BBC',
      },
    ],
    copyrightText:
      'BBC. BBC anaghị ahụta maka ọdịnaya nke saịtị ndị dị na mpụga.',
  },
};

export default igbo;
