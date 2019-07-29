import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { arabic } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: 'ur',
  product: 'BBC News',
  articleAuthor: 'https://www.facebook.com/bbcnews',
  articleTimestampPrefix: 'اپ ڈیٹ کی گئی',
  atiAnalyticsAppName: 'news-urdu',
  brandName: 'BBC News اردو',
  serviceLocalizedName: 'اردو',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/urdu.png',
  defaultImageAltText: 'BBC News اردو',
  dir: 'rtl',
  externalLinkText: '، بیرونی مواد',
  imageCaptionOffscreenText: '،تصویر کا کیپشن',
  videoCaptionOffscreenText: '،ویڈیو کیپشن',
  audioCaptionOffscreenText: '،آڈیو کیپشن',
  defaultCaptionOffscreenText: '،کیپشن',
  imageCopyrightOffscreenText: '،تصویر کا ذریعہ',
  locale: 'ur',
  datetimeLocale: 'ur',
  service: 'urdu',
  serviceName: 'Urdu',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcurdu',
  twitterSite: '@bbcurdu',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: arabic,
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: 'صفحہ دستیاب نہیں',
        message:
          'ہم معذرت خواہ ہیں کہ آپ جو صفحہ تلاش کر رہے ہیں وہ دستیاب نہیں۔ یہ کوشش کر کے دیکھیں:',
        solutions: [
          'یو آر ایل دوبارہ چیک کریں',
          'اپنے براؤزر کو ریفریش کریں',
          'بی بی سی کی سرچ بار کی مدد سے اس صفحے کی تلاش جاری',
        ],
        callToActionFirst: 'متبادل کے طور پر بی بی سی نیوز ',
        callToActionLinkText: 'کے ہوم پیچ پر جائیں اردو.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/urdu',
      },
      500: {
        statusCode: '500',
        title: 'اندرونی سرور کی خرابی',
        message:
          'ہم معذرت خواہ ہیں کہ آپ جو صفحہ تلاش کر رہے ہیں وہ دستیاب نہیں۔ یہ کوشش کر کے دیکھیں:',
        solutions: ['اپنے براؤزر کو ریفریش کریں', 'کچھ دیر بعد کوشش کیجیے'],
        callToActionFirst: 'متبادل کے طور پر بی بی سی نیوز ',
        callToActionLinkText: 'کے ہوم پیچ پر جائیں اردو.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/urdu',
      },
    },
    consentBanner: {
      privacy: {
        title: 'ہم نے اپنی پرائیویسی اور کوکیز پالیسی اپ ڈیٹ کر دی ہے',
        description: {
          uk: {
            first:
              '.ہم نے اپنی پرائیویسی اور کوکیز پالیسیوں میں کچھ اہم تبدیلیاں کی ہیں اور ہم چاہتے ہیں کہ ان کا آپ اور آپ کے ڈیٹا کے لیے کیا مطلب ہے',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              '.ہم نے اپنی پرائیویسی اور کوکیز پالیسیوں میں کچھ اہم تبدیلیاں کی ہیں اور ہم چاہتے ہیں کہ ان کا آپ اور آپ کے ڈیٹا کے لیے کیا مطلب ہے',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'اوکے',
        reject: 'جانیے کہ تبدیلیاں کیا ہیں',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'بتائیے کہ آپ کوکیز کے بارے میں متفق ہیں',
        description: {
          uk: {
            first: 'ہم آپ کو بہترین آن لائن تجربہ دینے کے لیے ',
            linkText: 'کوکیز',
            last:
              ' استعمال کرتے ہیں۔ برائے مہربانی ہمیں بتائیں کہ آپ ان تمام کوکیز کے استعمال سے متفق ہیں',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'ہم اور ہمارے پارٹنر ٹیکنالوجی جیسے کہ ',
            linkText: 'کوکیز',
            last:
              ' استعمال کرتے ہوئے براؤزنگ ڈیٹا جمع کرتے ہیں تاکہ آپ کو بہترین آن لائن تجربہ دے سکیں اور مواد اور اشتہارات کو آپ کے لیے مخصوص بنا سکیں۔ ہمیں بتائیے کہ آپ کو اس پر کوئی اعتراض تو نہیں۔',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'میں متفق ہوں',
        reject: 'نہیں، مجھے سیٹنگز میں لے جائیں',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'آڈیو',
      photogallery: 'تصاویری گیلری',
      video: 'ویڈیو',
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
        text: 'جانیے کہ آپ بی بی سی نیوز پر کیوں اعتماد کر سکتے ہیں',
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
      'بی بی سی. بی بی سی بیرونی ویب سائٹس کے مواد کا ذمہ دار نہیں',
  },
  fonts: [],
};

export default service;
