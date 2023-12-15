import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import '#psammead/psammead-locales/moment/ps';
import '#psammead/moment-timezone-include/tz/GMT';
import jalaali from '../../../../legacy/psammead/psammead-calendars/src';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ps',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'تازه',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-pashto',
    atiAnalyticsProducerId: '68',
    brandName: 'BBC News پښتو',
    chartbeatDomain: 'pashto.bbc.co.uk',
    serviceLocalizedName: 'پښتو',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pashto.png',
    defaultImageAltText: 'BBC News پښتو',
    dir: 'rtl',
    externalLinkText: '، بهرنی',
    imageCaptionOffscreenText: 'د عکس تشریح، ',
    videoCaptionOffscreenText: 'د ویډیو تشریح، ',
    audioCaptionOffscreenText: 'د غږ تشریح، ',
    defaultCaptionOffscreenText: 'تشریح، ',
    imageCopyrightOffscreenText: 'د عکس سرچینه، ',
    locale: 'ps',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ps',
    datetimeLocale: 'ps',
    service: 'pashto',
    serviceName: 'Pashto',
    languageName: 'Pashto',
    altCalendar: jalaali,
    twitterCreator: '@bbcpashto',
    twitterSite: '@bbcpashto',
    noBylinesPolicy:
      'https://www.bbc.com/pashto/institutional-49283007#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/pashto/institutional-49283007',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'کور پاڼه',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'ډېر لوستل شوي',
      lastUpdated: 'د خپرېدو نیټه',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'تر ټولو ډېر لیدل شوی',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageUrl: '/pashto/institutional/2012/03/000001_frequencies',
      frequenciesPageLabel: 'راديويي څپې',
      header: 'تازه خبرونه واورئ',
      durationLabel: '%duration% موده',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/pashto/institutional-49283007',
        text: 'ولې تاسې پر بي بي سي خبرونو باور کولی شئ',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'د نورو ویبپاڼو لینکولو په اړه زموږ تګلاره.',
      },
      links: [
        {
          href: 'https://www.bbc.com/pashto/institutional-37620701',
          text: 'د کارولو شرايط',
        },
        {
          href: 'https://www.bbc.com/pashto/institutional-37622761',
          text: 'د بي بي سي‌ په اړه',
        },
        {
          href: 'https://www.bbc.com/pashto/institutional-37622762',
          text: 'د محرميت تگلاره',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/pashto/send/u50853533',
          text: 'زموږ سره اړیکي',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'بي بي سي. بي بي‌ سي‌ د نورو ویبپاڼو د محتوا مسوله نه ده.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'کور پاڼه',
        url: '/pashto',
      },
      {
        title: 'افغانستان',
        url: '/pashto/topics/cr50y57xj52t',
      },
      {
        title: 'پښتونخوا',
        url: '/pashto/topics/cz74k7wy49jt',
      },
      {
        title: 'نړۍ',
        url: '/pashto/topics/cxe2wdp2dv3t',
      },
      {
        title: 'ښځې',
        url: '/pashto/topics/cr50y5rq23gt',
      },
      {
        title: 'لوبې',
        url: '/pashto/topics/cr50y59q860t',
      },
      {
        title: 'ويډيوګانې',
        url: '/pashto/topics/c2m45zyk0mmt',
      },
      {
        title: 'ځانګړې پاڼې',
        url: '/pashto/in-depth-54540873',
      },
      {
        title: 'کالم',
        url: '/pashto/columns-54029178',
      },
      {
        title: 'پر سټلایت خپرونې',
        url: '/pashto/articles/c4n55eygdn0o',
      },
    ],
  },
};

export default withContext(service);
