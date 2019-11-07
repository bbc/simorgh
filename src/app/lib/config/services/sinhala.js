import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { sinhalese } from '@bbc/gel-foundations/scripts';
import { sinhala as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_ISKOOLA_POTA_BBC_BOLD,
  F_ISKOOLA_POTA_BBC_REGULAR,
} from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/si';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `si`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-sinhala',
    atiAnalyticsProducerId: '82',
    brandName: 'BBC News සිංහල',
    product: 'BBC News',
    serviceLocalizedName: 'සිංහල',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/sinhala.png',
    defaultImageAltText: 'BBC News සිංහල',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `si-LK`,
    datetimeLocale: `si`,
    service: 'sinhala',
    serviceName: 'Sinhala',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcsinhala',
    twitterSite: '@bbcsinhala',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: sinhalese,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'මුල් පිටුව',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'මුල් පිටුව',
      currentPage: 'Current page',
      skipLinkText: 'අන්තර්ගතයට පිවිසෙන්න',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - පිටුව සොයා ගත නොහැක',
          message:
            'ඔබ වෙබ් අඩවියේ නම වැරදියට සටහන් කළා විය හැකිය. කරුණාකර වෙබ් අඩවියේ නම යලිත් වරක් විමසන්න.',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'බීබීසී සිංහල මුල් පිටුව',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/sinhala',
        },
        500: {
          statusCode: '500',
          title: '500 - වරදක්',
          message:
            'කිසියම් වරදක් සිදු වී තිබේ. කරුණාකර පිටුව යාවත්කාලීන කරන්න.',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'බීබීසී සිංහල මුල් පිටුව',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/sinhala',
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
        audio: 'හඬපට',
        photogallery: 'සේයා රූ ගැලරිය',
        video: 'වීඩියෝ',
        bbc_sinhala_tv: {
          title: 'බීබීසී සිංහල සංදේශය',
          subtitle:
            'බීබීසී සිංහල ඔස්සේ ශ්‍රී ලාංකීය, දකුණු ආසියාතික සහ ජාත්‍යන්තර පුවත්, විශ්ලේෂණ සහ ක්‍රීඩා පුවත්',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
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
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
      ],
      copyrightText:
        'බීබීසී. වෙනත් අන්තර්ජාල අඩවිවල අන්තර්ගතය පිළිබඳව බීබීසීය වගකීමෙන් නොබැඳේ',
    },
    fonts: [F_ISKOOLA_POTA_BBC_BOLD, F_ISKOOLA_POTA_BBC_REGULAR],
    timezone: 'GMT',
    navigation: [
      {
        title: 'මුල් පිටුව',
        url: '/sinhala',
      },
      {
        title: 'ශ්‍රී ලංකා',
        url: '/sinhala/sri_lanka',
      },
      {
        title: 'ලෝකය',
        url: '/sinhala/world',
      },
      {
        title: 'ක්‍රීඩා',
        url: '/sinhala/sport',
      },
      {
        title: 'ලලනා',
        url: '/sinhala/topics/e45cb5f8-3c87-4ebd-ac1c-058e9be22862',
      },
      {
        title: 'යෞවන',
        url: '/sinhala/topics/f6ec89fd-3823-498e-a888-572e96f791b2',
      },
      {
        title: 'විද්‍යාව',
        url: '/sinhala/topics/0f469e6a-d4a6-46f2-b727-2bd039cb6b53',
      },
      {
        title: 'වීඩියෝ',
        url: '/sinhala/media/video',
      },
    ],
  },
};

export default withContext(service);
