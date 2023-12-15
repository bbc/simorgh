import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import '#psammead/moment-timezone-include/tz/Asia/Karachi';
import '#psammead/psammead-locales/moment/ur';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ur',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'اپ ڈیٹ کی گئی',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-urdu',
    atiAnalyticsProducerId: '95',
    chartbeatDomain: 'urdu.bbc.co.uk',
    brandName: 'BBC News اردو',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/urdu.png',
    defaultImageAltText: 'BBC News اردو',
    dir: 'rtl',
    externalLinkText: '، بیرو',
    imageCaptionOffscreenText: '،تصویر کا کیپشن',
    videoCaptionOffscreenText: '،ویڈیو کیپشن',
    audioCaptionOffscreenText: '،آڈیو کیپشن',
    defaultCaptionOffscreenText: '،کیپشن',
    imageCopyrightOffscreenText: '،تصویر کا ذریعہ',
    locale: 'ur',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ur',
    datetimeLocale: 'ur',
    service: 'urdu',
    serviceName: 'Urdu',
    languageName: 'Urdu',
    serviceLocalizedName: 'اردو',
    twitterCreator: '@bbcurdu',
    twitterSite: '@bbcurdu',
    noBylinesPolicy:
      'https://www.bbc.com/urdu/institutional-49282935#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/urdu/institutional-49282935',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'خبریں، تازہ خبریں، بریکنگ نیو | News, latest news, breaking news',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'پوڈکاسٹ',
      brandTitle: 'ڈرامہ کوئین',
      brandDescription:
        '’ڈرامہ کوئین‘ پوڈکاسٹ میں سنیے وہ باتیں جنہیں کسی کے ساتھ بانٹنے نہیں دیا جاتا',
      image: {
        src: 'http://ichef.bbci.co.uk/images/ic/448xn/p0c04zy8.jpg',
        alt: 'ڈرامہ کوئین',
      },
      linkLabel: {
        text: 'قسطیں',
        href: 'https://www.bbc.com/urdu/podcasts/p0c04t7w',
      },
      skipLink: {
        text: 'مواد پر جائیں',
        endTextVisuallyHidden: 'مواد پر جائیں',
      },
    },
    translations,
    mostRead: {
      header: 'سب سے زیادہ پڑھی جانے والی',
      lastUpdated: 'آخری اپ ڈیٹ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'سب سے زیادہ دیکھی گئی',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'ایف ایم بلیٹن',
      durationLabel: '%duration% دورانیہ',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/urdu/institutional-49282935',
        text: 'جانیے کہ آپ بی بی سی پر کیوں اعتماد کر سکتے ہیں',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'بیرونی لنکس کے بارے میں ہماری پالیسی.',
      },
      links: [
        {
          href: 'https://www.bbc.com/urdu/institutional-37588278',
          text: 'استعمال کے ضوابط',
        },
        {
          href: 'https://www.bbc.com/urdu/institutional-37588280',
          text: 'بی بی سی کے بارے میں',
        },
        {
          href: 'https://www.bbc.com/urdu/institutional-37588282',
          text: 'پرائیویسی پالیسی',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'کوکیز',
        },
        {
          href: 'https://www.bbc.co.uk/urdu/send/u50853907',
          text: 'بی بی سی سے رابطہ کریں',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'بی بی سی. بی بی سی بیرونی ویب سائٹس کے مواد کا ذمہ دار نہیں',
    },
    timezone: 'Asia/Karachi',
    navigation: [
      {
        title: 'صفحۂ اول',
        url: '/urdu',
      },
      {
        title: 'پاکستان',
        url: '/urdu/topics/cjgn7n9zzq7t',
      },
      {
        title: 'الیکشن 2024',
        url: '/urdu/topics/cynd7qxprq0t',
      },
      {
        title: 'آس پاس',
        url: '/urdu/topics/cl8l9mveql2t',
      },
      {
        title: 'ورلڈ',
        url: '/urdu/topics/cw57v2pmll9t',
      },
      {
        title: 'کھیل',
        url: '/urdu/topics/c340q0p2585t',
      },
      {
        title: 'فن فنکار',
        url: '/urdu/topics/ckdxnx900n5t',
      },
      {
        title: 'سائنس',
        url: '/urdu/topics/c40379e2ymxt',
      },
      {
        title: 'ویڈیو',
        url: '/urdu/topics/c1e0mzr3r2yt',
      },
    ],
  },
};

export default withContext(service);
