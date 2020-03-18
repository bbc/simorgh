import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { thai } from '@bbc/gel-foundations/scripts';
import { thai as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Bangkok';
import '@bbc/psammead-locales/moment/th';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `th`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: `th`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ปรับปรุงแล้ว',
    atiAnalyticsAppName: 'news-thai',
    atiAnalyticsProducerId: '90',
    chartbeatDomain: 'thai.bbc.co.uk',
    brandName: 'BBC News ไทย',
    product: 'BBC News',
    serviceLocalizedName: 'ไทย',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/thai.png',
    defaultImageAltText: 'BBC News ไทย',
    dir: `ltr`,
    externalLinkText: ' ลิงก์จากภายนอก',
    imageCaptionOffscreenText: 'คำบรรยายภาพ ',
    videoCaptionOffscreenText: 'คำบรรยายวิดีโอ ',
    audioCaptionOffscreenText: 'คำบรรยายเสียง ',
    defaultCaptionOffscreenText: 'คำบรรยาย ',
    imageCopyrightOffscreenText: 'ที่มาของภาพ ',
    locale: `th-TH`,
    datetimeLocale: 'th',
    service: 'thai',
    serviceName: 'Thai',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbc_thailand',
    twitterSite: '@bbc_thailand',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: thai,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ข่าว ข่าววันนี้ ข่าวล่าสุด วีดีโอ',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'ดูทั้งหมด',
      home: 'หน้าแรก',
      currentPage: 'หน้าปัจจุบัน',
      skipLinkText: 'ข้ามไปยังเนื้อหา',
      relatedContent: 'อ่านข่าวนี้เพิ่มเติม',
      navMenuText: 'หมวดข่าว',
      mediaAssetPage: {
        mediaPlayer: 'มีเดีย เพลเยอร์',
        audioPlayer: 'ออดิโอ เพลเยอร์',
        videoPlayer: 'วิดีโอ เพลเยอร์',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'ไม่พบเนื้อหา',
          message:
            'ขออภัย เราไม่สามารถแสดงเนื้อหาที่คุณกำลังค้นหาได้ กรุณาลอง:',
          solutions: [
            'ตรวจสอบชื่อเว็บไซต์ ',
            'กดปุ่มรีเฟรชในบราวเซอร์ของคุณ',
            'ค้นหาหน้านี้โดยใช้แถบค้นหาของ บีบีซี',
          ],
          callToActionFirst: 'กรุณาเข้าไปที่โฮมเพจของ ',
          callToActionLinkText: 'บีบีซีไทย',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/thai',
        },
        500: {
          statusCode: '500',
          title: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ ',
          message:
            'ขออภัย เราไม่สามารถแสดงเนื้อหาที่คุณกำลังค้นหาได้ กรุณาลอง:',
          solutions: [
            'กดปุ่มรีเฟรชในบราวเซอร์ของคุณ',
            'กลับเข้ามาใหม่ในภายหลัง',
          ],
          callToActionFirst: 'กรุณาเข้าไปที่โฮมเพจของ ',
          callToActionLinkText: 'บีบีซีไทย',
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
              first: 'เราใช้ ',
              linkText: 'คุกกีส์',
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
        noJs: 'อุปกรณ์ของท่านไม่สามารถใช้งานเครื่องเล่นสื่อได้',
        contentExpired: 'เนื้อหานี้ไม่สามารถใช้งานได้แล้ว',
        audio: 'เสียง',
        photogallery: 'แกลเลอรีภาพ',
        video: 'วิดีโอ',
        listen: 'ฟัง',
        watch: 'ดูู',
        liveLabel: 'สด',
        previousRadioShow: 'รายการวิทยุก่อนหน้า',
        nextRadioShow: 'รายการวิทยุถัดไป',
        duration: 'ความยาว',
      },
    },
    brandSVG,
    mostRead: {
      header: 'ได้รับความนิยมสูงสุด',
      lastUpdated: 'อัพเดทล่าสุดเมื่อเวลา',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
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
      trustProjectLink: {
        href: 'https://www.bbc.com/thai/institutional-49281839',
        text: 'ทำไมคุณจึงไว้วางใจ บีบีซี นิวส์ ได้',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'นโยบายของเราเรื่องการเชื่อมต่อไปยังลิงก์ภายนอก.',
      },
      links: [
        {
          href: 'https://www.bbc.com/thai/institutional-38403477',
          text: 'เงื่อนไขการใช้งานของ BBC',
        },
        {
          href: 'https://www.bbc.com/thai/institutional-38403476',
          text: 'เกี่ยวกับบีบีซี',
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
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'บีบีซี. บีบีซีไม่มีส่วนรับผิดชอบต่อเนื้อหาของเว็บไซต์ภายนอก.',
    },
    fonts: [],
    timezone: 'Asia/Bangkok',
  },
};

export default withContext(service);
