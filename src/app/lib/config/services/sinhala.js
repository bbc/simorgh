import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: `si-LK`,
  articleAuthor: `https://www.facebook.com/BBCSinhala`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-sinhala',
  brandName: 'BBC News සිංහල',
  product: 'BBC News සිංහල',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/sinhala.png',
  defaultImageAltText: 'BBC News සිංහල',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `si-LK`,
  datetimeLocale: `si-LK`.toLowerCase(),
  service: 'sinhala',
  serviceName: 'News සිංහල',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcsinhala',
  twitterSite: '@bbcsinhala',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404 - පිටුව සොයා ගත නොහැක',
        message:
          'ඔබ වෙබ් අඩවියේ නම වැරදියට සටහන් කළා විය හැකිය. කරුණාකර වෙබ් අඩවියේ නම යලිත් වරක් විමසන්න.',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'බීබීසී සිංහල මුල් පිටුව',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/sinhala',
      },
      500: {
        statusCode: '500',
        title: '500 - වරදක්',
        message: 'කිසියම් වරදක් සිදු වී තිබේ. කරුණාකර පිටුව යාවත්කාලීන කරන්න.',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'බීබීසී සිංහල මුල් පිටුව',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/sinhala',
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
      audio: 'හඬපට',
      photogallery: 'සේයා රූ ගැලරිය',
      video: 'වීඩියෝ',
      bbc_sinhala_tv: {
        title: 'බීබීසී සිංහල සංදේශය',
        subtitle:
          'බීබීසී සිංහල ඔස්සේ ශ්‍රී ලාංකීය, දකුණු ආසියාතික සහ ජාත්‍යන්තර පුවත්, විශ්ලේෂණ සහ ක්‍රීඩා පුවත්',
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
    copyrightText:
      'බීබීසී. වෙනත් අන්තර්ජාල අඩවිවල අන්තර්ගතය පිළිබඳව බීබීසීය වගකීමෙන් නොබැඳේ',
  },
  fonts: [],
};

export default service;
