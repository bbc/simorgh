import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { persian as brandSVG } from '@bbc/psammead-assets/svgs';
import { arabic } from '@bbc/gel-foundations/scripts';

const persian = {
  articleAuthor: 'https://www.facebook.com/bbcpersian',
  brandName: 'BBC News فارسی',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
  defaultImageAltText: 'BBC News فارسی',
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
        href: 'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
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
    copyrightText: 'BBC. بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست. سیاست ما درباره لینک دادن به سایت های دیگر.',
  },
};

export default persian;
