import devanagari from '../../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import withContext from '../../../../contexts/utils/withContext';
import 'moment/locale/te';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `te`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'అప్‌డేట్ అయ్యింది',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-telugu',
    atiAnalyticsProducerId: '89',
    chartbeatDomain: 'telugu.bbc.co.uk',
    brandName: 'BBC News తెలుగు',
    product: 'BBC News',
    serviceLocalizedName: 'తెలుగు',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/telugu.png',
    defaultImageAltText: 'BBC News తెలుగు',
    dir: `ltr`,
    externalLinkText: ', ఇతర',
    imageCaptionOffscreenText: 'ఫొటో క్యాప్షన్, ',
    videoCaptionOffscreenText: 'వీడియో క్యాప్షన్, ',
    audioCaptionOffscreenText: 'ఆడియో క్యాప్షన్, ',
    defaultCaptionOffscreenText: 'క్యాప్షన్, ',
    imageCopyrightOffscreenText: 'ఫొటో సోర్స్, ',
    locale: `te-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'te',
    datetimeLocale: `te-in`,
    service: 'telugu',
    serviceName: 'Telugu',
    languageName: 'Telugu',
    twitterCreator: '@bbcnewstelugu',
    twitterSite: '@bbcnewstelugu',
    noBylinesPolicy:
      'https://www.bbc.com/telugu/institutional-50420343#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/telugu/institutional-50420343',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'వార్తలు',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'ఎక్కువమంది చదివినవి',
      lastUpdated: 'చివరిగా అప్‌డేట్ అయిన తేదీ:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'ఎక్కువగా చూసినవి',
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
        href: 'https://www.bbc.com/telugu/institutional-50420343',
        text: 'మీరు బీబీసీని ఎందుకు నమ్ముతారు?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'ఇతర వెబ్‌సైట్లకు మా లింకింగ్ విధానం గురించి తెలుసుకోండి.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'వినియోగ నిబంధనలు',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc/',
          text: 'బీబీసీ గురించి',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'ప్రైవసీ పాలసీ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'కుకీలు',
        },
        {
          href: 'https://www.bbc.co.uk/telugu/send/u50853775',
          text: 'BBCని సంప్రదించండి',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        ' BBC. ఇతర వెబ్‌సైట్లలో సమాచారానికి బీబీసీ బాధ్యత వహించదు.',
    },
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'వార్తలు',
        url: '/telugu',
      },
      {
        title: 'వీడియో',
        url: '/telugu/topics/cl29j0e3e2dt',
      },
      {
        title: 'ఎక్కువ మంది చదివినవి',
        url: '/telugu/popular/read',
      },
      {
        title: 'జాతీయం',
        url: '/telugu/topics/c5qvp16w7dnt',
      },
      {
        title: 'అంతర్జాతీయం',
        url: '/telugu/topics/cvqxn2k1xvdt',
      },
    ],
  },
};

export default withContext(service);
