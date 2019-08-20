import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { nepali } from '@bbc/gel-foundations/scripts';
import { punjabi as brandSVG } from '@bbc/psammead-assets/svgs';
import 'moment/locale/pa-in';
import '@bbc/moment-timezone-include/tz/Asia/Kolkata';

const service = {
  lang: `pa-IN`,
  articleAuthor: `https://www.facebook.com/bbcnewspunjabi`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-punjabi',
  atiAnalyticsProducerId: '73',
  brandName: 'BBC News ਖ਼ਬਰਾਂ',
  product: 'BBC News ਖ਼ਬਰਾਂ',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/punjabi.png',
  defaultImageAltText: 'BBC News ਖ਼ਬਰਾਂ',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `pa-IN`,
  datetimeLocale: `pa-IN`.toLowerCase(),
  service: 'punjabi',
  serviceName: 'News ਖ਼ਬਰ',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcnewspunjabi',
  twitterSite: '@bbcnewspunjabi',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: nepali,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  translations: {
    home: 'ਖ਼ਬਰਾਂ',
    currentPage: 'Current page',
    skipLinkText: `ਸਮੱਗਰੀ 'ਤੇ ਜਾਓ`,
    error: {
      404: {
        statusCode: '404',
        title: '404 - ਪੰਨਾ ਨਹੀਂ ਲੱਭਿਆ',
        message:
          'ਇਹ ਇਸ ਲਈ ਹੋ ਸਕਦਾ ਹੈ ਕਿਉਂਕਿ ਤੁਸੀਂ ਵੈੱਬ ਪਤੇ ਵਿੱਚ ਗਲਤ ਤਰੀਕੇ ਨਾਲ ਟਾਈਪ ਕੀਤਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਪਤਾ ਅਤੇ ਸ਼ਬਦ-ਜੋੜ ਦੀ ਜਾਂਚ ਕਰੋ।',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC ਖ਼ਬਰਾਂ ਮੁੱਖ ਪੰਨਾ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/punjabi',
      },
      500: {
        statusCode: '500',
        title: '500 - ਤਰੁੱਟੀ',
        message: 'ਇੱਕ ਤਰੁੱਟੀ ਹੋਈ ਸੀ। ਕਿਰਪਾ ਕਰਕੇ ਪੰਨੇ ਨੂੰ ਰੀਫਰੈਸ਼ ਕਰੋ।',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC ਖ਼ਬਰਾਂ ਮੁੱਖ ਪੰਨਾ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/punjabi',
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
      audio: 'ਔਡੀਓ',
      photogallery: 'ਚਿੱਤਰ ਗੈਲਰੀ',
      video: 'ਵੀਡੀਓ',
    },
  },
  brandSVG,
  navigation: [
    {
      title: 'ਖ਼ਬਰਾਂ',
      url: '/punjabi',
    },
    {
      title: 'ਵੀਡੀਓ',
      url: '/punjabi/media/video',
    },
    {
      title: 'ਪਾਠਕਾਂ ਦੀ ਪਸੰਦ',
      url: '/punjabi/popular/read',
    },
    {
      title: 'ਭਾਰਤ',
      url: '/punjabi/india',
    },
    {
      title: 'ਕੌਮਾਂਤਰੀ',
      url: '/punjabi/international',
    },
  ],
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
      'BBC. BBC ਬਾਹਰੀ ਇੰਟਰਨੈੱਟ ਸਾਈਟਾਂ ਦੀ ਸਮੱਗਰੀ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ',
  },
  fonts: [],
  timezone: 'Asia/Kolkata',
};

export default service;
