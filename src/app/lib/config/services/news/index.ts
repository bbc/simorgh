import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news',
    atiAnalyticsProducerId: '64',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC News',
    product: 'BBC News',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'news',
    serviceName: 'News',
    languageName: 'English',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/articles/manifest.json',
    frontPageTitle: 'Home',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: true,
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
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
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
          href: '#',
          text: 'Do not share or sell my info',
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
        url: '/news',
      },
      {
        title: 'UK',
        url: '/news/uk',
      },
      {
        title: 'World',
        url: '/news/world',
      },
      {
        title: 'Business',
        url: '/news/business',
      },
      {
        title: 'Politics',
        url: '/news/politics',
      },
      {
        title: 'Tech',
        url: '/news/technology',
      },
      {
        title: 'Science',
        url: '/news/science_and_environment',
      },
      {
        title: 'Health',
        url: '/news/health',
      },
      {
        title: 'Family & Education',
        url: '/news/education',
      },
      {
        title: 'Entertainment & Arts',
        url: '/news/entertainment_and_arts',
      },
      {
        title: 'Stories',
        url: '/news/stories',
      },
    ],
  },
};

export default withContext(service);
