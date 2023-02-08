import latin from '../../../components/ThemeProvider/fontScripts/latin';
import {
  C_ARCHIVE_BLUE,
  C_WHITE,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/BBCArchive`,
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'archive',
    atiAnalyticsProducerId: '127',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC Archive',
    product: 'BBC Archive',
    defaultImage:
      'https://news.files.bbci.co.uk/include/articles/public/archive/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC Archive',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'archive',
    serviceName: 'Archive',
    languageName: 'English',
    themeColor: `${C_ARCHIVE_BLUE}`,
    twitterCreator: '@BBCArchive',
    twitterSite: '@BBCArchive',
    noBylinesPolicy: null,
    publishingPrinciples: null,
    isTrustProjectParticipant: false,
    script: latin,
    manifestPath: '/articles/manifest.json',
    swPath: '/articles/sw.js',
    frontPageTitle: 'Home',
    theming: {
      brandBackgroundColour: `${C_ARCHIVE_BLUE}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_WHITE}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_WHITE}`,
    },
    showAdPlaceholder: false,
    showRelatedTopics: true,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated:',
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
      ],
      copyrightText:
        'BBC. The BBC is not responsible for the content of external sites.',
    },
    timezone: 'Europe/London',
  },
};

export default withContext(service);
