import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news',
    atiAnalyticsProducerId: '64',
    atiAnalyticsProducerName: 'NEWS',
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
    manifestPath:
      'https://static.files.bbci.co.uk/core/manifest.1ccdbcfd4cc3bf889128a50903c2b22c81758637.json',
    homePageTitle: 'Home',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      ads: {
        advertisementLabel: 'Advertisement',
      },
      home: 'Home',
      currentPage: 'Current page',
      skipLinkText: 'Skip to content',
      relatedContent: 'Related content',
      relatedTopics: 'Related topics',
      navMenuText: 'Sections',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Live',
        liveCoverage: 'Live Coverage',
        breaking: 'Breaking',
        postedAt: 'Posted at',
        summary: 'Summary',
        shareButtonText: 'Share',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'At a glance',
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
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Accept data collection and continue',
            reject: 'Reject data collection and continue',
            initial: {
              title: 'Let us know you agree to data collection on AMP',
              description: {
                first: 'We and our partners use technologies, such as ',
                linkText: 'cookies',
                last: ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Manage my settings',
            },
            manage: {
              title: 'Manage consent settings on AMP pages',
              description: {
                para1:
                  'These settings apply to AMP pages only. You may be asked to set these preferences again when you visit non-AMP BBC pages.',
                para2:
                  'The lightweight mobile page you have visited has been built using Google AMP technology.',
                heading2: 'Strictly necessary data collection',
                para3:
                  'To make our web pages work, we store some limited information on your device without your consent.',
                para4: {
                  text: 'Read more about the essential information we store on your device to make our web pages work.',
                  url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'We use local storage to store your consent preferences on your device.',
                heading3: 'Optional data collection',
                para6:
                  'When you consent to data collection on AMP pages you are consenting to allow us to display personalised ads that are relevant to you when you are outside of the UK.',
                para7: {
                  text: 'Read more about how we personalise ads in the BBC and our advertising partners.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'You can choose not to receive personalised ads by clicking “Reject data collection and continue” below. Please note that you will still see advertising, but it will not be personalised to you.',
                para9:
                  'You can change these settings by clicking “Ad Choices / Do not sell my info” in the footer at any time.',
              },
            },
          },
          canonical: {
            title: 'Let us know you agree to cookies',
            description: {
              uk: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
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
      },
      media: {
        noJs: 'To play this content, please enable JavaScript, or try a different browser',
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
      socialEmbed: {},
      featuresAnalysisTitle: 'More to explore',
    },
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: true,
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
