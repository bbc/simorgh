import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/pcm';
import '#psammead/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'pcm',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'New Informate',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-pidgin',
    atiAnalyticsProducerId: '70',
    chartbeatDomain: 'pidgin.bbc.co.uk',
    brandName: 'BBC News Pidgin',
    product: 'BBC News',
    serviceLocalizedName: 'Pidgin',
    locale: 'pcm',
    // there is no valid ISO 639-1 code for Pidgin
    isoLang: null,
    datetimeLocale: 'pcm',
    service: 'pidgin',
    serviceName: 'Pidgin',
    languageName: 'Nigerian Pidgin',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
    defaultImageAltText: 'BBC News Pidgin',
    dir: 'ltr',
    externalLinkText: ', outside',
    imageCaptionOffscreenText: 'Wetin we call dis foto, ',
    videoCaptionOffscreenText: 'Wetin we call dis Video, ',
    audioCaptionOffscreenText: 'Wetin we call dis Audio, ',
    defaultCaptionOffscreenText: 'Wetin we call am, ',
    imageCopyrightOffscreenText: 'Wia dis foto come from, ',
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Domot',
    noBylinesPolicy:
      'https://www.bbc.com/pidgin/institutional-48528766#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/pidgin/institutional-48528766',
    isTrustProjectParticipant: true,
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: false,
    showRelatedTopics: true,
    mostRead: {
      header: 'De one we dem de read well well',
      lastUpdated: 'De one we dem update for:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'De one we dem don look',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: 'Home',
        url: '/pidgin',
      },
      {
        title: 'Nigeria',
        url: '/pidgin/topics/c2dwqd1zr92t',
      },
      {
        title: 'Africa',
        url: '/pidgin/topics/c404v061z85t',
      },
      {
        title: 'World',
        url: '/pidgin/topics/c0823e52dd0t',
      },
      {
        title: 'Video',
        url: '/pidgin/media/video',
      },
      {
        title: 'Sport',
        url: '/pidgin/topics/cjgn7gv77vrt',
      },
      {
        title: 'Entertainment',
        url: '/pidgin/topics/cqywjyzk2vyt',
      },
      {
        title: 'Most popular',
        url: '/pidgin/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/pidgin/institutional-48528766',
        text: 'Why you fit trust BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'De way wey we de take go external link.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: 'How dem dey take use am',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'As e concern BBC',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/pidgin/send/u50853577',
          text: 'Call BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. De external site no concern BBC.',
    },
    timezone: 'Africa/Lagos',
  },
};

export default withContext(service);
