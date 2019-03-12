import { C_POSTBOX } from '@bbc/psammead-styles/colours';

const persian = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  brandName: 'BBC News فارسی',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
  defaultImageAltText: 'BBC News فارسی',
  externalLinkText: ' ،لینک خارجی',
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  imageCopyrightOffscreenText: ' ، منبع تصویر',
  locale: 'fa',
  service: 'persian',
  serviceName: 'Persian',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcpersian',
  twitterSite: '@bbcpersian',
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
          first:
            "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
          linkText: '',
          last: '',
          linkUrl: '',
        },
        accept: 'OK',
        reject: "Find out what's changed",
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Let us know you agree to cookies',
        description: {
          first: 'We use ',
          linkText: 'cookies',
          last:
            ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
          linkUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
        },
        accept: 'Yes, I agree',
        reject: 'No, take me to settings',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
  },
};

export default persian;
