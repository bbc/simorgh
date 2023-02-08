import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import '#psammead/psammead-locales/moment/gu';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `gu`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'અપડેટેડ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-gujarati',
    atiAnalyticsProducerId: '50',
    chartbeatDomain: 'gujarati.bbc.co.uk',
    brandName: 'BBC News ગુજરાતી',
    product: 'BBC News',
    serviceLocalizedName: 'ગુજરાતી',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/gujarati.png',
    defaultImageAltText: 'BBC News ગુજરાતી',
    dir: `ltr`,
    externalLinkText: ', બહારની',
    imageCaptionOffscreenText: 'ઇમેજ કૅપ્શન, ',
    videoCaptionOffscreenText: 'વીડિયો કૅપ્શન, ',
    audioCaptionOffscreenText: 'ઓડિયો કૅપ્શન, ',
    defaultCaptionOffscreenText: 'કૅપ્શન, ',
    imageCopyrightOffscreenText: 'ઇમેજ સ્રોત, ',
    locale: `gu-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'gu',
    datetimeLocale: `gu`,
    service: 'gujarati',
    serviceName: 'Gujarati',
    languageName: 'Gujarati',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewsgujarati',
    twitterSite: '@bbcnewsgujarati',
    noBylinesPolicy:
      'https://www.bbc.com/gujarati/institutional-50409883#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/gujarati/institutional-50409883',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'સમાચાર',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: false,
    showRelatedTopics: true,
    mostRead: {
      header: 'સૌથી વધારે વંચાયેલા સમાચાર',
      lastUpdated: 'લાસ્ટ અપડેટ:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'સૌથી વધુ જોવાયેલ',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/gujarati/institutional-50409883',
        text: 'બીબીસી વિશ્વાસપાત્ર કેમ?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'બહારની વેબસાઇટ્સની લિંક આપવા અંગેની અમારી નીતિ વિશે વાંચો',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'ઉપયોગની શરતો',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'બીબીસી વિશે',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'પ્રાઇવસી પૉલિસી',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'કુકીઝ',
        },
        {
          href: 'https://www.bbc.co.uk/gujarati/send/u50853313',
          text: 'BBC નો સંપર્ક કરો',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. બહારની વેબસાઇટ્સની સામગ્રી માટે બીબીસી જવાબદાર નથી.',
    },
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
        url: '/gujarati/topics/c06gq3993v3t',
      },
      {
        title: 'આંતરરાષ્ટ્રીય',
        url: '/gujarati/topics/c83plvezd90t',
      },
    ],
  },
};

export default withContext(service);
