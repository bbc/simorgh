import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/gd';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `gd`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Ùraichte',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-naidheachdan',
    atiAnalyticsProducerId: '79',
    atiAnalyticsProducerName: 'SCOTLAND',
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
    manifestPath:
      'https://static.files.bbci.co.uk/core/manifest.1ccdbcfd4cc3bf889128a50903c2b22c81758637.json',
    homePageTitle: 'Dachaigh',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      ads: {
        advertisementLabel: 'Advertisement',
      },
      seeAll: 'Faic uile',
      home: 'Alba',
      currentPage: 'An duilleag seo',
      skipLinkText: 'Air adhart',
      relatedContent: 'Co-cheangailte',
      relatedTopics: 'Cuspairean Ceangailte',
      navMenuText: 'Earrannan',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Beò',
        liveCoverage: 'Aithris Beò',
        breaking: 'Briseadh',
        postedAt: 'Air a chur suas aig',
        summary: 'Geàrr-chunntas',
        shareButtonText: 'Sgaoil',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Geàrr-shealladh',
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
      byline: {
        articleInformation: 'Fiosrachadh mun artaigil',
        author: 'Ùghdar',
        reportingFrom: 'Ag aithris às',
        role: 'Dreuchd',
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
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Gabh ri cruinneachadh dàta agus lean ort',
            reject: 'Na gabh ri cruinneachadh dàta agus lean ort',
            initial: {
              title:
                'Dearbh dhuinn gu bheil thu ag aontachadh ri dàta air AMP a chruinneachadh',
              description: {
                first:
                  "Bidh sinn agus ar luchd-pàirt a' cur teicneòlais an sàs, a leithid ",
                linkText: 'dàta-brabhsair',
                last: ", agus fiosrachadh mu bhrabhsadh 'son an t-seirbheis air loidhne as fheàrr a thoirt seachad agus 'son duilleagan agus sanasachd anns am bi ùidh agaibh a lìbhrigeadh. Leig fios dhuinn ma tha sibh ag aontachadh.",
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Na roghainnean agam',
            },
            manage: {
              title: 'Stiùireadh cead air duilleagan AMP',
              description: {
                para1:
                  "Roghainnean do dhuilleagan AMP a-mhàin. 'S dòcha gun tèid iarraidh ort roghainn a dhèanamh a-rithist ma thadhlas tu air duilleagan a' BhBC nach eil air AMP.",
                para2:
                  "Chaidh an duilleag aotram air a bheil thu a' tadhal a thogail le teicneòlas Google AMP.",
                heading2: 'Cruinneachadh dàta riatanach',
                para3:
                  "Bidh sinn a' cumail rud beag fiosrachaidh air an inneal agad gun chead gus an obraich na duilleagan againn.",
                para4: {
                  text: "Leugh tuilleadh mun fhiosrachadh riatanach a tha sinn a' cumail air an inneal agad gus an obraich na duilleagan againn.",
                  url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  "Tha sinn a' stòradh fiosrachaidh gu h-ionadail 'son na roghainnean agad a chumail air an inneal agad.",
                heading3: 'Cruinneachadh dàta roghainneil',
                para6:
                  "Tha cead do dhuilleagan AMP a' ciallachadh gu bheil thu a' toirt cead dhuinn sansachd a lìbhrigeadh a tha pearsanta dhut fhèin nuair a tha thu taobh a-muigh na RA.",
                para7: {
                  text: "Leugh tuilleadh mu mar a tha sinn a' lìbhrigeadh sanasachd pearsanta aig a' BhBC agus mun luchd-pàirt againn.",
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Faodadh tu sanasachd phearsanta a sheachdnadh le a bhith a\' taghadh "Na gabh ri dàta pearsanta a chruinneachadh agus lean ort" gu h-ìosal. Thoireabh an aire gum faic thu sanasachd fhathast ach cha bhi i pearsanta.',
                para9:
                  'Faodaidh tu na roghinnean seo atharrachadh le a bhith a\' taghadh "Roghainnean Sanasachd / Na reic am fiosrachadh agam" aig bonn na duilleige aig àm sam bith.',
              },
            },
          },
          canonical: {
            title:
              'Leig fios dhuinn gu bheil sibh ag aontachadh ri dàta-brabhsair',
            description: {
              uk: {
                first: "Bidh sinn a' cleachdadh ",
                linkText: 'dàta-brabhsair',
                last: " 'son an t-seirbheis as fheàrr air loidhne a thoirt dhuibh. Leig fios dhuinn ma tha sibh ag aontachadh ris an dàta-brabhsair uile.",
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: "Bidh sinn a' cleachdadh ",
                linkText: 'dàta-brabhsair',
                last: " 'son an t-seirbheis as fheàrr air loidhne a thoirt dhuibh. Leig fios dhuinn ma tha sibh ag aontachadh ris an dàta-brabhsair uile.",
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
      },
      media: {
        noJs: 'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Fuaim',
        photogallery: 'Gailearaidh dhealbhan',
        video: 'Bhidio',
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Fo-thiotal, ',
          text: 'Dh’fhaodadh sanasan a bhith an lùib stuth',
          articleText:
            'Chan eil am BBC an urra ri na tha air Làraichean-lìn air an taobh a-muigh.',
          articleAdditionalText:
            'Dh’fhaodadh sanasan a bhith an lùib stuth %provider_name%.',
        },
        fallback: {
          text: 'Chan eil seo ri fhaighinn',
          linkText: 'VFaic tuilleadh %provider_name%',
          linkTextSuffixVisuallyHidden: ', taobh a-muigh',
          warningText:
            'Chan eil am BBC an urra ri na tha air Làraichean-lìn air an taobh a-muigh.',
        },
        skipLink: {
          text: 'Leum thairis air %provider_name% teachdaireachd',
          endTextVisuallyHidden: 'Deireadh %provider_name% teachdaireachd',
        },
        consentBanner: {
          heading: `Cead do stuth [social_media_site]?`,
          body: `Tha stuth [social_media_site] an cois an artaigil seo. Tha sinn a’ sireadh cead bhuat mus tèid sìon luchdachadh, oir dh’fhaodadh iad ‘briosgaidean’ agus teicneòlas eile a chur an sàs. ‘S dòcha gum biodh tu airson [link] poileasaidh nam briosgaidean aca [/link] a leughadh agus [link] am poileasaidh prìobhaideachd aca [/link]  mus tèid thu air adhart. Airson sùil a thoirt air an stuth seo, tagh 'Gabh ris agus lean ort'.`,
          button: 'Gabh ris agus lean ort',
        },
      },
      topStoriesTitle: 'Prìomh Sgeulachdan',
      featuresAnalysisTitle: 'Sgeulachdan Aithriseach',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'roghainneil · optional',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading:
          "Seo na tha thu a' luchdachadh suas: · Here's what you're uploading:",
        fileUploadButton: 'Tagh faidhle · Choose a file',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'Cuir · Send',

        // Validation
        validationRequired: "Tha rudeigin a dhìth · There's something missing.",
        validationInvalidEmail:
          "Chan eil sin a' coimhead ceart. Cleachd seòladh-d ceart. · That doesn't look right. Please enter a proper email address.",
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          "Chan eil faidhlichean gu leòr ann. Cuir ris co-dhiù {{minFiles}}. · There aren't enough files. Please add at least {{minFiles}}.",
        validationFilesTooMany:
          'Tha cus faidhlichean an sin. Chan eil ceadaichte ach {{maxFiles}}. · There are too many files. You can add {{maxFiles}}.',
        validationFilesInvalidType:
          "Duilich, cha tèid againn air an seòrsa faidhle sin a chleachdadh. Feuch {{fileTypes}}. · Sorry, we can't use this type of file. Please add {{fileTypes}}.",
        validationFilesTooSmall:
          'Tha am faidhle sin briste. Feuch fear eile. · This file is broken. Try picking another.',
        validationFilesSizeExceeded:
          'Duilich, tha na faidhlichean sin ro mhòr. Chan urrainn ach 1.2 GB a luchdachadh suas aig aon àm. · Sorry, these files are too big. You can only upload up to 1.2 GB at a time.',
        validationWordLimit:
          'Nas lugha na {{wordLimit}} facal · Maximum {{wordLimit}} words',

        // Messaging
        retentionPeriodDays: undefined,
        referenceNumber: 'Aireamh clàraidh · Reference number',
        submissionInfoSignedOutMessage:
          "Dh'fhaodadh gum bi thu airson nota a ghabhail dhen seo gus am bi e agad. · You may wish to make a note of these details for your reference.",
        privacyInfoHtml:
          "Na biodh dragh ort, tha sinn a' cumail d' fhiosrachadh tèarainte — leugh ar Poileasaidh Prìobhaideachd airson tuilleadh fios: · Don't worry, we protect your information — read the Privacy Notice for more details: {{privacyInfoLink}}",
        emailToHtml:
          "Cuir post-d gu {{emailLink}} mas e 's gun atharraich thu d' inntinn is nach eil thu airson 's gun cleachd sinn e. Cuimhnich air an àireamh clàraidh. · If you change your mind and don't want us to use it, just email us at {{emailLink}}. Don't forget the reference number.",
        removalGuidelineText:
          'Ma chuir thu rudeigin a-steach airson prògram no airson a chleachdadh air-loidhne, cha bhi e comasach dhuinn a thoirt às ma thèid a chleachdadh. · If you submitted something for a programme or online, we won’t be able to remove it once we use it.',

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading:
          "A' luchdachadh suas d' fhaidhlichean… · Uploading your files…",
        uploadingDescription:
          "Fuirich gus am bi e ullamh. · Please wait until it's complete.",

        // Success Screen
        successHeading: 'Teachdaireachd air a chuir · Message sent',
        successDescription:
          'Tapadh leat airson fios a chuir thugainn. · Thanks for getting in touch.',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading:
          "Cha do dh'fhalbh do theachdaireachd · Your message didn't send",
        errorDescription: 'Feuch ri chur a-rithist. · Try sending it again.',

        // Closed Screen
        closedHeading: 'Tha seo a-nise dùinte.',
        closedDescription: 'Dhùin seo air {{date}}.',
      },
    },
    mostRead: {
      header: 'Popular Reads',
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
