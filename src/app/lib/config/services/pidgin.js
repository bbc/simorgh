import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { pidgin as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import '@bbc/psammead-locales/moment/pcm';

const pidgin = {
  product: 'BBC News',
  atiAnalyticsAppName: 'news-pidgin',
  brandName: 'BBC News Pidgin',
  locale: 'pcm',
  datetimeLocale: 'pcm',
  service: 'pidgin',
  serviceName: 'Pidgin',
  serviceLocalizedName: 'Pidgin',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
  defaultImageAltText: 'BBC News Pidgin',
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
    home: 'Home',
    currentPage: 'Current page',
    skipLinkText: 'Waka go wetin de inside',
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
        title: 'We don update our Privacy and Cookies Policy',
        description: {
          uk: {
            first:
              'We don make some important changes to our Privacy and Cookies Policy and we wan make you know wetin dis one mean for you and your personal infomation.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'We don make some important changes to our Privacy and Cookies Policy and we wan make you know wetin dis one mean for you and your personal infomation.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'OK',
        reject: 'Find out wetin don change',
        rejectUrl: '/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Let us know say you agree to cookies',
        description: {
          uk: {
            first: 'We use ',
            linkText: 'cookies',
            last:
              ' to give you di best online experience. Abeg let us know if you gree to all od dif cookies dem.',
            linkUrl:
              '/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'We and our partners use technologies, like ',
            linkText: 'cookies',
            last:
              ', and collect browsing information to give you di best online experience and to make wetin dey inside personal and wetin pipo dey advertise appear for you. Abeg let us know if you agree.',
            linkUrl:
              '/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Yes, I agree',
        reject: 'No, cari me go settings',
        rejectUrl:
          '/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Audio',
      video: 'Video',
    },
  },
  navigation: [
    {
      title: 'Home',
      url: '/pidgin',
    },
    {
      title: 'Nigeria',
      url: '/pidgin/topics/3d5d5e30-dd50-4041-96d5-c970b20005b9',
    },
    {
      title: 'Africa',
      url: '/pidgin/topics/d2c2ba68-f9ad-4185-a6d1-7f6437256735',
    },
    {
      title: 'World',
      url: '/pidgin/world',
    },
    {
      title: 'Video',
      url: '/pidgin/media/video',
    },
    {
      title: 'Audio',
      url: '/pidgin/media/audio',
    },
    {
      title: 'Sport',
      url: '/pidgin/sport',
    },
    {
      title: 'Entertainment',
      url: '/pidgin/topics/1c3b60a9-14eb-484b-a750-9f5b1aeaac31',
    },
    {
      title: 'Most popular',
      url: '/pidgin/popular/read',
    },
  ],
  footer: {
    externalLink: {
      href: 'http://www.bbc.co.uk/help/web/links/',
      text: 'De way wey we de take go external link.',
    },
    links: [
      {
        href: '/pidgin/institutional-48528766',
        text: 'Why you fit trust BBC News',
      },
      {
        href: '/usingthebbc/terms/',
        text: 'How dem dey take use am',
      },
      {
        href: '/usingthebbc/privacy/',
        text: 'Privacy Policy',
      },
      {
        href: '/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: '/pidgin/institutional-42188215',
        text: 'Call BBC',
      },
    ],
    copyrightText: 'BBC. De external site no concern BBC.',
  },
};

export default pidgin;
