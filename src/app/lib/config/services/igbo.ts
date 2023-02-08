import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/ig';
import '#psammead/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ig',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Mgbe ikpeazụ e tinyere ya ozi ọhụrụ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-igbo',
    atiAnalyticsProducerId: '53',
    chartbeatDomain: 'igbo.bbc.co.uk',
    brandName: 'BBC News Ìgbò',
    product: 'BBC News',
    serviceLocalizedName: 'Ìgbò',
    locale: 'ig',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ig',
    datetimeLocale: 'ig',
    service: 'igbo',
    serviceName: 'Igbo',
    languageName: 'Igbo',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
    defaultImageAltText: 'BBC News Ìgbò',
    dir: 'ltr',
    externalLinkText: ', na mpụta',
    imageCaptionOffscreenText: 'Nkọwa foto, ',
    videoCaptionOffscreenText: 'Aha onyonyo, ',
    audioCaptionOffscreenText: 'Aha nkeananụānụ, ',
    defaultCaptionOffscreenText: 'Ihe a na-akpọ ya, ',
    imageCopyrightOffscreenText: 'Ebe foto si, ',
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Ogbako',
    noBylinesPolicy:
      'https://www.bbc.com/igbo/institutional-48529074#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/igbo/institutional-48529074',
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
      header: 'Akachasị Gụọ',
      lastUpdated: 'Emelitere ikpeazụ na:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Elelere',
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
        title: 'Akụkọ',
        url: '/igbo',
      },
      {
        title: 'Egwuregwu',
        url: '/igbo/topics/cnq68k0x2vrt',
      },
      {
        title: 'Ihe nkiri',
        url: '/igbo/media/video',
      },
      {
        title: 'Nke ka ewuewu',
        url: '/igbo/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/igbo/institutional-48529074',
        text: 'Ihe mere ị ga-eji nwee ntụkwasiobi na BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Usoro anyị maka njikọ dị na mpụga.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms',
          text: 'Usoro Ojiji',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'Gbasara BBC',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'Iwu Nzuzo',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Kuki',
        },
        {
          href: 'https://www.bbc.co.uk/igbo/send/u50853379',
          text: 'Kpọtụrụ BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC anaghị ahụta maka ọdịnaya nke saịtị ndị dị na mpụga.',
    },
    timezone: 'Africa/Lagos',
  },
};

export default withContext(service);
