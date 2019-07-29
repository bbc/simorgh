import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: `gu-IN`,
  articleAuthor: `https://www.facebook.com/bbcnewsgujarati`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-gujarati',
  brandName: 'BBC News ગુજરાતી',
  product: 'BBC News ગુજરાતી',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/gujarati.png',
  defaultImageAltText: 'BBC News ગુજરાતી',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `gu-IN`,
  datetimeLocale: `gu-IN`.toLowerCase(),
  service: 'gujarati',
  serviceName: 'News ગુજરાતી',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcnewsgujarati',
  twitterSite: '@bbcnewsgujarati',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404 - Page not found',
        message:
          'વેબએડ્રેસ લખવામાં ભૂલ હોવાથી આમ થયું છે. કૃપા કરી વેબએડ્રેસ અને સ્પેલિંગ ચકાસો',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC સમાચાર હોમ પેજ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/gujarati',
      },
      500: {
        statusCode: '500',
        title: '500 - Error',
        message: 'Page error, પેજ રિફ્રેશ કરો',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC સમાચાર હોમ પેજ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/gujarati',
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
      audio: 'ઑડિયો',
      photogallery: 'છબી ગૅલેરી',
      video: 'વીડિયો',
      bbc_gujarati_tv: {
        title: 'સમાચાર',
        subtitle:
          'આંતરરાષ્ટ્રીય, પ્રાદેશિક ખબર અને વિશ્લેષણ માટે જુઓ બીબીસી ગુજરાતી સમાચાર.',
      },
    },
  },
  brandSVG,
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
        href: 'https://www.bbc.co.uk/aboutthebbc/',
        text: 'About the BBC',
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
        href: 'https://www.bbc.com/accessibility/',
        text: 'Accessibility Help',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'Contact the BBC',
      },
    ],
    copyrightText: 'BBC. એક્સટર્નલ વેબસાઇટ્સનાં કન્ટેન્ટ માટે BBC જવાબદાર નથી',
  },
  fonts: [],
};

export default service;
