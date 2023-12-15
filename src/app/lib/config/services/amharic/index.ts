import noAscendersOrDescenders from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/Africa/Addis_Ababa';
import '#psammead/psammead-locales/moment/am';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `am`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ተሻሽሏል',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-amharic',
    atiAnalyticsProducerId: '4',
    chartbeatDomain: 'amharic.bbc.co.uk',
    brandName: 'BBC News አማርኛ',
    product: 'BBC News',
    serviceLocalizedName: 'አማርኛ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
    defaultImageAltText: 'BBC News አማርኛ',
    dir: `ltr`,
    externalLinkText: ', ውጫዊ',
    imageCaptionOffscreenText: 'የምስሉ መግለጫ, ',
    videoCaptionOffscreenText: 'የተንቀሳቃሹ ምስል መግለጫ, ',
    audioCaptionOffscreenText: 'የድምፅ መግለጫ, ',
    defaultCaptionOffscreenText: 'መግለጫ, ',
    imageCopyrightOffscreenText: 'የፎቶው ባለመብት, ',
    locale: `am-ET`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'am',
    datetimeLocale: 'am',
    service: 'amharic',
    serviceName: 'Amharic',
    languageName: 'Amharic',
    twitterCreator: '@bbcnews',
    twitterSite: '@bbcnews',
    noBylinesPolicy:
      'https://www.bbc.com/amharic/institutional-49283133#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/amharic/institutional-49283133',
    isTrustProjectParticipant: true,
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ዜና',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'ብዙ የተነበቡ',
      lastUpdated: 'በመጨረሻ ማሻሻያ የተደረገበት',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'በብዛት የታዩ',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'ያድምጡ',
      durationLabel: 'ርዝመት %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/amharic/institutional-49283133',
        text: 'ቢቢሲን ለምን ማመን እንደሚገባዎ',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'ስለ ውጪ ሊንኮች ያለን አቀራረብ',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'የአጠቃቀም ደንብ',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'ስለ ቢቢሲ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'የፕራይቬሲ ፖሊሲ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ኩኪዎች',
        },
        {
          href: 'https://www.bbc.co.uk/amharic/send/u50853181',
          text: 'ቢቢሲን ያግኙ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም.',
    },
    navigation: [
      {
        title: 'ዜና',
        url: '/amharic',
      },
      {
        title: 'ኢትዮጵያ',
        url: '/amharic/topics/c7zp57r92v5t',
      },
      {
        title: 'ቪዲዮ',
        url: '/amharic/topics/c917ezk2pmvt',
      },
      {
        title: 'በጣም የተወደዱ',
        url: '/amharic/popular/read',
      },
    ],
    timezone: 'Africa/Addis_Ababa',
  },
};

export default withContext(service);
