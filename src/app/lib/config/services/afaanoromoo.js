import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: `om-ET`,
  articleAuthor: `https://www.facebook.com/bbcnewsafaanoromoo`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-afaanoromoo',
  brandName: 'BBC News Afaan Oromoo',
  product: 'BBC News Afaan Oromoo',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/afaanoromoo.png',
  defaultImageAltText: 'BBC News Afaan Oromoo',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `om-ET`,
  datetimeLocale: `om-ET`.toLowerCase(),
  service: 'afaanoromoo',
  serviceName: 'News Afaan Oromoo',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCAfrica',
  twitterSite: '@BBCAfrica',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404 - Fuulli kun hin argamne',
        message:
          'Tarii kun kan uumame sababa maqaa marsariitii doggoggorteefi. Maaloo maqichaa fi qubee sirreeffadhu',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC Afaan Oromoo Fuula duraa',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
      },
      500: {
        statusCode: '500',
        title: '500 - Dogogorawwaan',
        message: 'Dogoggorri uumameera. Maaloo fuulicha haaressi',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC Afaan Oromoo Fuula duraa',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
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
      audio: 'Sagalee',
      photogallery: 'Kuusaa Fakkii',
      video: 'Viidiyoo',
      bbc_oromo_radio: {
        title: 'Dhaggeeffadhaa',
        subtitle: 'Sagantaawwan keenya',
      },
      bbc_afaanoromoo_radio: {
        title: 'Dhaggeeffadhaa',
        subtitle: 'Sagantaawwan keenya',
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
    copyrightText: "BBC. Qabiyyee iddoola alaatiif BBC'n itti hin gaafatamu",
  },
  fonts: [],
};

export default service;
