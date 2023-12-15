import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import '#psammead/psammead-locales/moment/ar';
import '#psammead/moment-timezone-include/tz/GMT';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ar',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'آخر تحديث',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-arabic',
    atiAnalyticsProducerId: '5',
    chartbeatDomain: 'arabic.bbc.co.uk',
    brandName: 'BBC News عربي',
    product: 'BBC News',
    serviceLocalizedName: 'عربي',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
    defaultImageAltText: 'BBC News عربي',
    dir: 'rtl',
    externalLinkText: '، خارجي ',
    imageCaptionOffscreenText: 'التعليق على الصورة، ',
    videoCaptionOffscreenText: 'التعليق على الفيديو، ',
    audioCaptionOffscreenText: 'التعليق على التسجيل الصوتي، ',
    defaultCaptionOffscreenText: 'التعليق، ',
    imageCopyrightOffscreenText: 'صدر الصورة، ',
    locale: 'ar',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ar',
    datetimeLocale: 'ar',
    service: 'arabic',
    serviceName: 'Arabic',
    languageName: 'Arabic',
    twitterCreator: '@BBCArabic',
    twitterSite: '@BBCArabic',
    noBylinesPolicy:
      'https://www.bbc.com/arabic/institutional-49283069#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/arabic/institutional-49283069',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'الرئيسية',
    iTunesAppId: 558497376,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'البودكاست',
      brandTitle: 'بي بي سي إكسترا',
      brandDescription:
        'بودكاست أسبوعي يقدم  قصصا إنسانية عن العالم العربي وشبابه.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p09t98w8.jpg',
        alt: 'بي بي سي إكسترا',
      },
      linkLabel: {
        text: 'الحلقات',
        href: 'https://www.bbc.com/arabic/podcasts/p02pc9qc',
      },
      skipLink: {
        text: 'تخطى %title% وواصل القراءة',
        endTextVisuallyHidden: '%title% نهاية',
      },
    },
    translations,
    mostRead: {
      header: 'الأكثر قراءة',
      lastUpdated: 'آخر تحديث',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'الأكثر مشاهدة',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageUrl: '/arabic/tv-and-radio-57895092',
      frequenciesPageLabel: 'استقبال البث',
      header: 'البث الإذاعي',
      durationLabel: 'المدة %duration%',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'تخطى %title% وواصل القراءة',
        endTextVisuallyHidden: '%title% نهاية',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/arabic/institutional-49283069',
        text: 'لماذا يمكنك الاعتماد على أخبار بي بي سي',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'سياستنا بخصوص الروابط الخارجية.',
      },
      links: [
        {
          href: 'https://www.bbc.com/arabic/institutional-37731351',
          text: 'شروط الاستخدام',
        },
        {
          href: 'https://www.bbc.com/arabic/institutional-37731352',
          text: 'عن بي بي سي',
        },
        {
          href: 'https://www.bbc.com/arabic/institutional-37731353',
          text: 'سياسة الخصوصية',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ملفات الارتباط Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/arabic/send/u50853203',
          text: 'اتصل بـ بي بي سي',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'بي بي سي. بي بي سي ليست مسؤولة عن محتوى المواقع الخارجية.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'رئيسية',
        url: '/arabic',
      },
      {
        title: 'شرق أوسط',
        url: '/arabic/topics/ckdxnj6g4znt',
      },
      {
        title: 'عالم',
        url: '/arabic/topics/c719d2el19nt',
      },
      {
        title: 'علوم وتكنولوجيا',
        url: '/arabic/topics/c719d2ely7xt',
      },
      {
        title: 'صحة',
        url: '/arabic/topics/c95y3q70znjt',
      },
      {
        title: 'فيديو',
        url: '/arabic/media-54706728',
      },
      {
        title: 'صحافة',
        url: '/arabic/topics/c08gmd9rp97t',
      },
      {
        title: 'ترند',
        url: '/arabic/topics/c404vr23x4dt',
      },
      {
        title: 'تحقيقات',
        url: '/arabic/tv-and-radio-42414864',
      },
      {
        title: 'بودكاست',
        url: '/arabic/tv-and-radio-52067221',
      },
      {
        title: 'برامجنا',
        url: '/arabic/tv-and-radio-37728883',
      },
    ],
  },
};

export default withContext(service);
