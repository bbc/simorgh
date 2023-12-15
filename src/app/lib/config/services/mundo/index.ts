import latinWithDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/es';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `es`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Actualizado',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-mundo',
    atiAnalyticsProducerId: '62',
    chartbeatDomain: 'mundo.bbc.co.uk',
    brandName: 'BBC News Mundo',
    product: 'BBC News',
    serviceLocalizedName: 'Mundo',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
    defaultImageAltText: 'BBC News Mundo',
    dir: `ltr`,
    externalLinkText: ', externo',
    imageCaptionOffscreenText: 'Pie de foto, ',
    videoCaptionOffscreenText: 'Título del video, ',
    audioCaptionOffscreenText: 'Título del audio',
    defaultCaptionOffscreenText: 'Título, ',
    imageCopyrightOffscreenText: 'Fuente de la imagen, ',
    locale: `es-005`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'es',
    datetimeLocale: `es`,
    service: 'mundo',
    serviceName: 'News Mundo',
    languageName: 'Spanish',
    twitterCreator: '@bbcmundo',
    twitterSite: '@bbcmundo',
    noBylinesPolicy:
      'https://www.bbc.com/mundo/institucional-51359666#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/mundo/institucional-51359666',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Noticias',
    iTunesAppId: 515255747,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'Más leídas',
      lastUpdated: 'Última actualización:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Más vistos',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Saltar %title% y continuar leyendo',
        endTextVisuallyHidden: 'Final de %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/mundo/institucional-51359666',
        text: 'Por qué puedes confiar en la BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Lee sobre nuestra postura acerca de enlaces externos.',
      },
      links: [
        {
          href: 'https://www.bbc.com/mundo/institucional-36400005',
          text: 'Términos de uso',
        },
        {
          href: 'https://www.bbc.com/mundo/institucional-36400007',
          text: 'Sobre la BBC',
        },
        {
          href: 'https://www.bbc.com/mundo/institucional-36400009',
          text: 'Política de privacidad',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/mundo/send/u50853489',
          text: 'Escribe a BBC Mundo',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. La BBC no se hace responsable del contenido de sitios externos.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Noticias',
        url: '/mundo',
      },
      {
        title: 'América Latina',
        url: '/mundo/topics/c7zp57yyz25t',
      },
      {
        title: 'Internacional',
        url: '/mundo/topics/c2lej05epw5t',
      },
      {
        title: 'Hay Festival',
        url: '/mundo/noticias-36795069',
      },
      {
        title: 'Economía',
        url: '/mundo/topics/c06gq9v4xp3t',
      },
      {
        title: 'Ciencia',
        url: '/mundo/topics/ckdxnw959n7t',
      },
      {
        title: 'Salud',
        url: '/mundo/topics/cpzd498zkxgt',
      },
      {
        title: 'Cultura',
        url: '/mundo/topics/c2dwq9zyv4yt',
      },
      {
        title: 'Tecnología',
        url: '/mundo/topics/cyx5krnw38vt',
      },
      {
        title: 'Centroamérica Cuenta',
        url: '/mundo/noticias-43826245',
      },
      {
        title: 'BBC Extra',
        url: '/mundo/noticias-48908206',
      },
    ],
  },
};

export default withContext(service);
