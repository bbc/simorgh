import '#psammead/moment-timezone-include/tz/Europe/London';
import latinWithDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import withContext from '../../../../contexts/utils/withContext';
import 'moment/locale/cy';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `cy`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Wedi ei ddiweddaru',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-cymrufyw',
    atiAnalyticsProducerId: '100',
    chartbeatDomain: 'cymrufyw.bbc.co.uk',
    brandName: 'BBC Cymru Fyw',
    product: 'BBC News',
    serviceLocalizedName: 'Cymru Fyw',
    defaultImage:
      'https://www.bbc.co.uk/news/special/2015/newsspec_11063/cymru_fyw_1024x576.png',
    defaultImageAltText: 'BBC Cymru Fyw',
    dir: `ltr`,
    externalLinkText: ', dolen allanol',
    imageCaptionOffscreenText: "Disgrifiad o'r llun, ",
    videoCaptionOffscreenText: "Disgrifiad o'r fideo, ",
    audioCaptionOffscreenText: "Disgrifiad o'r sain",
    defaultCaptionOffscreenText: 'Disgrifiad, ',
    imageCopyrightOffscreenText: 'Ffynhonnell y llun, ',
    locale: `cy`,
    datetimeLocale: `cy`,
    service: 'cymrufyw',
    serviceName: 'Cymru Fyw',
    languageName: 'Welsh',
    twitterCreator: '@BBCCymruFyw',
    twitterSite: '@BBCCymruFyw',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/articles/manifest.json',
    frontPageTitle: 'Newyddion a mwy',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'Mwyaf poblogaidd',
      lastUpdated: 'Diweddariad diwethaf:',
      numberOfItems: 5,
      hasMostRead: false,
    },
    mostWatched: {
      header: 'Mwyaf poblogaidd',
      numberOfItems: 5,
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
        text: 'Pam y gallwch ymddiried yn BBC Cymru Fyw',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: "Sut ry'n ni'n defnyddio dolenni allanol.",
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/cy/',
          text: 'Telerau Defnyddio',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/cy/',
          text: 'Polisi Preifatrwydd',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/cy/',
          text: 'Cwcis',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: "Cysylltwch â'r BBC",
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. Nid yw'r BBC yn gyfrifol am gynnwys safleoedd allanol.",
    },
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Hafan',
        url: '/cymrufyw',
      },
      {
        title: 'Cylchgrawn',
        url: '/cymrufyw/cylchgrawn',
      },
      {
        title: 'Gwleidyddiaeth',
        url: '/cymrufyw/gwleidyddiaeth',
      },
      {
        title: 'Gog-Orll',
        url: '/cymrufyw/gogledd-orllewin',
      },
      {
        title: 'Gog-Ddwy',
        url: '/cymrufyw/gogledd-ddwyrain',
      },
      {
        title: 'Canolbarth',
        url: '/cymrufyw/canolbarth',
      },
      {
        title: 'De-Orll',
        url: '/cymrufyw/de-orllewin',
      },
      {
        title: 'De-Ddwy',
        url: '/cymrufyw/de-ddwyrain',
      },
      {
        title: 'Wales News',
        url: '/news/wales',
      },
    ],
  },
};

export default withContext(service);
