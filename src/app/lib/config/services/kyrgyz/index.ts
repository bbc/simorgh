import cyrillic from '../../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ky';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ky`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Жаңылоо',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-kyrgyz',
    atiAnalyticsProducerId: '58',
    chartbeatDomain: 'kyrgyz.bbc.co.uk',
    brandName: 'BBC News Кыргыз Кызматы',
    product: 'BBC News',
    serviceLocalizedName: 'Кыргыз КызMATы',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/kyrgyz.png',
    defaultImageAltText: 'BBC News Кыргыз КызMATы',
    dir: `ltr`,
    externalLinkText: ', баракчалар',
    imageCaptionOffscreenText: 'Сүрөттүн түшүндүрмөсү, ',
    videoCaptionOffscreenText: 'Видеонун түшүндүрмөсү, ',
    audioCaptionOffscreenText: 'Аудионун түшүндүрмөсү, ',
    defaultCaptionOffscreenText: 'Түшүндүрмө, ',
    imageCopyrightOffscreenText: 'Сүрөттүн булагы, ',
    locale: `ky-KG`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ky',
    datetimeLocale: `ky`,
    service: 'kyrgyz',
    serviceName: 'News Кыргыз КызMATы',
    languageName: 'Kyrgyz',
    twitterCreator: '@bbckyrgyz',
    twitterSite: '@bbckyrgyz',
    noBylinesPolicy:
      'https://www.bbc.com/kyrgyz/institutional-49677275#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/kyrgyz/institutional-49677275',
    isTrustProjectParticipant: true,
    script: cyrillic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Кабарлар, акыркы мүнөттөгү кабарлар, талдоо, видео',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'Эң көп окулгандар',
      lastUpdated: 'Акыркы жаңылоо:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Эң көп көрүлгөндөр',
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
        href: 'https://www.bbc.com/kyrgyz/institutional-49677275',
        text: 'Эмнеге BBC News ишенсе болот?',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Башка интернет сайттардын мазмуну боюнча биздин позиция.',
      },
      links: [
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157280',
          text: 'Колдонуу эрежелери',
        },
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157281',
          text: 'Би-Би-Си жөнүндө',
        },
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157282',
          text: 'Купуялык',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/kyrgyz/send/u50853445',
          text: 'Би-Би-Си менен байланышыңыз',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-Би-Си сырткы интернет сайттардын мазмуну үчүн жооптуу эмес.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Башталгыч бет',
        url: '/kyrgyz',
      },
      {
        title: 'Кыргызстан',
        url: '/kyrgyz/topics/cz74kjpyk07t',
      },
      {
        title: 'Дүйнө',
        url: '/kyrgyz/topics/ck2l9z012nkt',
      },
      {
        title: 'САПАР',
        url: '/kyrgyz/topics/c6z8lg83w7mt',
      },
      {
        title: 'Журнал',
        url: '/kyrgyz/topics/czp8pjrkgp0t',
      },
      {
        title: 'Подкасттар',
        url: '/kyrgyz/podcasts/p0c80v81',
      },
    ],
  },
};

export default withContext(service);
