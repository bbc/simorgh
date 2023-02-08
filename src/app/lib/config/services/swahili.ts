import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Africa/Nairobi';
import '#psammead/psammead-locales/moment/sw';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `sw`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Imeboreshwa',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-swahili',
    atiAnalyticsProducerId: '86',
    chartbeatDomain: 'swahili.bbc.co.uk',
    brandName: 'BBC News Swahili',
    product: 'BBC News',
    serviceLocalizedName: 'Swahili',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/swahili.png',
    defaultImageAltText: 'BBC News Swahili',
    dir: `ltr`,
    externalLinkText: ', ya nje',
    imageCaptionOffscreenText: 'Maelezo ya picha, ',
    videoCaptionOffscreenText: 'Maelezo ya video, ',
    audioCaptionOffscreenText: 'Maelezo ya sauti, ',
    defaultCaptionOffscreenText: 'Maelezo, ',
    imageCopyrightOffscreenText: 'Chanzo cha picha, ',
    locale: `sw-KE`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'sw',
    datetimeLocale: `sw`,
    service: 'swahili',
    serviceName: 'Swahili',
    languageName: 'Swahili',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcswahili',
    twitterSite: '@bbcswahili',
    noBylinesPolicy:
      'https://www.bbc.com/swahili/taasisi-49283417#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/swahili/taasisi-49283417',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Swahili',
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
      header: 'Iliyosomwa zaidi',
      lastUpdated: 'Imeboreshwa mwisho:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Iliyoangaliwa zaidi',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Vipindi vya Redio',
      durationLabel: 'Muda %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/swahili/taasisi-49283417',
        text: 'Kwanini unaweza kuiamini BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Soma kuhusu mtazamo wetu wa viambatanishi vya nje.',
      },
      links: [
        {
          href: 'https://www.bbc.com/swahili/taasisi-37098622',
          text: 'Sheria ya matumizi',
        },
        {
          href: 'https://www.bbc.com/swahili/taasisi-37100009',
          text: 'Kuhusu BBC',
        },
        {
          href: 'https://www.bbc.com/swahili/taasisi-37100010',
          text: 'Sera ya faragha',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/swahili/send/u50853731',
          text: 'Wasiliana na BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC haihusiki na taarifa za kutoka mitandao ya nje.',
    },
    timezone: 'Africa/Nairobi',
    navigation: [
      {
        title: 'Habari',
        url: '/swahili',
      },
      {
        title: 'Michezo',
        url: '/swahili/topics/ckdxndddjkxt',
      },
      {
        title: 'Video',
        url: '/swahili/media/video',
      },
      {
        title: 'Vipindi vya Redio',
        url: '/swahili/media-54071673',
      },
    ],
  },
};

export default withContext(service);
