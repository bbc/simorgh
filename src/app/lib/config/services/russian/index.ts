import cyrillic from '../../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ru';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import { mainTranslations, headerFooterTranslations } from './translations';

export const service: DefaultServiceConfig = {
  default: {
    translations: { ...mainTranslations, ...headerFooterTranslations },
    lang: `ru`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Обновлено',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-russian',
    atiAnalyticsProducerId: '75',
    chartbeatDomain: 'russian.bbc.co.uk',
    brandName: 'BBC News Русская служба',
    product: 'BBC News',
    serviceLocalizedName: 'Русская служба',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/russian.png',
    defaultImageAltText: 'BBC News Русская служба',
    dir: `ltr`,
    externalLinkText: ', внешняя',
    imageCaptionOffscreenText: 'Подпись к фото, ',
    videoCaptionOffscreenText: 'Подпись к видео, ',
    audioCaptionOffscreenText: 'Подпись к аудио, ',
    defaultCaptionOffscreenText: 'Подпись, ',
    imageCopyrightOffscreenText: 'Автор фото, ',
    locale: `ru-RU`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ru',
    datetimeLocale: `ru`,
    service: 'russian',
    serviceName: 'Russian',
    languageName: 'Russian',
    twitterCreator: '@bbcrussian',
    twitterSite: '@bbcrussian',
    noBylinesPolicy:
      'https://www.bbc.com/russian/institutional-50098149#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/russian/institutional-50098149',
    isTrustProjectParticipant: true,
    script: cyrillic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Главная',
    iTunesAppId: 504278066,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    mostRead: {
      header: 'Самое популярное',
      lastUpdated: 'Последнее обновление:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Самое популярное видео',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    podcastPromo: {
      title: 'Подкаст',
      brandTitle: 'Что это было?',
      brandDescription:
        'Мы быстро, просто и понятно объясняем, что случилось, почему это важно и что будет дальше.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0776f5z.jpg',
        alt: 'Что это было?',
      },
      linkLabel: {
        text: 'эпизоды',
        href: 'https://www.bbc.com/russian/media-47937790',
      },
      skipLink: {
        text: 'Пропустить Реклама подкастов и продолжить чтение.',
        endTextVisuallyHidden: 'Конец истории Реклама подкастов',
      },
    },
    disclaimer: {
      para1: {
        text: 'Подпишитесь на нашу рассылку «Контекст»:',
        url: 'https://www.bbc.com/russian/resources/idt-b34bb7dd-f094-4722-92eb-cf7aff8cc1bc',
        isExternal: false,
      },
      para2: ' она поможет вам разобраться в событиях.',
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/russian/institutional-50098149',
        text: 'Почему BBC News заслуживает доверия',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Познакомьтесь с нашими правилами внешних ссылок.',
      },
      links: [
        {
          href: 'https://www.bbc.com/russian/institutional-36515745',
          text: 'Правила использования',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36515748',
          text: 'О Би-би-си',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36517234',
          text: 'Личные данные',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Куки',
        },
        {
          href: 'https://www.bbc.co.uk/russian/send/u50853643',
          text: 'Связаться с Би-би-си',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-би-си не несет ответственности за содержание других сайтов.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Главная',
        url: '/russian',
      },
      {
        title: 'Война в Украине',
        url: '/russian/topics/cez0n29ggrdt',
      },
      {
        title: 'Истории',
        url: '/russian/features-50983593',
      },
      {
        title: 'Видео',
        url: '/russian/in-depth-54439028',
      },
      {
        title: 'Фильмы',
        url: '/russian/in-depth-48104242',
      },
      {
        title: 'Подкасты',
        url: '/russian/media-47937790',
      },
    ],
  },
};

export default withContext(service);
