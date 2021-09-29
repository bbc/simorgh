import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { gahuza as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/rw';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `rw`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Vyavuguruwe ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-gahuza',
    atiAnalyticsProducerId: '40',
    chartbeatDomain: 'gahuza.bbc.co.uk',
    brandName: 'BBC News Gahuza',
    product: 'BBC News',
    serviceLocalizedName: 'Gahuza',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/gahuza.png',
    defaultImageAltText: 'BBC News Gahuza',
    dir: `ltr`,
    externalLinkText: ', bivuye ahandi',
    imageCaptionOffscreenText: "Insiguro y'isanamu, ",
    videoCaptionOffscreenText: 'Insiguro ya video, ',
    audioCaptionOffscreenText: "Insiguro y'amajwi, ",
    defaultCaptionOffscreenText: 'Insiguro, ',
    imageCopyrightOffscreenText: 'Ahavuye isanamu, ',
    locale: `rw-RW`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'rw',
    datetimeLocale: `rw`,
    service: 'gahuza',
    serviceName: 'Gahuza',
    languageName: 'Kinyarwanda',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcgahuza',
    twitterSite: '@bbcgahuza',
    noBylinesPolicy:
      'https://www.bbc.com/gahuza/institutional-49283343#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/gahuza/institutional-49283343',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: "Urupapuro rw'itangiriro",
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'Podcast',
      brandTitle: 'Ikiganiro cy’abagore',
      brandDescription: 'Ikiganiro cy’abagore kuri BBC Gahuzamiryango',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p082wkdq.jpg',
        alt: 'Ikiganiro cy’abagore',
      },
      linkLabel: {
        text: 'Inkurikirane',
        href: 'https://www.bbc.com/gahuza/podcasts/p07yjlmf',
      },
    },
    translations: {
      ads: {
        advertisementLabel: 'Kwamamaza',
      },
      seeAll: 'Raba vyose',
      home: `Urupapuro rw'itangiriro`,
      currentPage: 'Uru rupapuro',
      skipLinkText: 'Simbira ku birimwo',
      relatedContent: 'Ibindi bisa n’ibi',
      relatedTopics: 'Ibindi bisa n’ibi',
      navMenuText: 'Imice',
      mediaAssetPage: {
        mediaPlayer: 'Ibikinwa',
        audioPlayer: 'Kina amajwi',
        videoPlayer: 'Kina amasanamu',
      },
      gist: 'Incamake',
      error: {
        404: {
          statusCode: '404',
          title: 'Urubapuro ntirwabonetse',
          message:
            'Tubabarire ntidushoboye kukuronsa urupapuro warondera. Tugusavye kugerageza:',
          solutions: [
            'Turi kugenzura umuhora ulr',
            'Gufyonda ubuto refresh mu buryo bwawe bwa internet',
            'Kurondera uru rupapuro uciye mu buryo bwa BBC bwo kurondera',
          ],
          callToActionFirst: "Nk'ubundi buryo, tugusavye kuja kuri ",
          callToActionLinkText: 'BBC News Gahuza',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/gahuza',
        },
        500: {
          statusCode: '500',
          title: "Ikibazo c'ubuhinga bwacu",
          message:
            'Tubabarire ntidushoboye kukuronsa urupapuro warondera. Tugusavye kugerageza:',
          solutions: [
            'Gufyonda ubuto refresh mu buryo bwawe bwa internet',
            'Uragaruka hanyuma',
          ],
          callToActionFirst: "Nk'ubundi buryo, tugusavye kuja kuri ",
          callToActionLinkText: 'BBC News Gahuza',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/gahuza',
        },
      },
      consentBanner: {
        privacy: {
          title: "Twaravuguriye ibijanye n'ubuzima bwite n'ibigenga Cookies",
          description: {
            uk: {
              first:
                "Twaragize ivyo duhindura ngirakamaro ku buzima bwite n'ibigenga Cookies kandi dushaka ko umenya ico ibi bisigura kuri wewe n'ibikuranga utanga",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Twaragize ivyo duhindura ngirakamaro ku buzima bwite n'ibigenga Cookies kandi dushaka ko umenya ico ibi bisigura kuri wewe n'ibikuranga utanga",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Menya ivyahindutse',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: "Emera itkusanywa ry'ibikuranga hanyuma ubandanye",
            reject: "Anka ikusanywa ry'ibikuranga hanyuma ubandanye",
            initial: {
              title: 'Tumenyeshe nimba wemeye ko dukusanya ibikuranda kuri AMP',
              description: {
                first: "Twebwe n'abo dukorana dukoresha ikoranabuhinga, nka ",
                linkText: 'cookies',
                last:
                  ", kandi tugatororokanya amakuru y'ibikorerwa kuri internet kugira tugufashe kworoherwa cane hamwe no kwihitiramwo ivyo uraba hamwe n'abarata ibidandazwa ushaka kubona. Tugusavye kutumenyesha ko uvyemeye.",
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Tunganya integurwa zanje',
            },
            manage: {
              title: 'Tunganya integurwa  ku mpapuro za AMP',
              description: {
                para1:
                  'Izi ntegurwa ziraba gusa impapuro za AMP. Urashobora gusabwa gusubira gutegura mu buryo ubishima iyo ugiye ku mpapuro za BBC zidakoresha AMP.',
                para2:
                  'Urupapuro ruhwahwutse rwa mobile wagiyeko rwatunganijwe hakoreshejwe ubuhinga bwa Google AMP.',
                heading2: 'Gukusanya ibikuranga ni ngombwa cane',
                para3:
                  "Kugira impapuro z'urubuga rwacu zikore, turabika amakuru amwe amwe ku cuma cawe utarinze kubitwemerera.",
                para4: {
                  text:
                    "Soma ibindi vyinshi ku makuru ya nkenerwa tubika ku cuma cawe kugira impapuro z'imbuga zacu zikore neza.",
                  url:
                    'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'Dukoresha ububiko bwawe kugira tubike ku cuma cawe ivyo ushima wemeye.',
                heading3: 'Gukusanya amakuru ku buryo bwo guhitamwo',
                para6:
                  "Iyo wemeye ikusanywa ry'ibikuranga ku mpapuro za AMP uba wemeye yuko uturetse tukakwereka ibirangishwa bikwerekeye iyo uri hanze y'Ubwongereza.",
                para7: {
                  text:
                    "Soma ibindi vyinshi ku kuntu dutegura ibirangishwa bikwerekeye kuri BBC hamwe n'abarangisha dukorana.",
                  url:
                    'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Urashobora guhitamwo kutaronswa ibirangishwa bikwerekeye mu gufyonda "Anka ikusanywa ry\'ibikuranga hanyuma ubandanye" aho munsi. Twokumenyesha yuko uzoguma ubona ibirangishwa, ariko ntibizoba bikwerekeye bwite.',
                para9:
                  'Urashobora guhindura izi ntegurwa mu gukanda kuri "Ongera amahitamwo / Ntugurishire ibindanda" mu nyandiko zo munsi igihe cose ushatse.',
              },
            },
          },
          canonical: {
            title: 'Tumenyesha niba wemeye cookies',
            description: {
              uk: {
                first: 'Dukoresha ',
                linkText: 'cookies',
                last:
                  ' kugira woroherwe bishoboka kuri internet. Tugusavye kutumenyesha niba wemeye ibi vyose bijanye na cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Dukoresha ',
                linkText: 'cookies',
                last:
                  ' kugira woroherwe bishoboka kuri internet. Tugusavye kutumenyesha niba wemeye ibi vyose bijanye na cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Ego, ndavyemeye',
            reject: 'Oya, njana aho bihindurirwa',
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Ntibishobora gukina mu cuma cawe',
        contentExpired: 'Ibi ntibikiboneka.',
        contentNotYetAvailable: 'Ibi ntibiraboneka ngo bikinwe.',
        audio: 'Amajwi',
        photogallery: 'Amasanamu',
        video: 'Video',
        bbc_gahuza_radio: {
          title: 'Radio BBC Gahuza',
          subtitle:
            'Amakuru y’amahanga, ubusesenguzi, amakuru y’akarere k’ibiyaga bigari, ikinamico, ubuzima, imibereho y’abagore. Kuri FM no kuri internet.',
        },
        listen: 'Umviriza',
        watch: 'Raba',
        listenLive: 'Umviriza live',
        listenNext: 'Umva ibikurikira',
        liveLabel: 'IKIBIRIRAHO',
        nextLabel: 'IBIKURIKIRA',
        previousRadioShow: 'Ikiganiro ca radiyo giheruka',
        nextRadioShow: 'Ikiganiro ca radiyo gikurikira',
        duration: 'Umwanya bimara',
        recentEpisodes: 'Ibiganiro byashise',
        podcastExternalLinks: 'Iyi podcast iraboneka kandi kuri',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Insiguro ya video, ',
          text: "Uragaba: Ibitangwa n'izindi mbuga bishobora kubamwo gutangaza",
        },
        fallback: {
          text: 'Ibi ntibiboneka',
          linkText: 'Raba ibindi kuri %provider_name%',
          linkTextSuffixVisuallyHidden: ', bivuye ahandi',
          warningText: 'BBC ntibazwa ibivuye ku zindi mbuga.',
        },
        skipLink: {
          text: 'Tambuka %provider_name% ubutumwa',
          endTextVisuallyHidden: 'Impera ya %provider_name% ubutumwa',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: "Inkuru iri kw'isonga",
      featuresAnalysisTitle: 'Ivyo BBC Gahuza ibahitiramwo',
    },
    brandSVG,
    mostRead: {
      header: 'Ibisomwa cane',
      lastUpdated: 'Ibiheruka kuvugururwa:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Ivyarabwe cane',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Ibiganiro bishya',
      durationLabel: 'Umwanya bimara %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/gahuza/institutional-49283343',
        text: 'Igituma ushobora kwizera BBC News',
      },
      externalLink: {
        href:
          'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: "Soma ibijanye n'aho duhagaze ku mihora ijana ahandi",
      },
      links: [
        {
          href: 'https://www.bbc.com/gahuza/institutional-35754053',
          text: 'Ingingo zo gukoresha urubuga',
        },
        {
          href: 'https://www.bbc.com/gahuza/institutional-35754055',
          text: 'Ibijanye na BBC',
        },
        {
          href: 'https://www.bbc.com/gahuza/institutional-35754059',
          text: "Ibigenga n'ubuzima bwite",
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/send/u50853291',
          text: 'Vugana na BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC ntibazwa ibivuye ku zindi mbuga.',
    },
    fonts: [],
    timezone: 'GMT',
    navigation: [
      {
        title: "Urupapuro rw'itangiriro",
        url: '/gahuza',
      },
      {
        title: 'Ibiyaga binini',
        url: '/gahuza/topics/c06gq67y3w5t',
      },
      {
        title: 'Afrika',
        url: '/gahuza/topics/crvnv566zx9t',
      },
      {
        title: 'Mpuzamahanga',
        url: '/gahuza/topics/c9dvd93jjkkt',
      },
      {
        title: 'Imikino',
        url: '/gahuza/topics/c5qvpq0jzy7t',
      },
      {
        title: 'Amajwi n’amashusho',
        url: '/gahuza/media/video',
      },
    ],
  },
};

export default withContext(service);
