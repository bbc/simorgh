import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/America/Sao_Paulo';
import '#psammead/psammead-locales/moment/pt-br';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `pt-BR`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Atualizado',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-portuguese',
    atiAnalyticsProducerId: '33',
    chartbeatDomain: 'brasil.bbc.co.uk', // this is meant to be different to the service name
    brandName: 'BBC News Brasil',
    product: 'BBC News',
    serviceLocalizedName: 'Brasil',
    defaultImage:
      'https://news.files.bbci.co.uk/include/articles/public/portuguese/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News Brasil',
    dir: `ltr`,
    externalLinkText: ', externo',
    imageCaptionOffscreenText: 'Legenda da foto, ',
    videoCaptionOffscreenText: 'Legenda do vídeo, ',
    audioCaptionOffscreenText: 'Legenda do áudio, ',
    defaultCaptionOffscreenText: 'Legenda, ',
    imageCopyrightOffscreenText: 'Crédito, ',
    locale: `pt-BR`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'pt',
    datetimeLocale: `pt-br`,
    service: 'portuguese',
    serviceName: 'News Brasil',
    languageName: 'Portuguese',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcbrasil',
    twitterSite: '@bbcbrasil',
    noBylinesPolicy:
      'https://www.bbc.com/portuguese/institutional-50054434#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/portuguese/institutional-50054434',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Notícias, vídeos, análise e contexto em português',
    passportHomes: ['brasil'],
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'Podcast',
      brandTitle: 'Brasil Partido',
      brandDescription:
        'João Fellet tenta entender como brasileiros chegaram ao grau atual de divisão.',
      image: {
        src: 'https://ichef.bbc.co.uk/images/ic/$recipe/p0d67gkg.jpg',
        alt: 'Logo: Brasil Partido',
      },
      linkLabel: {
        text: 'Episódios',
        href: 'https://www.bbc.com/portuguese/podcasts/p0cyhvny',
      },
      skipLink: {
        text: 'Pule %title% e continue lendo',
        endTextVisuallyHidden: 'Fim do %title%',
      },
    },
    mostRead: {
      header: 'Mais lidas',
      lastUpdated: 'Última atualização:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Mais assistido',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Pule %title% e continue lendo',
        endTextVisuallyHidden: 'Fim do %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/portuguese/institutional-50054434',
        text: 'Por que você pode confiar na BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Leia sobre nossa política em relação a links externos.',
      },
      links: [
        {
          href: 'https://www.bbc.com/portuguese/institutional-36202448',
          text: 'Termos de Uso',
        },
        {
          href: 'https://www.bbc.com/portuguese/institutional-36202452',
          text: 'Sobre a BBC',
        },
        {
          href: 'https://www.bbc.com/portuguese/institutional-36202454',
          text: 'Política de privacidade',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/portuguese/send/u50853599',
          text: 'Contate a BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. A BBC não se responsabiliza pelo conteúdo de sites externos.',
    },
    timezone: 'America/Sao_Paulo',
    navigation: [
      {
        title: 'Notícias',
        url: '/portuguese',
      },
      {
        title: 'Brasil',
        url: '/portuguese/topics/cz74k717pw5t',
      },
      {
        title: 'Internacional',
        url: '/portuguese/topics/cmdm4ynm24kt',
      },
      {
        title: 'Economia',
        url: '/portuguese/topics/cvjp2jr0k9rt',
      },
      {
        title: 'Saúde',
        url: '/portuguese/topics/c340q430z4vt',
      },
      {
        title: 'Ciência',
        url: '/portuguese/topics/cr50y580rjxt',
      },
      {
        title: 'Tecnologia',
        url: '/portuguese/topics/c404v027pd4t',
      },
      {
        title: 'Vídeos',
        url: '/portuguese/topics/c9y2j35dn2zt',
      },
    ],
  },
};

export default withContext(service);
