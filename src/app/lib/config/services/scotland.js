import { C_DARK_SALTIRE, C_WHITE } from '@bbc/psammead-styles/colours';
import { scotland as brandSVG } from '@bbc/psammead-assets/svgs';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import {
  F_REITH_SANS_BOLD,
  F_REITH_SANS_BOLD_ITALIC,
  F_REITH_SANS_ITALIC,
  F_REITH_SANS_REGULAR,
  F_REITH_SERIF_MEDIUM,
  F_REITH_SERIF_MEDIUM_ITALIC,
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
    articleAuthor: `https://www.facebook.com/bbcscotland`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'scotland',
    atiAnalyticsProducerId: '79',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC Scotland',
    product: 'BBC Scotland',
    defaultImage:
      'https://news.files.bbci.co.uk/include/articles/public/scotland/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC Scotland',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'scotland',
    serviceName: 'Scotland',
    themeColor: `${C_DARK_SALTIRE}`,
    twitterCreator: '@BBCScotland',
    twitterSite: '@BBCScotland',
    noBylinesPolicy: null,
    publishingPrinciples: null,
    isTrustProjectParticipant: false,
    script: cyrillicAndLatin,
    manifestPath: '/articles/manifest.json',
    swPath: '/articles/sw.js',
    frontPageTitle: 'Home',
    passportHomes: ['BBCScotland'],
    theming: {
      brandBackgroundColour: `${C_DARK_SALTIRE}`,
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
          callToActionLinkText: 'BBC Scotland homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/scotland',
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
          callToActionLinkText: 'BBC Scotland homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/scotland',
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
      numberOfItems: 5,
      hasMostRead: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
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
    ],
    timezone: 'Europe/London',
  },
};

export default withContext(service);
