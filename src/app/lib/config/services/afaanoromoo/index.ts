import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Africa/Addis_Ababa';
import '#psammead/psammead-locales/moment/om';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `om`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Haaromsameera',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-afaanoromoo',
    atiAnalyticsProducerId: '2',
    chartbeatDomain: 'afaanoromoo.bbc.co.uk',
    brandName: 'BBC News Afaan Oromoo',
    product: 'BBC News',
    serviceLocalizedName: 'Afaan Oromoo',
    defaultImage:
      'https://news.files.bbci.co.uk/ws/img/logos/og/afaanoromoo.png',
    defaultImageAltText: 'BBC News Afaan Oromoo',
    dir: `ltr`,
    externalLinkText: ' alaan',
    imageCaptionOffscreenText: "Ibsa waa'ee suuraa, ",
    videoCaptionOffscreenText: "Ibsa waa'ee viidiyoo, ",
    audioCaptionOffscreenText: "Ibsa wa'ee raadiyoo, ",
    defaultCaptionOffscreenText: 'Ibsa suuraa/viidiyoo, ',
    imageCopyrightOffscreenText: 'Madda suuraa, ',
    locale: `om-ET`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'om',
    datetimeLocale: `om`,
    service: 'afaanoromoo',
    serviceName: 'Afaan Oromoo',
    languageName: 'Oromo',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy:
      'https://www.bbc.com/afaanoromoo/institutional-49281861#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/afaanoromoo/institutional-49281861',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Oduu',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: "Baay'ee kan dubbifame",
      lastUpdated: 'Yeroo dhuma kan haaromfame:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Hedduu kan ilaalaman',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Dhaggeeffadhaa',
      durationLabel: 'Turtii %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/afaanoromoo/institutional-49281861',
        text: 'BBC News maaliif amanuu dandeessa',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Gara geessituu alaatti akkaataa itti hojjennu dubbisi.',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'Haala itti fayyadamaa',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: "Waa'ee BBC",
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'Imaammata mateenyaa',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Kuus-yaadannoo',
        },
        {
          href: 'https://www.bbc.co.uk/afaanoromoo/send/u50777768',
          text: 'BBC qunnami',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. Qabiyyeewwan maddawwan alaa irraa ta'aniif BBCn itti gaafatamaa miti.",
    },
    navigation: [
      {
        title: 'Oduu',
        url: '/afaanoromoo',
      },
      {
        title: 'Itoophiyaa',
        url: '/afaanoromoo/topics/c2dwqdy81y1t',
      },
      {
        title: 'Viidiyoo',
        url: '/afaanoromoo/topics/ck0dg7dpjwwt',
      },
      {
        title: 'Jajjaboo',
        url: '/afaanoromoo/popular/read',
      },
    ],
    timezone: 'Africa/Addis_Ababa',
    liveRadioOverrides: {
      masterBrand: { bbc_oromo_radio: 'bbc_afaanoromoo_radio' },
    },
  },
};

export default withContext(service);
