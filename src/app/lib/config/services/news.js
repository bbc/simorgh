import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import {
  F_REITH_SANS_BOLD,
  F_REITH_SANS_BOLD_ITALIC,
  F_REITH_SANS_ITALIC,
  F_REITH_SANS_REGULAR,
  F_REITH_SERIF_MEDIUM,
  F_REITH_SERIF_MEDIUM_ITALIC,
  F_REITH_SERIF_LIGHT,
} from '@bbc/psammead-styles/fonts';
import '@bbc/psammead-locales/moment/en-gb';
import '@bbc/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news',
    atiAnalyticsProducerId: '64',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC News',
    product: 'BBC News',
    defaultImage:
      'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
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
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/articles/manifest.json',
    swPath: '/articles/sw.js',
    frontPageTitle: 'Home',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      home: 'Home',
      currentPage: 'Current page',
      skipLinkText: 'Skip to content',
      relatedContent: 'Related content',
      navMenuText: 'Sections',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Page cannot be found',
          message:
            "Sorry, we're unable to bring you the page you're looking for. Please try:",
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/news',
        },
        500: {
          statusCode: '500',
          title: 'Internal server error',
          message:
            "Sorry, we're currently unable to bring you the page you're looking for. Please try:",
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/news',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last:
                ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last:
                ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, take me to settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs:
          'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Audio',
        photogallery: 'Image gallery',
        video: 'Video',
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LIVE',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
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
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. The BBC is not responsible for the content of external sites.',
    },
    fonts: [
      F_REITH_SANS_BOLD,
      F_REITH_SANS_BOLD_ITALIC,
      F_REITH_SANS_ITALIC,
      F_REITH_SANS_REGULAR,
      F_REITH_SERIF_MEDIUM,
      F_REITH_SERIF_MEDIUM_ITALIC,
      F_REITH_SERIF_LIGHT,
    ],
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
      {
        title: 'Video & Audio',
        url: '/news/video_and_audio/headlines',
      },
    ],
  },
};

export default withContext(service);
