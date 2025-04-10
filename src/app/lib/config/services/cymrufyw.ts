import '#psammead/moment-timezone-include/tz/Europe/London';
import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/cy';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `cy`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Wedi ei ddiweddaru',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-cymrufyw',
    atiAnalyticsProducerId: '100',
    atiAnalyticsProducerName: 'WALES',
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
    manifestPath:
      'https://static.files.bbci.co.uk/core/manifest.1ccdbcfd4cc3bf889128a50903c2b22c81758637.json',
    homePageTitle: 'Newyddion a mwy',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      ads: {
        advertisementLabel: 'Advertisement',
      },
      seeAll: 'Gweld y cyfan',
      home: 'Hafan',
      currentPage: 'Y dudalen bresennol',
      skipLinkText: `Neidio i'r cynnwys`,
      relatedContent: 'Cynnwys perthnasol',
      topicsPath: 'pynciau',
      relatedTopics: 'Pynciau Cysylltiedig',
      navMenuText: 'Adrannau',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Yn Fyw',
        liveCoverage: 'Darlledu’n Fyw',
        breaking: 'Newydd dorri',
        postedAt: 'Cyhoeddwyd am',
        summary: 'Crynodeb',
        shareButtonText: 'Rhannu',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Cipolwg',
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
      byline: {
        articleInformation: 'Gwybodaeth am yr erthygl',
        author: 'Awdur',
        reportingFrom: 'Yn gohebu o',
        role: 'Swydd',
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
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/privacy-policy/cy',
        },
        cookie: {
          amp: {
            accept: "Caniatáu'r casglu data a pharhau",
            reject: 'Gwrthod y casglu data a pharhau',
            initial: {
              title:
                'Gadewch i ni wybod eich bod yn hapus ein bod yn casglu data ar AMP',
              description: {
                first:
                  "Rydyn ni a'n partneriaid yn defnyddio dyfeisiau technolegol, fel ",
                linkText: 'cwcis',
                last: ", ac yn casglu data pori er mwyn rhoi'r profiad ar-lein gorau posib i chi, ac er mwyn personoleiddio’r cynnwys a'r hysbysebion sy’n cael eu cynnig i chi. Rhowch wybod os ydych yn cytuno.",
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/cy/',
              },
              manage: 'Rheoli fy ngosodiadau',
            },
            manage: {
              title: 'Rheoli gosodiadau caniatâd ar dudalennau AMP',
              description: {
                para1:
                  "Mae'r gosodiadau yma ar gyfer tudalennau AMP yn unig. Efallai y bydd rhaid i chi osod y dewisiadau yma eto os ewch chi i dudalennau'r BBC nad yw'n rhai AMP.",
                para2:
                  'Cafodd y dudalen symudol ysgafn rydych chi wedi bod ynddi ei hadeiladu gyda thechnoleg AMP Google.',
                heading2: 'Casglu data hanfodol',
                para3:
                  "Er mwyn gwneud i'n tudalennau gwe weithio, ry'n ni'n storio peth gwybodaeth gyfyngedig ar eich dyfais heb eich caniatâd.",
                para4: {
                  text: "Darllen mwy am y wybodaeth hanfodol ry'n ni'n ei storio ar eich dyfais er mwyn i'n tudalennau gwe weithio.",
                  url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  "Ry'n ni'n defnyddio'r storfa leol i storio eich dewisiadau caniatâd ar eich dyfais.",
                heading3: 'Casglu data dewisol',
                para6:
                  "Pan rydych chi'n caniatáu casglu data ar dudalennau AMP, rydych chi'n caniatáu i ni arddangos hysbysebion wedi eu personoleiddio sy’n berthnasol i chi pan rydych chi tu allan i'r DU.",
                para7: {
                  text: "Darllen mwy am sut ry'n ni'n personoleiddio hysbysebion yn y BBC a'n partneriaid hysbysebu.",
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Gallwch ddewis peidio â derbyn hysbysebion wedi eu personoleiddio drwy glicio "Gwrthod y casglu data a pharhau" isod. Nodwch y byddwch chi\'n parhau i weld hysbysebion, ond ni fyddan nhw wedi eu personoleiddio i chi.',
                para9:
                  'Gallwch newid y gosodiadau yma drwy glicio "Ad Choices / Do not sell my info" yn y troedyn unrhyw bryd.',
              },
            },
          },
          canonical: {
            title: "Rhowch wybod eich bod yn cytuno i'r cwcis",
            description: {
              uk: {
                first: "Rydyn ni'n defnyddio ",
                linkText: 'cwcis',
                last: " i roi'r profiad ar-lein gorau posib i chi. Gadewch i ni wybod os ydych chi'n cytuno i'r cwcis yma",
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/cy/',
              },
              international: {
                first: "Rydyn ni'n defnyddio ",
                linkText: 'cwcis',
                last: " i roi'r profiad ar-lein gorau posib i chi. Gadewch i ni wybod os ydych chi'n cytuno i'r cwcis yma",
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/cy/',
              },
            },
            accept: 'Cytuno',
            reject: "Na, mynd i'r gosodiadau",
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Sain',
        photogallery: 'Oriel luniau',
        video: 'Fideo',
        listen: 'Listen',
        watch: 'Gwylio',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Disgrifiad, ',
          text: 'Gallai hysbysebion ymddangos yng nghynnwys',
          articleText:
            "Dyw'r BBC ddim yn gyfrifol am gynnwys gwefannau allanol.",
          articleAdditionalText:
            'Gallai hysbysebion ymddangos yng nghynnwys %provider_name%.',
        },
        fallback: {
          text: 'Mae’n flin gennym ein bod yn cael trafferth dangos y post hwn.',
          linkText: 'Gwylio’r post gwreiddiol ar %provider_name%',
          linkTextSuffixVisuallyHidden: ', dolen allanol',
          warningText:
            "Dyw'r BBC ddim yn gyfrifol am gynnwys gwefannau allanol.",
        },
        skipLink: {
          text: 'I osgoi neges %provider_name%',
          endTextVisuallyHidden: 'Diwedd neges %provider_name%',
        },
        consentBanner: {
          heading: `Caniatáu cynnwys [social_media_site]?`,
          body: `Mae’r erthygl hon yn cynnwys deunydd gan [social_media_site]. Gofynnwn am eich caniatâd cyn llwytho unrhyw beth, gan y gallai Twitter ddefnyddio cwcis neu dechnoleg arall. Mae’n bosib eich bod am ddarllen [link] polisi cwcis [/link] [social_media_site] a [link] pholisi preifatrwydd [/link] cyn derbyn. Er mwyn gweld y cynnwys dewiswch ‘derbyn a pharhau’.`,
          button: 'Derbyn a pharhau',
        },
      },
      topStoriesTitle: 'Prif Straeon',
      featuresAnalysisTitle: 'Cylchgrawn',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'dewisol',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: "Dyma beth rwyt ti'n ei lwytho i fyny:",
        fileUploadButton: 'Dewisa ffeil',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'Anfon',

        // Validation
        validationRequired: 'Mae rhywbeth ar goll.',
        validationInvalidEmail:
          'Dydy hynny ddim yn edrych yn iawn. Rho gyfeiriad e-bost cywir.',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'Does dim digon o ffeiliau. Ychwanega o leiaf {{minFiles}}.',
        validationFilesTooMany:
          'Mae gormod o ffeiliau. Mae modd ychwanegu {{maxFiles}}.',
        validationFilesInvalidType:
          "Yn anffodus, allwn ni ddim defnyddio'r math yma o ffeil. Ychwanega {{fileTypes}}.",
        validationFilesTooSmall: "Mae'r ffeil yma wedi torri. Dewisa un arall.",
        validationFilesSizeExceeded:
          "Yn anffodus, mae'r ffeiliau yma'n rhy fawr. Dim ond 1.2 GB mae modd ei lwytho ar y tro.",
        validationWordLimit: 'Dim mwy na {{wordLimit}} gair',

        // Messaging
        removalGuidelineText:
          'Os ydych wedi cyflwyno rhywbeth ar gyfer rhaglen neu ar-lein, allwn ni ddim ei dynnu unwaith fyddwn wedi ei ddefnyddio.',
        retentionPeriodDays: undefined,
        referenceNumber: 'Cyfeirnod',
        submissionInfoSignedOutMessage:
          "Efallai y byddi di'n dymuno gwneud nodyn o'r manylion hyn ar gyfer dy gofnodion.",
        privacyInfoHtml:
          "Paid â phoeni, rydyn ni'n diogelu dy wybodaeth — darllena'r {{privacyInfoLink}} i gael rhagor o fanylion.",
        emailToHtml:
          "E-bostia {{emailLink}} os byddi di'n newid dy feddwl. Noda'r cyfeirnod a dweda wrthym ni nad wyt ti eisiau i ni ei ddefnyddio.",

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: "Wrthi'n llwytho dy ffeiliau i fyny...",
        uploadingDescription: 'Arhosa nes bydd wedi gorffen.',

        // Success Screen
        successHeading: 'Wedi anfon y neges',
        successDescription: 'Diolch am gysylltu â ni.',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'Dydy dy ffeiliau ddim wedi cael eu llwytho i fyny.',
        errorDescription: 'Ceisia eu llwytho i fyny eto.',

        // Closed Screen
        closedHeading: 'Mae hwn wedi cau nawr',
        closedDescription: 'Fe wnaeth hwn gau ar {{date}}.',
      },
    },
    mostRead: {
      header: 'Mwyaf poblogaidd',
      lastUpdated: 'Diweddariad diwethaf:',
      numberOfItems: 5,
      hasMostRead: false,
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
