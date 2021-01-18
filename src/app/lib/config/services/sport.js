import {
  C_SPORT_YELLOW,
  C_MIDNIGHT,
  C_SPORT_YELLOW_30,
  C_BLACK,
} from '@bbc/psammead-styles/colours';
import { sport as brandSVG } from '@bbc/psammead-assets/svgs';
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
    script: cyrillicAndLatin,
    manifestPath: '/articles/manifest.json',
    frontPageTitle: 'Home',
    theming: {
      brandBackgroundColour: `${C_SPORT_YELLOW}`,
      brandLogoColour: `${C_BLACK}`,
      brandForegroundColour: `${C_MIDNIGHT}`,
      brandBorderColour: `${C_SPORT_YELLOW_30}`,
      brandHighlightColour: `${C_BLACK}`,
    },
    translations: {
      ads: {
        advertisementLabel: 'Advertisement',
      },
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
          callToActionLinkText: 'BBC Sport homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/sport',
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
          callToActionLinkText: 'BBC Sport homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/sport',
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
        nextLabel: 'NEXT',
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
