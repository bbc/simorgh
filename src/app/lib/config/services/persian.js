import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { persian as brandSVG } from '@bbc/psammead-assets/svgs';
import { arabic } from '@bbc/gel-foundations/scripts';

const persian = {
  lang: 'fa',
  product: 'BBC News',
  articleAuthor: 'https://www.facebook.com/bbcpersian',
  atiAnalyticsAppName: 'news-persian',
  brandName: 'BBC News فارسی',
  serviceLocalizedName: 'فارسی',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
  defaultImageAltText: 'BBC News فارسی',
  dir: 'rtl',
  externalLinkText: ' ،لینک خارجی',
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  videoCaptionOffscreenText: ' ، عنوان ویدئو',
  audioCaptionOffscreenText: ' `توضیح صدا،` ',
  defaultCaptionOffscreenText: ' ، عنوان',
  imageCopyrightOffscreenText: ' ، منبع تصویر',
  locale: 'fa',
  service: 'persian',
  serviceName: 'Persian',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcpersian',
  twitterSite: '@bbcpersian',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: arabic,
  manifestPath: '/articles/manifest.json',
  translations: {
    error: {
      404: {
        statusCode: '۴۰۴',
        title: 'این صفحه یافت نشد',
        message:
          'متاسفانه به دلیلی این صفحه در دسترس نمی‌باشد. لطفآ این رو امتحان کنید:',
        solutions: [
          'لینک را چک کنید',
          'صفحه را ریفرش کنید',
          'با استفاده از نوار جستجوی بی بی سی برای این صفحه جستجو کنید',
        ],
        callToActionFirst: 'روش دیگر، لطفآ به ',
        callToActionLinkText: 'صفحه اصلی بی بی سی فارسی',
        callToActionLast: ' بازدید کنید',
        callToActionLinkUrl: 'https://www.bbc.com/persian',
      },
      500: {
        statusCode: '۵۰۰',
        title: 'مشکلی پیش آمده است',
        message:
          'متاسفانه به دلیلی این صفحه در دسترس نمی‌باشد. لطفآ این رو امتحان کنید:',
        solutions: ['صفحه را ریفرش کنید', 'بعدا برگردید'],
        callToActionFirst: 'روش دیگر، لطفآ به ',
        callToActionLinkText: 'صفحه اصلی بی بی سی فارسی',
        callToActionLast: ' بازدید کنید',
        callToActionLinkUrl: 'https://www.bbc.com/persian',
      },
    },
    consentBanner: {
      privacy: {
        title: 'ما سیاست‌های حفظ حریم خصوصی و کوکی‌های خود را به روز کرده‌ایم',
        description: {
          uk: {
            first:
              'ما تغییرات مهمی در سیاست‌های حفظ حریم خصوصی و کوکی‌هایمان ایجاد کرده‌ایم و می‌خواهیم شما بدانید این تغییرات برای شما و اطلاعات مربوط به شما به چه معنی است',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'ما تغییرات مهمی در سیاست‌های حفظ حریم خصوصی و کوکی‌هایمان ایجاد کرده‌ایم و می‌خواهیم شما بدانید این تغییرات برای شما و اطلاعات مربوط به شما به چه معنی است',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'تایید',
        reject: 'ببنید چه تغییراتی ایجاد شده است',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'آیا با دریافت کوکی‌های ما موافقید؟',
        description: {
          uk: {
            first: 'ما برای بهبود استفاده شما از خدمات بی‌بی‌سی از ',
            linkText: 'کوکی',
            last:
              ' استفاده می‌کنیم. اگر موافق هستید دریافت کوکی‌ها را تایید کنید',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first:
              'ما و شریکانمان برای اینکه خدمات آنلاین بهتری به شما ارائه کنیم و محتوای مورد نظرتان را به شما نشان دهیم از تکنولوژی‌هایی مانند ',
            linkText: 'کوکی‌ها',
            last:
              ' یا برداشت از داده‌های مرورگر شما استفاده می‌کنیم؛ اگر موافق هستید تایید کنید',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'بله، موافقم',
        reject: 'خیر، بازگشت به صفحه تنظیمات',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'صدا',
      video: 'ویدیو',
    },
  },
  brandSVG,
  footer: {
    externalLink: {
      href: 'https://www.bbc.com/persian/institutional/2011/04/000001_links',
      text: 'سیاست ما درباره لینک دادن به سایت های دیگر.',
    },
    links: [
      {
        href: 'https://www.bbc.com/persian/institutional-37474133',
        text: 'شرایط استفاده',
      },
      {
        href: 'https://www.bbc.com/persian/institutional-37474136',
        text: 'درباره بی بی سی',
      },
      {
        href: 'https://www.bbc.com/persian/institutional-37540067',
        text: 'سیاست حفظ حریم خصوصی',
      },
      {
        href:
          'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.co.uk/accessibility',
        text: 'Accessibility Help',
      },
      {
        href: 'https://www.bbc.co.uk/guidance',
        text: 'Parental Guidance',
      },
      {
        href: 'https://www.bbc.com/persian/institutional-37542244',
        text: 'تماس با بی بی سی',
      },
      {
        href: 'https://www.bbc.co.uk/bbcnewsletter',
        text: 'Get Personalised Newsletters',
      },
    ],
    copyrightText:
      'بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست. سیاست ما درباره لینک دادن به سایت های دیگر.',
  },
  fonts: [],
};

export default persian;
