import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: `hi-IN`,
  articleAuthor: `https://www.facebook.com/bbchindi`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-hindi',
  brandName: 'BBC News हिंदी',
  product: 'BBC News हिंदी',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hindi.png',
  defaultImageAltText: 'BBC News हिंदी',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `hi-IN`,
  datetimeLocale: `hi-IN`.toLowerCase(),
  service: 'hindi',
  serviceName: 'News हिंदी',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbchindi',
  twitterSite: '@bbchindi',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404 - पन्ना नहीं मिला',
        message:
          'वेब एड्रेस गलत टाइप किए जाने के कारण ऐसा हो सकता है. कृपया वेबस एड्रेस और उसकी वर्तनी को जांचिए.',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'समाचार',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/hindi',
      },
      500: {
        statusCode: '500',
        title: '500 - Error',
        message: 'त्रुटि पाई गई. कृपया पन्ने को रिफ्रेश कीजिए.',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'समाचार',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/hindi',
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
      audio: 'आडियो',
      photogallery: 'तस्वीरें',
      video: 'वीडियो',
      bbc_hindi_radio: {
        title: 'बीबीसी हिंदी',
        subtitle:
          'दुनिया और भारत की ख़बरें, विश्लेषण और फ़ीचर. हिंदी में संवाद के सूत्रधार',
      },
      bbc_hindi_tv: {
        title: 'दुनिया',
        subtitle:
          'बीबीसी दुनिया में देखिए ताज़ा अंतरराष्ट्रीय और क्षेत्रीय ख़बरें, उनका विश्लेषण और सोशल मीडिया की हलचल. साथ ही होंगी कई रोचक ख़बरें भी.',
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
      'बीबीसी। बीबीसी बाहरी इंटरनेट साइट की सामग्री के लिए ज़िम्मेदार नहीं है',
  },
  fonts: [],
};

export default service;
