import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: `bn-BD`,
  articleAuthor: `https://www.facebook.com/BBCBengaliService`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-bengali',
  brandName: 'BBC News বাংলা',
  product: 'BBC News বাংলা',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/bengali.png',
  defaultImageAltText: 'BBC News বাংলা',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `bn-BD`,
  datetimeLocale: `bn-BD`.toLowerCase(),
  service: 'bengali',
  serviceName: 'News বাংলা',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcbangla',
  twitterSite: '@bbcbangla',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '৪০৪ - পেজ পাওয়া যায়নি',
        message:
          'হয়তো আপনি ওয়েব ঠিকানা টাইপ করতে ভুল করেছেন। অনুগ্রহ করে ঠিকানা এবং বানান আরেকবার দেখুন',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'বিবিসি হোম পেজ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/bengali',
      },
      500: {
        statusCode: '500',
        title: '৫০০ - এরর',
        message: 'কোন ভুল হয়েছে। অনুগ্রহ করে পেজ রিফ্রেশ করুন',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'বিবিসি হোম পেজ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/bengali',
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
      audio: 'অডিও',
      photogallery: 'ইমেজ গ্যালারি',
      video: 'ভিডিও',
      bbc_bangla_radio: {
        title: 'বিবিসি বাংলা',
        subtitle:
          'বাংলাদেশ, তার প্রতিবেশী এবং গোটা বিশ্বের সংবাদ পরিবেশন করে। সংবাদদাতার প্রতিবেদন ছাড়াও আছে সাক্ষাৎকার, সংবাদপত্র পর্যালোচনা এবং সরাসরি ফোন-ইন।',
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
    copyrightText: 'বিবিসি। ইন্টারনেটে অন্যান্য সাইটের জন্য বিবিসি দায়বদ্ধ নয়',
  },
  fonts: [],
};

export default service;
