import sinhalese from '../../../../components/ThemeProvider/fontScripts/sinhalese';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/si';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `si`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'යාවත්කාලීනවී ඇත',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-sinhala',
    atiAnalyticsProducerId: '82',
    chartbeatDomain: 'sinhala.bbc.co.uk',
    brandName: 'BBC News සිංහල',
    product: 'BBC News',
    serviceLocalizedName: 'සිංහල',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/sinhala.png',
    defaultImageAltText: 'BBC News සිංහල',
    dir: `ltr`,
    externalLinkText: ', බාහිර',
    imageCaptionOffscreenText: 'ඡායාරූප ශීර්ෂ වැකිය, ',
    videoCaptionOffscreenText: 'වීඩියෝ ශීර්ෂ වැකිය, ',
    audioCaptionOffscreenText: 'හඬ ශීර්ෂ වැකිය, ',
    defaultCaptionOffscreenText: 'ශීර්ෂ වැකිය, ',
    imageCopyrightOffscreenText: 'ඡායාරූප මූලාශ්‍රය, ',
    locale: `si-LK`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'si',
    datetimeLocale: `si`,
    service: 'sinhala',
    serviceName: 'Sinhala',
    languageName: 'Sinhala',
    twitterCreator: '@bbcsinhala',
    twitterSite: '@bbcsinhala',
    noBylinesPolicy:
      'https://www.bbc.com/sinhala/institutional-50288553#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/sinhala/institutional-50288553',
    isTrustProjectParticipant: true,
    script: sinhalese,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'මුල් පිටුව',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'වැඩිපුරම කියැවූ',
      lastUpdated: 'අවසන් යාවත්කාලීනවීම:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'වැඩියෙන්ම නැරඹූ',
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
        href: 'https://www.bbc.com/sinhala/institutional-50288553',
        text: 'ඔබට බීබීසී විශ්වාස කළ හැක්කේ ඇයි',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'බාහිර යොමු කෙරෙහි අපගේ ප්‍රවේශය ගැන කියවන්න.',
      },
      links: [
        {
          href: 'https://www.bbc.com/sinhala/institutional-36017568',
          text: 'භාවිතයේ කොන්දේසි',
        },
        {
          href: 'https://www.bbc.com/sinhala/institutional-36019591',
          text: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'කුකීස්',
        },
        {
          href: 'https://www.bbc.co.uk/sinhala/send/u50853687',
          text: 'බීබීසී ය අමතන්න',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. බාහිර වෙබ් අඩවිවල අන්තර්ගතයට බීබීසී වගකියනු නොලැබේ.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'මුල් පිටුව',
        url: '/sinhala',
      },
      {
        title: 'ශ්‍රී ලංකා',
        url: '/sinhala/topics/cg7267dz901t',
      },
      {
        title: 'ලෝකය',
        url: '/sinhala/topics/c83plvepnq1t',
      },
      {
        title: 'වීඩියෝ',
        url: '/sinhala/topics/crldzm9n2lnt',
      },
      {
        title: 'කලා',
        url: '/sinhala/topics/c7zp5zxk8jxt',
      },
    ],
  },
};

export default withContext(service);
