import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { arabic } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: 'ar',
  product: 'BBC News',
  articleAuthor: 'https://www.facebook.com/bbcnews',
  articleTimestampPrefix: 'جدّد في',
  atiAnalyticsAppName: 'news-arabic',
  brandName: 'BBC News عربي',
  serviceLocalizedName: 'عربي',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
  defaultImageAltText: 'BBC News عربي',
  dir: 'rtl',
  externalLinkText: '، خارجي',
  imageCaptionOffscreenText: '،التعليق على الصورة',
  videoCaptionOffscreenText: '،التعليق على الفيديو',
  audioCaptionOffscreenText: '،التعليق على التسجيل السماعي',
  defaultCaptionOffscreenText: '،التعليق',
  imageCopyrightOffscreenText: '،مصدر الصورة',
  locale: 'ar',
  datetimeLocale: 'ar',
  service: 'arabic',
  serviceName: 'Arabic',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCArabic',
  twitterSite: '@BBCArabic',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: arabic,
  manifestPath: '/articles/manifest.json',
  swPath: '/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: 'لم يتسن العثور على الصفحة',
        message:
          'آسفون، لم نتمكن من العثور على الصفحة التي تطلبها. الرجاء حاول:',
        solutions: [
          'أن تتأكد من عنوان الصفحة (url)',
          'أن تنقر زر التجديد (refresh) في برنامج التصفح الذي تستخدمه',
          'أن تبحث عن هذه الصفحة باستخدام خانة البحث الخاصة ببي بي سي',
        ],
        callToActionFirst: 'كبديل، يرجى زيارة ',
        callToActionLinkText: 'الصفحة الرئيسية عربي لأخبار بي بي سي',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/arabic',
      },
      500: {
        statusCode: '500',
        title: 'خلل داخلي في الخادم',
        message:
          'آسفون، لم نتمكن من العثور على الصفحة التي تطلبها. الرجاء حاول:',
        solutions: [
          'أن تنقر زر التجديد (refresh) في برنامج التصفح الذي تستخدمه',
          'أن تكرر الطلب بعد فترة',
        ],
        callToActionFirst: 'كبديل، يرجى زيارة ',
        callToActionLinkText: 'الصفحة الرئيسية عربي لأخبار بي بي سي',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/arabic',
      },
    },
    consentBanner: {
      privacy: {
        title:
          'لقد حدّثنا تعليماتنا المتعلقة بالخصوصية وبالشروط الخاصة بملفات الإرتباط (الكوكيز)',
        description: {
          uk: {
            first:
              'لقد أدخلنا تغييرات مهمة لتعليماتنا المتعلقة بالخصوصية وللشروط الخاصة بملفات الإرتباط (الكوكيز)، ويهمنا أن تكونوا ملمين بما قد تعني هذه التغييرات بالنسبة لكم ولبياناتكم',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'لقد أدخلنا تغييرات مهمة لتعليماتنا المتعلقة بالخصوصية وللشروط الخاصة بملفات الإرتباط (الكوكيز)، ويهمنا أن تكونوا ملمين بما قد تعني هذه التغييرات بالنسبة لكم ولبياناتكم',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'موافق',
        reject: 'إطلع على التغييرات',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'أخبرنا عما إذا كنت توافق على تحميل الكوكيز',
        description: {
          uk: {
            first: 'نستخدم ',
            linkText: 'ملفات ارتباط (كوكيز)',
            last:
              '  لمنحك أفضل خدمة رقمية. الرجاء أحطنا علما إذا كنت توافق على تحميل كل هذه الكوكيز.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'نستخدم نحن وشركاؤنا تقنيات مثل ',
            linkText: 'الكوكيز',
            last:
              '، كما نقوم بجمع معلومات خاصة بالتصفح من أجل توفير أفضل خدمة رقمية ولاضفاء مسحة شخصية للمحتوى والاعلانات الموجهة إليك. الرجاء إعلامنا إذا كنت موافقا على ذلك.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'نعم، موافق',
        reject: 'كلا، أعدني إلى الإعدادات',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'تسجيل صوتي',
      photogallery: 'بالصور',
      video: 'فيديو',
      bbc_arabic_radio: {
        title: 'إذاعة بي بي سي العربية',
        subtitle:
          'خدمة إخبارية على مدار الساعة و برامج حوارية وتفاعلية تناقش قضايا المنطقة والعالم وباقة من البرامج المنوعة من إذاعة بي بي سي',
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
        text: 'لماذا يمكنك الإعتماد على أخبار بي بي سي',
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
    copyrightText: 'بي بي سي. بي بي سي غير مسؤولة عن محتوى الروابط الخارجية',
  },
  fonts: [],
};

export default service;
