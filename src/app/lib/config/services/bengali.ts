import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import bengali from '../../../components/ThemeProvider/fontScripts/bengali';
import '#psammead/moment-timezone-include/tz/Asia/Dhaka';
import '#psammead/psammead-locales/moment/bn';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `bn`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'আপডেট হয়েছে',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-bengali',
    atiAnalyticsProducerId: '31',
    chartbeatDomain: 'bengali.bbc.co.uk',
    brandName: 'BBC News বাংলা',
    product: 'BBC News',
    serviceLocalizedName: 'বাংলা',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/bengali.png',
    defaultImageAltText: 'BBC News বাংলা',
    dir: `ltr`,
    externalLinkText: ', বাইরের',
    imageCaptionOffscreenText: 'ছবির ক্যাপশান, ',
    videoCaptionOffscreenText: 'ভিডিওর ক্যাপশান, ',
    audioCaptionOffscreenText: 'অডিওর ক্যাপশান, ',
    defaultCaptionOffscreenText: 'ক্যাপশান, ',
    imageCopyrightOffscreenText: 'ছবির উৎস, ',
    locale: `bn-BD`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'bn',
    datetimeLocale: `bn`,
    service: 'bengali',
    serviceName: 'Bengali',
    languageName: 'Bengali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcbangla',
    twitterSite: '@bbcbangla',
    noBylinesPolicy:
      'https://www.bbc.com/bengali/institutional-50409861#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/bengali/institutional-50409861',
    isTrustProjectParticipant: true,
    script: bengali,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'খবর, সর্বশেষ খবর, ব্রেকিং নিউজ | News, latest news, breaking news',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    mostRead: {
      header: 'সর্বাধিক পঠিত',
      lastUpdated: 'সর্বশেষ আপডেট হয়েছে:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'সবচেয়ে বেশি দেখা হয়েছে',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'রেডিও অনুষ্ঠান',
      durationLabel: 'স্থিতিকাল %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/bengali/institutional-50409861',
        text: 'বিবিসির ওপর কেন আপনি আস্থা রাখতে পারেন',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'বাইরের লিংক সম্পর্কে বিবিসির দৃষ্টিভঙ্গি সম্বন্ধে পড়ুন।',
      },
      links: [
        {
          href: 'https://www.bbc.com/bengali/institutional-37289190',
          text: 'ব্যবহারের শর্তাবলী',
        },
        {
          href: 'https://www.bbc.com/bengali/institutional-37289764',
          text: 'বিবিসি সম্পর্কে',
        },
        {
          href: 'https://www.bbc.com/bengali/institutional-37289766',
          text: 'প্রিভেসি নীতি',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'কুকিজ',
        },
        {
          href: 'https://www.bbc.co.uk/bengali/send/u50853247',
          text: 'বিবিসির সাথে যোগাযোগ করুন',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'বিবিসি। বাইরের কোন সাইটের তথ্যের জন্য বিবিসি দায়বদ্ধ নয়।',
    },
    timezone: 'Asia/Dhaka',
    navigation: [
      {
        title: 'মূলপাতা',
        url: '/bengali',
      },
      {
        title: 'ভিডিও',
        url: '/bengali/topics/cxy7jg418e7t',
      },
    ],
  },
};

export default withContext(service);
