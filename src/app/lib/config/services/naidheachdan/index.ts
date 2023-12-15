import latinWithDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../../contexts/utils/withContext';
import 'moment/locale/gd';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `gd`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Ùraichte',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-naidheachdan',
    atiAnalyticsProducerId: '79',
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC Naidheachdan',
    product: 'BBC News',
    serviceLocalizedName: 'Naidheachdan',
    defaultImage:
      'https://www.bbc.co.uk/news/special/2015/newsspec_11063/naidheachdan_1024x576.png',
    defaultImageAltText: 'BBC Naidheachdan',
    dir: `ltr`,
    externalLinkText: ', taobh a-muigh',
    imageCaptionOffscreenText: 'Tiotal an deilbh, ',
    videoCaptionOffscreenText: "Tiotal a' bhidio, ",
    audioCaptionOffscreenText: 'Tiotal na fuaime',
    defaultCaptionOffscreenText: 'Fo-thiotal, ',
    imageCopyrightOffscreenText: 'Tùs an deilbh, ',
    locale: `gd`,
    datetimeLocale: `gd`,
    service: 'naidheachdan',
    serviceName: 'Naidheachdan',
    languageName: 'Scottish Gaelic',
    twitterCreator: '@bbcnaidheachdan',
    twitterSite: '@bbcnaidheachdan',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/articles/manifest.json',
    frontPageTitle: 'Dachaigh',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'As motha leughte',
      lastUpdated: 'Air ùrachadh mu dheireadh:',
      numberOfItems: 5,
      hasMostRead: false,
    },
    mostWatched: {
      header: 'As motha leughte',
      numberOfItems: 10,
      hasMostWatched: false,
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
        text: 'Carson as urrainear earbsa a chur sa BhBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Leugh mun fheallsanachd againn mu cheangaileachan dhan taobh a-muigh',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Teirmean Cleachdaidh',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'Mun BhBC',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Poileasaidh Prìobhaideachd',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Dàta-brabhsair',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Cuir fios dhan BhBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. Chan eil am BBC an urra ris na tha a' nochdadh air làraichean-lìn air an taobh a-muigh",
    },
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Alba',
        url: '/naidheachdan',
      },
      {
        title: 'Scotland News',
        url: '/news/scotland',
      },
    ],
  },
};

export default withContext(service);
