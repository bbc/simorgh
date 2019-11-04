import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { gujarati as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Kolkata';
import '@bbc/psammead-locales/moment/gu';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `gu`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-gujarati',
    atiAnalyticsProducerId: '50',
    brandName: 'BBC News ગુજરાતી',
    product: 'BBC News',
    serviceLocalizedName: 'ગુજરાતી',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/gujarati.png',
    defaultImageAltText: 'BBC News ગુજરાતી',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `gu-IN`,
    datetimeLocale: `gu`,
    service: 'gujarati',
    serviceName: 'Gujarati',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewsgujarati',
    twitterSite: '@bbcnewsgujarati',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'સમાચાર',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'સમાચાર',
      currentPage: 'Current page',
      skipLinkText: 'સામગ્રી પર જાઓ',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - Page not found',
          message:
            'વેબએડ્રેસ લખવામાં ભૂલ હોવાથી આમ થયું છે. કૃપા કરી વેબએડ્રેસ અને સ્પેલિંગ ચકાસો',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC સમાચાર હોમ પેજ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/gujarati',
        },
        500: {
          statusCode: '500',
          title: '500 - Error',
          message: 'Page error, પેજ રિફ્રેશ કરો',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC સમાચાર હોમ પેજ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/gujarati',
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
        audio: 'ઑડિયો',
        photogallery: 'છબી ગૅલેરી',
        video: 'વીડિયો',
        bbc_gujarati_tv: {
          title: 'સમાચાર',
          subtitle:
            'આંતરરાષ્ટ્રીય, પ્રાદેશિક ખબર અને વિશ્લેષણ માટે જુઓ બીબીસી ગુજરાતી સમાચાર.',
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
        'BBC. એક્સટર્નલ વેબસાઇટ્સનાં કન્ટેન્ટ માટે BBC જવાબદાર નથી',
    },
    fonts: [],
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'સમાચાર',
        url: '/gujarati',
      },
      {
        title: 'વીડિયો',
        url: '/gujarati/media/video',
      },
      {
        title: 'લોકપ્રિય',
        url: '/gujarati/popular/read',
      },
      {
        title: 'ભારત',
        url: '/gujarati/topics/5a08f030-710f-4168-acee-67294a90fc75',
      },
      {
        title: 'આંતરરાષ્ટ્રીય',
        url: '/gujarati/international',
      },
    ],
  },
};

export default withContext(service);
