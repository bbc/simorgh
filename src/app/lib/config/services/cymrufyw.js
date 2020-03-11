import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import {
  F_REITH_SANS_BOLD,
  F_REITH_SANS_BOLD_ITALIC,
  F_REITH_SANS_ITALIC,
  F_REITH_SANS_REGULAR,
  F_REITH_SERIF_MEDIUM,
  F_REITH_SERIF_MEDIUM_ITALIC,
} from '@bbc/psammead-styles/fonts';
import { cymrufyw as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/cy';

export const service = {
  default: {
    ads: false,
    lang: `cy`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Wedi ei ddiweddaru',
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
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCCymruFyw',
    twitterSite: '@BBCCymruFyw',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latinDiacritics,
    manifestPath: '/articles/manifest.json',
    swPath: '/articles/sw.js',
    frontPageTitle: 'Newyddion a mwy',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Gweld y cyfan',
      home: 'Hafan',
      currentPage: 'Y dudalen bresennol',
      skipLinkText: `Neidio i'r cynnwys`,
      relatedContent: 'Cynnwys perthnasol',
      navMenuText: 'Adrannau',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: "Methu dod o hyd i'r dudalen",
          message:
            "Yn anffodus, rydyn ni'n methu dangos y dudalen yma. Rhowch gynnig ar:",
          solutions: [
            'Gwirio cyfeiriad url eto',
            "Ail-lwytho'r dudalen yn eich porwr",
            "Chwilioam y dudalen gan ddefnyddio blwch chwilio'r BBC",
          ],
          callToActionFirst: 'Neu, ewch i ',
          callToActionLinkText: 'Hafan BBC Cymru Fyw',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/cymrufyw',
        },
        500: {
          statusCode: '500',
          title: 'Gwall mewnol',
          message: "Ry'n ni'n methu dod o hyd i'r dudalen. Rhowch gynnig ar:",
          solutions: [
            "Ail-lwytho'r dudalen yn eich porwr",
            'Rhowch gynnig arall arni nes ymlaen',
          ],
          callToActionFirst: 'Neu, ewch i ',
          callToActionLinkText: 'Hafan BBC Cymru Fyw',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/cymrufyw',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Rydyn ni wedi diweddaru ein Polisi Preifatrwydd a Chwcis',
          description: {
            uk: {
              first:
                "Rydyn ni wedi gwneud newidiadau pwysig i'n Polisi Preifatrwydd a Chwcis ac rydyn ni eisiau i chi wybod beth all hyn ei olygu i chi a'ch data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Rydyn ni wedi gwneud newidiadau pwysig i'n Polisi Preifatrwydd a Chwcis ac rydyn ni eisiau i chi wybod beth all hyn ei olygu i chi a'ch data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Iawn',
          reject: 'Beth sydd wedi newid',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters/cy',
        },
        cookie: {
          title: "Rhowch wybod eich bod yn cytuno i'r cwcis",
          description: {
            uk: {
              first: "Rydyn ni'n defnyddio ",
              linkText: 'cwcis',
              last:
                " i roi'r profiad ar-lein gorau posib i chi. Gadewch i ni wybod os ydych chi'n cytuno i'r cwcis yma",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/cy/',
            },
            international: {
              first:
                "Rydyn ni a'n partneriaid yn defnyddio dyfeisiau technolegol, fel ",
              linkText: 'cwcis',
              last:
                ", ac yn casglu data pori er mwyn rhoi'r profiad ar-lein gorau posib i chi, ac er mwyn personoleiddio’r cynnwys a'r hysbysebion sy’n cael eu cynnig i chi. Rhowch wybod os ydych yn cytuno.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/cy/',
            },
          },
          accept: 'Cytuno',
          reject: "Na, mynd i'r gosodiadau",
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/cy/',
        },
      },
      media: {
        noJs:
          'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Sain',
        photogallery: 'Oriel luniau',
        video: 'Fideo',
        listen: 'Listen',
        watch: 'Gwylio',
        liveLabel: 'LIVE',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Mwyaf poblogaidd',
      lastUpdated: 'Diweddariad diwethaf:',
      numberOfItems: 5,
      hasMostRead: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Pam y gallwch ymddiried yn BBC Cymru Fyw',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
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
      ],
      copyrightText:
        "BBC. Nid yw'r BBC yn gyfrifol am gynnwys safleoedd allanol.",
    },
    fonts: [
      F_REITH_SANS_BOLD,
      F_REITH_SANS_BOLD_ITALIC,
      F_REITH_SANS_ITALIC,
      F_REITH_SANS_REGULAR,
      F_REITH_SERIF_MEDIUM,
      F_REITH_SERIF_MEDIUM_ITALIC,
    ],
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
