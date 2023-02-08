import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import '#psammead/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/fr';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `fr`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Mise à jour',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-afrique',
    atiAnalyticsProducerId: '3',
    chartbeatDomain: 'afrique.bbc.co.uk',
    brandName: 'BBC News Afrique',
    product: 'BBC News',
    serviceLocalizedName: 'Afrique',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/afrique.png',
    defaultImageAltText: 'BBC News Afrique',
    dir: `ltr`,
    externalLinkText: ', externe',
    imageCaptionOffscreenText: 'Légende image, ',
    videoCaptionOffscreenText: 'Légende vidéo, ',
    audioCaptionOffscreenText: 'Légende audio, ',
    defaultCaptionOffscreenText: 'Légende, ',
    imageCopyrightOffscreenText: 'Crédit photo, ',
    locale: `fr`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'fr',
    datetimeLocale: `fr`,
    service: 'afrique',
    serviceName: 'Afrique',
    languageName: 'French',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcafrique',
    twitterSite: '@bbcafrique',
    noBylinesPolicy:
      'https://www.bbc.com/afrique/institutionelles-49283281#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/afrique/institutionelles-49283281',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Accueil',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    mostRead: {
      header: 'Les plus lus',
      lastUpdated: 'Dernière mise à jour:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Les plus vus',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Journaux et Magazines',
      durationLabel: 'Durée %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/afrique/institutionelles-49283281',
        text: 'Pourquoi vous pouvez faire confiance à BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Découvrez notre approche en matière de liens externes.',
      },
      links: [
        {
          href: 'https://www.bbc.com/afrique/institutionelles-36826639',
          text: "Conditions d'utilisation",
        },
        {
          href: 'https://www.bbc.com/afrique/institutionelles-36826641',
          text: 'A propos de la BBC',
        },
        {
          href: 'https://www.bbc.com/afrique/institutionelles-36826642',
          text: 'Politique de confidentialité',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/afrique/send/u50853159',
          text: 'Contactez la BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. La BBC n'est pas responsable du contenu des sites externes.",
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Accueil',
        url: '/afrique',
      },
      {
        title: 'Afrique',
        url: '/afrique/topics/cvqxn2k7kv7t',
      },
      {
        title: 'Monde',
        url: '/afrique/topics/cvqxn21vx11t',
      },
      {
        title: 'Santé',
        url: '/afrique/topics/c06gq9jxz3rt',
      },
      {
        title: 'Bien-être',
        url: '/afrique/topics/c0vmyy90q8zt',
      },
      {
        title: 'Science',
        url: '/afrique/topics/cdr561vr57gt',
      },
      {
        title: 'Technologie',
        url: '/afrique/topics/cnq687nn703t',
      },
      {
        title: 'Economie',
        url: '/afrique/topics/cnq687nr9v1t',
      },
      {
        title: 'Culture',
        url: '/afrique/topics/cnq687nrrw8t',
      },
      {
        title: 'Vidéos',
        url: '/afrique/media/video',
      },
      {
        title: 'Nos émissions',
        url: '/afrique/media-54074891',
      },
      {
        title: 'Ecoutez en direct',
        url: '/afrique/bbc_afrique_radio/liveradio',
      },
    ],
  },
};

export default withContext(service);
