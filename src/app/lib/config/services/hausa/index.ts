import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ha';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ha`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Wanda aka sabunta',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-hausa',
    atiAnalyticsProducerId: '51',
    chartbeatDomain: 'hausa.bbc.co.uk',
    brandName: 'BBC News Hausa',
    product: 'BBC News',
    serviceLocalizedName: 'Hausa',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hausa.png',
    defaultImageAltText: 'BBC News Hausa',
    dir: `ltr`,
    externalLinkText: ', waje',
    imageCaptionOffscreenText: 'Bayanan hoto, ',
    videoCaptionOffscreenText: 'Bayanan bidiyo, ',
    audioCaptionOffscreenText: 'Bayanan sauti',
    defaultCaptionOffscreenText: 'Bayani, ',
    imageCopyrightOffscreenText: 'Asalin hoton, ',
    locale: `ha-GH`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ha',
    datetimeLocale: `ha`,
    service: 'hausa',
    serviceName: 'Hausa',
    languageName: 'Hausa',
    twitterCreator: '@bbchausa',
    twitterSite: '@bbchausa',
    noBylinesPolicy:
      'https://www.bbc.com/hausa/game-da-mu-49283501#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/hausa/game-da-mu-49283501',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Labaran Duniya',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'Podcast',
      brandTitle: 'Korona: Ina Mafita?',
      brandDescription:
        'Shiri na musamman da sashen Hausa na BBC zai dinga kawo muku kan cutar Coronavirus',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p08mlbpj.jpg',
        alt: 'Korona: Ina Mafita?',
      },
      linkLabel: {
        text: 'Kashi-kashi',
        href: 'https://www.bbc.com/hausa/podcasts/p08mlgcb',
      },
    },
    translations,
    mostRead: {
      header: 'Wanda aka fi karantawa',
      lastUpdated: 'Na baya-bayan nan:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Wadanda aka fi kallo',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageLabel: 'Mitocinmu da sauko da sautin labarai',
      header: 'Shirye-shiryenmu',
      durationLabel: 'Tsawon lokaci %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/hausa/game-da-mu-49283501',
        text: 'Me ya sa za ku iya aminta da BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Karanta hanyoyin da muke bi dangane da adireshin waje.',
      },
      links: [
        {
          href: 'https://www.bbc.com/hausa/game-da-mu-37377086',
          text: 'Sharuddan yin amfani',
        },
        {
          href: 'https://www.bbc.com/hausa/game-da-mu-37377088',
          text: 'A game da BBC',
        },
        {
          href: 'https://www.bbc.com/hausa/game-da-mu-37377090',
          text: "Ka'idojin tsare sirri",
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: "Ka'idoji",
        },
        {
          href: 'https://www.bbc.co.uk/hausa/send/u50853335',
          text: 'Tuntubi BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC ba za ta dauki alhakin abubuwan da wasu shafukan daban suka wallafa ba. ',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Labaran Duniya',
        url: '/hausa',
      },
      {
        title: 'Wasanni',
        url: '/hausa/topics/cz74kjgv220t',
      },
      {
        title: 'Nishadi',
        url: '/hausa/topics/cg726kz37wdt',
      },
      {
        title: 'Cikakkun Rahotanni',
        url: '/hausa/52140979',
      },
      {
        title: 'Bidiyo',
        url: '/hausa/topics/cn09qmz4jryt',
      },
      {
        title: 'Shirye-shirye na Musamman',
        url: '/hausa/shirye-shirye-na-musamman-54712348',
      },
      {
        title: 'Shirye-shiryen rediyo',
        url: '/hausa/media-52219055',
      },
    ],
  },
};

export default withContext(service);
