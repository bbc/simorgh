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
import { naidheachdan as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/gd';

export const service = {
  default: {
    ads: false,
    lang: `gd`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Ùraichte',
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
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnaidheachdan',
    twitterSite: '@bbcnaidheachdan',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latinDiacritics,
    manifestPath: '/articles/manifest.json',
    swPath: '/articles/sw.js',
    frontPageTitle: 'Dachaigh',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Faic uile',
      home: 'Alba',
      currentPage: 'An duilleag seo',
      skipLinkText: 'Air adhart',
      relatedContent: 'Co-cheangailte',
      navMenuText: 'Earrannan',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Chan eil sgeul air an duilleig',
          message:
            'Duilich, chan urrainn dhuinn an duilleag sin fhaighinn.  Feuch:',
          solutions: [
            "A' dèanamh ath-sgrùdaidh air an url",
            "A' brùthadh air a' phutan ùraich sa bhrabhsair agaibh",
            "Faigh lorg air an duilleig seo le bocsa sgrùdaidh a' BhBC",
          ],
          callToActionFirst: 'Neo, tadhail air an duilleig-dachaigh aig ',
          callToActionLinkText: 'BBC Naidheachdan',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/naidheachdan',
        },
        500: {
          statusCode: '500',
          title: 'Mearachd le frithealadair',
          message:
            'Duilich, chan urrainn dhuinn an duilleag sin fhaighinn.  Feuch:',
          solutions: [
            "A' brùthadh air a' phutan ùraich sa bhrabhsair agaibh",
            "A' tilleadh a-rithist",
          ],
          callToActionFirst: 'Neo, tadhail air an duilleig-dachaigh aig ',
          callToActionLinkText: 'BBC Naidheachdan',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/naidheachdan',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Rinn sinn ùrachadh air ar poileasaidh mu phrìobhaideachd is dàta-brabhsair',
          description: {
            uk: {
              first:
                "Rinn sinn atharrachadh cudromach air ar poileasaidh mu phrìobhaideachd is dàta-brabhsair agus tha sinn airson tuigse a bhith agaibh dè tha sin a' ciallachadh dhuibhse agus dhan dàta agaibh.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Rinn sinn atharrachadh cudromach air ar poileasaidh mu phrìobhaideachd is dàta-brabhsair agus tha sinn airson tuigse a bhith agaibh dè tha sin a' ciallachadh dhuibhse agus dhan dàta agaibh.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Gabh ris',
          reject: 'Faigh a-mach dè tha air atharrachadh',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title:
            'Leig fios dhuinn gu bheil sibh ag aontachadh ri dàta-brabhsair',
          description: {
            uk: {
              first: "Bidh sinn a' cleachdadh ",
              linkText: 'dàta-brabhsair',
              last:
                " 'son an t-seirbheis as fheàrr air loidhne a thoirt dhuibh. Leig fios dhuinn ma tha sibh ag aontachadh ris an dàta-brabhsair uile.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                "Bidh sinn agus ar luchd-pàirt a' cur teicneòlais an sàs, a leithid ",
              linkText: 'dàta-brabhsair',
              last:
                ", agus fiosrachadh mu bhrabhsadh 'son an t-seirbheis air loidhne as fheàrr a thoirt seachad agus 'son duilleagan agus sanasachd anns am bi ùidh agaibh a lìbhrigeadh. Leig fios dhuinn ma tha sibh ag aontachadh.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Tha mi ag aontachadh',
          reject: 'Chan eil mi ag aontachadh, fosgail roghainnean',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs:
          'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Fuaim',
        photogallery: 'Gailearaidh dhealbhan',
        video: 'Bhidio',
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LIVE',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'As motha leughte',
      lastUpdated: 'Air ùrachadh mu dheireadh:',
      numberOfItems: 5,
      hasMostRead: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Carson as urrainear earbsa a chur sa BhBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text:
          'Leugh mun fheallsanachd againn mu cheangaileachan dhan taobh a-muigh',
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
      ],
      copyrightText:
        "BBC. Chan eil am BBC an urra ris na tha a' nochdadh air làraichean-lìn air an taobh a-muigh",
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
