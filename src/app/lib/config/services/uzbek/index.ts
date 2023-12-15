import cyrillic from '../../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/uz';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `uz-Cyrl`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Янгиланди',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-uzbek',
    atiAnalyticsProducerId: '96',
    chartbeatDomain: 'uzbek.bbc.co.uk',
    brandName: "BBC News O'zbek",
    product: 'BBC News',
    serviceLocalizedName: "O'zbek",
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/uzbek.png',
    defaultImageAltText: "BBC News O'zbek",
    dir: `ltr`,
    externalLinkText: ', ташқи',
    imageCaptionOffscreenText: 'Сурат тагсўзи, ',
    videoCaptionOffscreenText: 'Видео тагсўзи, ',
    audioCaptionOffscreenText: 'Аудио тагсўзи, ',
    defaultCaptionOffscreenText: 'Тагсўз, ',
    imageCopyrightOffscreenText: 'Сурат манбаси, ',
    locale: `uz-UZ`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'uz',
    datetimeLocale: `uz`,
    service: 'uzbek',
    serviceName: 'Uzbek',
    languageName: 'Uzbek',
    twitterCreator: '@bbcuzbek',
    twitterSite: '@bbcuzbek',
    noBylinesPolicy:
      'https://www.bbc.com/uzbek/institutional-50220995#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/uzbek/institutional-50220995',
    isTrustProjectParticipant: true,
    script: cyrillic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Бош саҳифа',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'Энг кўп ўқилган',
      lastUpdated: 'Сўнгги янгиланиш:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Энг кўп кўрилган',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/uzbek/institutional-50220995',
        text: 'Нега сиз Би-би-сига ишонишингиз мумкин?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Ташқи линкларга бизнинг ёндашувимиз қандайлиги ҳақида маълумотга эга бўлинг',
      },
      links: [
        {
          href: 'https://www.bbc.com/uzbek/institutional-36824297',
          text: 'Фойдаланиш шартлари',
        },
        {
          href: 'https://www.bbc.com/uzbek/institutional-36824300',
          text: 'Шахсий ҳаёт махфийлиги сиёсати',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Куки(Cookies)',
        },
        {
          href: 'https://www.bbc.co.uk/uzbek/send/u50853929',
          text: "'Bi-bi-si bilan bog’laning'",
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. Би-би-си ташқи сайтлар мазмуни учун масъул эмас.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Бош саҳифа',
        url: '/uzbek',
      },
      {
        title: 'Ўзбекистон',
        url: '/uzbek/topics/c8y949r98pgt',
      },
      {
        title: 'Минтақа',
        url: '/uzbek/topics/cwr9j9dz4gpt',
      },
      {
        title: 'Дунё',
        url: '/uzbek/topics/cl8l9mved19t',
      },
      {
        title: 'Спорт',
        url: '/uzbek/topics/cxnykykk1zkt',
      },
      {
        title: 'Илм-Фан',
        url: '/uzbek/topics/cg7262681krt',
      },
      {
        title: 'Технология',
        url: '/uzbek/topics/cjgn7n7v3yjt',
      },
      {
        title: 'BBC News O‘zbek TV dasturi',
        url: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv?limit=4',
      },
    ],
  },
};

export default withContext(service);
