import {
  C_NEWSROUND_PURPLE,
  C_WHITE,
  C_NEWSROUND_PURPLE_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';
import { Services } from '../../../models/types/global';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `hhttps://www.facebook.com/cbbc/`,
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'newsround',
    atiAnalyticsProducerId: '65',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'CBBC Newsround',
    product: 'CBBC Newsround',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/newsround/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'CBBC Newsround',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'newsround' as Services,
    serviceName: 'Newsround',
    languageName: 'English',
    themeColor: `${C_NEWSROUND_PURPLE}`,
    twitterCreator: '@BBCNewsround',
    twitterSite: '@BBCNewsround',
    isTrustProjectParticipant: false,
    script: latin,
    manifestPath: '/articles/manifest.json',
    frontPageTitle: 'Home',
    theming: {
      brandBackgroundColour: `${C_NEWSROUND_PURPLE}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_WHITE}`,
      brandBorderColour: `${C_NEWSROUND_PURPLE_30}`,
      brandHighlightColour: `${C_WHITE}`,
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
          href: 'https://www.bbc.co.uk/guidance',
          text: 'Parental Guidance',
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
    navigation: [],
  },
};

export default withContext(service);
