import thai from '../../../../components/ThemeProvider/fontScripts/thai';
import '#psammead/moment-timezone-include/tz/Asia/Bangkok';
import '#psammead/psammead-locales/moment/th';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `th`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: `th`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ปรับปรุงแล้ว',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-thai',
    atiAnalyticsProducerId: '90',
    chartbeatDomain: 'thai.bbc.co.uk',
    brandName: 'BBC News ไทย',
    product: 'BBC News',
    serviceLocalizedName: 'ไทย',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/thai.png',
    defaultImageAltText: 'BBC News ไทย',
    dir: `ltr`,
    externalLinkText: ', จากภายนอก',
    imageCaptionOffscreenText: 'คำบรรยายภาพ, ',
    videoCaptionOffscreenText: 'คำบรรยายวิดีโอ, ',
    audioCaptionOffscreenText: 'คำบรรยายเสียง, ',
    defaultCaptionOffscreenText: 'คำบรรยาย, ',
    imageCopyrightOffscreenText: 'ที่มาของภาพ, ',
    locale: `th-TH`,
    datetimeLocale: 'th',
    service: 'thai',
    serviceName: 'Thai',
    languageName: 'Thai',
    twitterCreator: '@bbc_thailand',
    twitterSite: '@bbc_thailand',
    noBylinesPolicy:
      'https://www.bbc.com/thai/institutional-49281839#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/thai/institutional-49281839',
    isTrustProjectParticipant: true,
    script: thai,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ข่าว ข่าววันนี้ ข่าวล่าสุด วีดีโอ',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'ได้รับความนิยมสูงสุด',
      lastUpdated: 'อัพเดทล่าสุดเมื่อเวลา',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'มียอดชมมากที่สุด',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    navigation: [
      {
        title: 'หน้าแรก',
        url: '/thai',
      },
      {
        title: 'เลือกตั้ง 2566',
        url: '/thai/topics/cmlj9jxgg69t ',
      },
      {
        title: 'ประเทศไทย',
        url: '/thai/topics/cjgn73g98rqt',
      },
      {
        title: 'ต่างประเทศ',
        url: '/thai/topics/c5v124k8lj7t',
      },
      {
        title: 'วิทยาศาสตร์',
        url: '/thai/topics/c5qvp1q33p0t',
      },
      {
        title: 'สุขภาพ',
        url: '/thai/topics/cyx5kz25zxdt',
      },
      {
        title: 'วิดีโอ',
        url: '/thai/topics/c5ljd3jng4nt',
      },
      {
        title: 'ยอดนิยม',
        url: '/thai/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/thai/institutional-49281839',
        text: 'ทำไมคุณจึงไว้วางใจ บีบีซี ได้',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'อ่านเกี่ยวกับแนวทางของเราในการติดต่อกับลิงก์ภายนอก',
      },
      links: [
        {
          href: 'https://www.bbc.com/thai/institutional-38403477',
          text: 'เงื่อนไขการใช้งานของ บีบีซี',
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
          text: 'คุกกีส์',
        },
        {
          href: 'https://www.bbc.co.uk/thai/send/u50853797',
          text: 'ติดต่อบีบีซี',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'บีบีซี. บีบีซีไม่มีส่วนรับผิดชอบต่อเนื้อหาของเว็บไซต์ภายนอก. นโยบายของเราเรื่องการเชื่อมต่อไปยังลิงก์ภายนอก.',
    },
    timezone: 'Asia/Bangkok',
  },
};

export default withContext(service);
