import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: `ta-IN`,
  articleAuthor: `https://www.facebook.com/bbctamil`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-tamil',
  brandName: 'BBC News தமிழ்',
  product: 'BBC News தமிழ்',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/tamil.png',
  defaultImageAltText: 'BBC News தமிழ்',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `ta-IN`,
  datetimeLocale: `ta-IN`.toLowerCase(),
  service: 'tamil',
  serviceName: 'News தமிழ்',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbctamil',
  twitterSite: '@bbctamil',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404-பக்கம் கிடைக்கப்பெறவில்லை',
        message:
          'இணைய தள விலாசம் தவறாக தட்டச்சு செய்யப்பட்டதால் இது நேர்ந்திருக்கலாம். விலாசத்தையும் , எழுத்துக்களையும் சரிபார்க்கவும்.',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'பிபிசி முகப்புப் பக்கம்',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/tamil',
      },
      500: {
        statusCode: '500',
        title: '500-பிழை',
        message: 'இது ஒரு பிழை, மீண்டும் பக்கத்தைப் புதுப்பிக்கவும்',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'பிபிசி முகப்புப் பக்கம்',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/tamil',
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
      audio: 'ஒலி',
      photogallery: 'படத் தொகுப்பு',
      video: 'வீடியோ',
      bbc_tamil_radio: {
        title: 'பிபிசி தமிழோசை',
        subtitle:
          'சர்வதேச, இந்திய, இலங்கை செய்திகள் மற்றும் நடப்புத் தகவல்களை வழங்கும் ஓர் நிகழ்ச்சி. அறிவியல், விளையாட்டு, கலை, கலாச்சாரம் மற்றும் பொழுதுபோக்கு தொடர்பான செய்திகளும் இதில் இடம்பெறும். சிற்றலை வானொலியிலும் பிபிசிதமிழ்.காம் இணையதளத்திலும் இதைக் கேட்கலாம்.',
      },
      bbc_tamil_tv: {
        title: 'கிளிக்',
        subtitle:
          'சமீபத்திய சர்வதேச மற்றும் இந்திய கண்டுபிடிப்புகள் குறித்த தொழில்நுட்ப நிகழ்ச்சி',
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
      'பிபிசி. வெளியார் இணைய தளங்களில் உள்ள விஷயங்களுக்கு பிபிசி பொறுப்பாகாது',
  },
  fonts: [],
};

export default service;
