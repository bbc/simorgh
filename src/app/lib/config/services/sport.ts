import {
  C_SPORT_YELLOW,
  C_MIDNIGHT_BLACK,
  C_SPORT_YELLOW_30,
  C_BLACK,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/BBCSport`,
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'sport',
    atiAnalyticsProducerId: '85',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC Sport',
    product: 'BBC Sport',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC Sport',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'sport',
    serviceName: 'Sport',
    languageName: 'English',
    themeColor: `${C_SPORT_YELLOW}`,
    twitterCreator: '@BBCSport',
    twitterSite: '@BBCSport',
    isTrustProjectParticipant: false,
    script: latin,
    manifestPath: '/articles/manifest.json',
    frontPageTitle: 'Home',
    theming: {
      brandBackgroundColour: `${C_SPORT_YELLOW}`,
      brandLogoColour: `${C_BLACK}`,
      brandForegroundColour: `${C_MIDNIGHT_BLACK}`,
      brandBorderColour: `${C_SPORT_YELLOW_30}`,
      brandHighlightColour: `${C_BLACK}`,
    },
    showAdPlaceholder: false,
    showRelatedTopics: false,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: false,
    },
    mostWatched: {
      header: 'Most watched',
      numberOfItems: 10,
      hasMostWatched: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Terms of Use',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc/',
          text: 'About the BBC',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/accessibility/',
          text: 'Accessibility Help',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. The BBC is not responsible for the content of external sites.',
    },
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Home',
        url: '/sport',
      },
      {
        title: 'Football',
        url: '/sport/football',
      },
      {
        title: 'Formula 1',
        url: '/sport/formula1',
      },
      {
        title: 'Cricket',
        url: '/sport/cricket',
      },
      {
        title: 'Rugby U',
        url: '/sport/rugby-union',
      },
      {
        title: 'Rugby L',
        url: '/sport/rugby-league',
      },
      {
        title: 'Tennis',
        url: '/sport/tennis',
      },
      {
        title: 'Golf',
        url: '/sport/golf',
      },
      {
        title: 'Athletics',
        url: '/sport/athletics',
      },
    ],
  },
};

export default withContext(service);
