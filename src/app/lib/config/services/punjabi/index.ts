import gurmukhi from '../../../../components/ThemeProvider/fontScripts/gurmukhi';
import '#psammead/psammead-locales/moment/pa-in';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `pa`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ਅਪਡੇਟ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-punjabi',
    atiAnalyticsProducerId: '73',
    chartbeatDomain: 'punjabi.bbc.co.uk',
    brandName: 'BBC News ਪੰਜਾਬੀ',
    product: 'BBC News',
    serviceLocalizedName: 'ਪੰਜਾਬੀ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/punjabi.png',
    defaultImageAltText: 'BBC News ਪੰਜਾਬੀ',
    dir: `ltr`,
    externalLinkText: ', ਬਾਹਰੀ',
    imageCaptionOffscreenText: 'ਤਸਵੀਰ ਕੈਪਸ਼ਨ, ',
    videoCaptionOffscreenText: 'ਵੀਡੀਓ ਕੈਪਸ਼ਨ, ',
    audioCaptionOffscreenText: 'ਆਡੀਓ ਕੈਪਸ਼ਨ, ',
    defaultCaptionOffscreenText: 'ਕੈਪਸ਼ਨ, ',
    imageCopyrightOffscreenText: 'ਤਸਵੀਰ ਸਰੋਤ, ',
    locale: `pa-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'pa',
    datetimeLocale: `pa-in`,
    service: 'punjabi',
    serviceName: 'Punjabi',
    languageName: 'Punjabi',
    twitterCreator: '@bbcnewspunjabi',
    twitterSite: '@bbcnewspunjabi',
    noBylinesPolicy:
      'https://www.bbc.com/punjabi/institutional-49282853#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/punjabi/institutional-49282853',
    isTrustProjectParticipant: true,
    script: gurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ਨਿਊਜ਼',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'ਸਭ ਤੋਂ ਵੱਧ ਪੜ੍ਹਿਆ ਗਿਆ',
      lastUpdated: 'ਆਖ਼ਰੀ ਅਪਡੇਟ:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'ਸਭ ਤੋਂ ਵੱਧ ਦੇਖਿਆ',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: 'ਖ਼ਬਰਾਂ',
        url: '/punjabi',
      },
      {
        title: 'ਵੀਡੀਓ',
        url: '/punjabi/topics/cx12qmz6jm4t',
      },
      {
        title: 'ਪਾਠਕਾਂ ਦੀ ਪਸੰਦ',
        url: '/punjabi/popular/read',
      },
      {
        title: 'ਭਾਰਤ',
        url: '/punjabi/topics/cz74k76gjqxt',
      },
      {
        title: 'ਕੌਮਾਂਤਰੀ',
        url: '/punjabi/topics/c2lej05e43lt',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/punjabi/institutional-49282853',
        text: "ਤੁਸੀਂ ਬੀਬੀਸੀ 'ਤੇ ਕਿਉਂ ਵਿਸ਼ਵਾਸ਼ ਕਰ ਸਕਦੇ ਹੋ",
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'ਬਾਹਰੀ ਲਿੰਕਿੰਗ ਲਈ ਸਾਡੇ ਤਰੀਕੇ ਬਾਰੇ ਪੜ੍ਹੋ',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'ਵਰਤੋ ਦੀਆਂ ਸ਼ਰਤਾਂ',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'BBC ਬਾਰੇ',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'ਨਿੱਜਤਾ ਪਾਲਿਸੀ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ਕੁਕੀਜ਼',
        },
        {
          href: 'https://www.bbc.co.uk/punjabi/send/u50853621',
          text: 'ਬੀਬੀਸੀ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ਬਾਹਰੀ ਸਾਈਟਾਂ ਦੀ ਸਮਗਰੀ ਲਈ ਬੀਬੀਸੀ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ',
    },
    timezone: 'Asia/Kolkata',
  },
};

export default withContext(service);
