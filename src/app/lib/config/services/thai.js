import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { thai } from '@bbc/gel-foundations/scripts';
import { thai as brandSVG } from '@bbc/psammead-assets/svgs';
import 'moment/locale/th';
import '@bbc/moment-timezone-include/tz/Asia/Bangkok';

const service = {
  lang: `th-TH`,
  articleAuthor: `https://www.facebook.com/BBCThai`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-thai',
  atiAnalyticsProducerId: '90',
  brandName: 'BBC News บีบีซีไทย',
  product: 'BBC News บีบีซีไทย',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/thai.png',
  defaultImageAltText: 'BBC News บีบีซีไทย',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `th-TH`,
  datetimeLocale: 'th',
  service: 'thai',
  serviceName: 'News ไทย',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbc_thailand',
  twitterSite: '@bbc_thailand',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: thai,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  translations: {
    currentPage: 'หน้าปัจจุบัน',
    skipLinkText: 'ข้ามไปยังเนื้อหา',
    error: {
      404: {
        statusCode: '404',
        title: '404 - ไม่พบหน้าเว็บ',
        message: 'กรุุณาตรวจสอบ URL และตัวสะกด อาจมีการพิมพ์ไม่ถูกต้อง',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'หน้าหลัก บีบีซีนิวส์',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/thai',
      },
      500: {
        statusCode: '500',
        title: '500 - เกิดความผิดพลาด',
        message: 'เกิดความผิดพลาด กรุณารีเฟรชหน้าเว็บใหม่',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'หน้าหลัก บีบีซีนิวส์',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/thai',
      },
    },
    consentBanner: {
      privacy: {
        title: 'เราได้ปรับปรุงนโยบายเกี่ยวกับความเป็นส่วนตัวและคุกกีส์แล้ว',
        description: {
          uk: {
            first:
              'เราได้แก้ไขข้อมูลที่สำคัญของนโยบายเกี่ยวกับความเป็นส่วนตัวและคุกกีส์ และเราต้องการให้คุณทราบถึง ผลกระทบต่อตัวคุณและข้อมูลของคุณ',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'เราได้แก้ไขข้อมูลที่สำคัญของนโยบายเกี่ยวกับความเป็นส่วนตัวและคุกกีส์ และเราต้องการให้คุณทราบถึง ผลกระทบต่อตัวคุณและข้อมูลของคุณ',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'ตกลง',
        reject: 'ดูว่ามีอะไรเปลี่ยนแปลงไปบ้าง',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'กรุณาแจ้งให้เราทราบว่า คุณยอมรับคุกกีส์',
        description: {
          uk: {
            first: 'เราใช้',
            linkText: ' คุกกีส์',
            last:
              ' เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุดในโลกออนไลน์ กรุณาแจ้งให้เราทราบว่า คุณยอมรับคุกกีส์ทั้งหมดนี้',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'เราและพันธมิตรใช้เทคโนโลยี อย่างเช่น ',
            linkText: 'คุกกีส์',
            last:
              ' และข้อมูลการเข้าเว็บไซต์ต่าง ๆ ที่ถูกจัดเก็บไว้ เพื่อทำให้คุณได้รับประสบการณ์ที่ดีที่สุดในโลกออนไลน์ และทำให้เนื้อหาและโฆษณาที่คุณได้รับตรงกับความสนใจของคุณ กรุณาแจ้งให้เราทราบว่าคุณยอมรับหรือไม่',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'ยอมรับ',
        reject: 'ไม่ยอมรับ ไปที่การตั้งค่า',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'เสียง',
      photogallery: 'แกลเลอรีภาพ',
      video: 'วิดีโอ',
    },
  },
  brandSVG,
  navigation: [
    {
      title: 'หน้าแรก',
      url: '/thai',
    },
    {
      title: 'ประเทศไทย',
      url: '/thai/topics/1ed75fd4-f992-46db-9859-fb5a7c95da91',
    },
    {
      title: 'ต่างประเทศ',
      url: '/thai/international',
    },
    {
      title: 'วิทยาศาสตร์',
      url: '/thai/topics/0f469e6a-d4a6-46f2-b727-2bd039cb6b53',
    },
    {
      title: 'สุขภาพ',
      url: '/thai/topics/c4794229-7f87-43ce-ac0a-6cfcd6d3cef2',
    },
    {
      title: 'วิดีโอ',
      url: '/thai/media/video',
    },
    {
      title: 'ยอดนิยม',
      url: '/thai/popular/read',
    },
  ],
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'นโยบายของเราเรื่องการเชื่อมต่อไปยังลิงก์ภายนอก.',
    },
    links: [
      {
        href: 'https://www.bbc.com/thai/institutional-49281839',
        text: 'ทำไมคุณจึงไว้วางใจ บีบีซี นิวส์ ได้',
      },
      {
        href: 'https://www.bbc.com/thai/institutional-38403477',
        text: 'เงื่อนไขการใช้เว็บไซต์',
      },
      {
        href: 'https://www.bbc.com/thai/institutional-38497681',
        text: 'นโยบายความเป็นส่วนตัว',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.com/thai/institutional-37981748',
        text: 'ติดต่อบีบีซี',
      },
    ],
    copyrightText:
      'บีบีซี. บีบีซีไม่มีส่วนรับผิดชอบต่อเนื้อหาของเว็บไซต์ภายนอก. ',
  },
  fonts: [],
  timezone: 'Asia/Bangkok',
};

export default service;
