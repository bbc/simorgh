import withContext from '../../utils/withContext';
import { Translations } from '../../../models/types/translations';

export const cymrufyw: Translations = {
  default: {
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
    gist: 'At a glance',
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
    socialEmbed: {},
  },
};

export default withContext(cymrufyw);
