import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { persian as brandSVG } from '@bbc/psammead-assets/svgs';
import { arabic } from '@bbc/gel-foundations/scripts';

const persian = {
  articleAuthor: 'https://www.facebook.com/bbcpersian',
  brandName: 'BBC News فارسی',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
  defaultImageAltText: 'BBC News فارسی',
  dir: 'rtl',
  externalLinkText: ' ،لینک خارجی',
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  videoCaptionOffscreenText: ' ، عنوان ویدئو',
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
  },
  brandSVG,
  fonts: [],
};

export default persian;
