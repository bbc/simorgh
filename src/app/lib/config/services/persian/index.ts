import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import 'moment/locale/fa';
import '#psammead/moment-timezone-include/tz/GMT';
import jalaali from '../../../../legacy/psammead/psammead-calendars/src';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'fa',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'به روز شده در',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-persian',
    atiAnalyticsProducerId: '69',
    chartbeatDomain: 'persian.bbc.co.uk',
    brandName: 'BBC News فارسی',
    serviceLocalizedName: 'فارسی',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    defaultImageAltText: 'BBC News فارسی',
    dir: 'rtl',
    externalLinkText: '، خارجی',
    imageCaptionOffscreenText: 'توضیح تصویر، ',
    videoCaptionOffscreenText: 'توضیح ویدئو، ',
    audioCaptionOffscreenText: 'توضیح صدا، ',
    defaultCaptionOffscreenText: 'توضیح، ',
    imageCopyrightOffscreenText: 'منبع تصویر، ',
    locale: 'fa',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'fa',
    datetimeLocale: 'fa',
    service: 'persian',
    serviceName: 'Persian',
    languageName: 'Persian',
    altCalendar: jalaali,
    twitterCreator: '@bbcpersian',
    twitterSite: '@bbcpersian',
    noBylinesPolicy:
      'https://www.bbc.com/persian/institutional-49283091#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/persian/institutional-49283091',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'صفحه اول',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'پادکست',
      brandTitle: 'صفحه ۲',
      brandDescription:
        'در این برنامه با صاحب‌نظران درباره مسائل سیاسی و اجتماعی روز گفت‌ و‌ گو می‌کنیم.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p069d2yl.jpg',
        alt: 'صفحه ۲',
      },
      linkLabel: {
        text: 'پادکست',
        href: 'https://www.bbc.com/persian/podcasts/p05gyy09',
      },
      skipLink: {
        text: 'از %title% رد شوید و به خواندن ادامه دهید',
        endTextVisuallyHidden: 'پایان %title%',
      },
    },
    translations,
    mostRead: {
      header: 'پربیننده‌ترین‌ها',
      lastUpdated: 'به روز شده در',
      numberOfItems: 10,
      hasMostRead: true,
      onIdxPage: true,
    },
    mostWatched: {
      header: 'پربیننده ترین',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      onIdxPage: true,
      idxPagePosition: 'Features',
      header: 'برنامه‌های رادیو',
      durationLabel: '%duration% المدة الزمنية',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/persian/institutional-49283091',
        text: 'چرا می‌توانید به بی‌بی‌سی اطمینان کنید؟',
      },
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
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'کوکی ها',
        },
        {
          href: 'https://www.bbc.co.uk/persian/send/u50853555',
          text: 'تماس با بی بی سی',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'صفحه اول',
        url: '/persian',
      },
      {
        title: 'جنگ اسرائیل-غزه',
        url: '/persian/topics/clm0z4jgj3xt',
      },
      {
        title: 'پخش زنده',
        url: '/persian/media-49522521',
      },
      {
        title: 'ویدیو',
        url: '/persian/topics/c6z7mnr559gt',
      },
      {
        title: 'تلویزیون',
        url: '/persian/tv-and-radio-37434377',
      },
      {
        title: 'ايران',
        url: '/persian/topics/ckdxnwvwwjnt',
      },
      {
        title: 'افغانستان',
        url: '/persian/afghanistan',
      },
      {
        title: 'جهان',
        url: '/persian/topics/c1d8ye58xl8t',
      },
      {
        title: 'هنر',
        url: '/persian/topics/c9wpm0epm45t',
      },
      {
        title: 'ورزش',
        url: '/persian/topics/cnq6879k7yjt',
      },
      {
        title: 'اقتصاد',
        url: '/persian/topics/cl8l9mvlllqt',
      },
      {
        title: 'دانش',
        url: '/persian/topics/ckdxnwr4r1yt',
      },
      {
        title: 'رادیو',
        url: '/persian/tv-and-radio-37434376',
      },
    ],
  },
};

export default withContext(service);
