import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/ig';
import '#psammead/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ig',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Mgbe ikpeazụ e tinyere ya ozi ọhụrụ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-igbo',
    atiAnalyticsProducerId: '53',
    atiAnalyticsProducerName: 'IGBO',
    useReverb: true,
    chartbeatDomain: 'igbo.bbc.co.uk',
    brandName: 'BBC News Ìgbò',
    product: 'BBC News',
    serviceLocalizedName: 'Ìgbò',
    locale: 'ig',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ig',
    datetimeLocale: 'ig',
    service: 'igbo',
    serviceName: 'Igbo',
    languageName: 'Igbo',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
    defaultImageAltText: 'BBC News Ìgbò',
    dir: 'ltr',
    externalLinkText: ', na mpụta',
    imageCaptionOffscreenText: 'Nkọwa foto, ',
    videoCaptionOffscreenText: 'Aha onyonyo, ',
    audioCaptionOffscreenText: 'Aha nkeananụānụ, ',
    defaultCaptionOffscreenText: 'Ihe a na-akpọ ya, ',
    imageCopyrightOffscreenText: 'Ebe foto si, ',
    script: latin,
    manifestPath: '/igbo/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Ogbako',
    noBylinesPolicy:
      'https://www.bbc.com/igbo/institutional-48529074#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/igbo/institutional-48529074',
    isTrustProjectParticipant: true,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'Ikpeazụ',
        nextPage: 'Osote',
        pageXOfY: 'Page {x} nke {y}',
      },
      ads: {
        advertisementLabel: 'Mgbasa ozi',
      },
      seeAll: 'Lee ha niile',
      home: 'Akụkọ',
      currentPage: 'Peegi ị nọ ugbua',
      skipLinkText: 'Wụga n’ọdịnaya',
      relatedContent: "Ihe ndị ọzọ n'akụkọ a",
      relatedTopics: 'Isiokwu ndị emetụtara',
      navMenuText: 'Ngalaba',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Na Eme Ozugbo',
        liveCoverage: 'Mkpuchi Na Eme Ozugbo',
        breaking: 'Na Akpọtụ Ugbu A',
        postedAt: 'Ebisara na',
        summary: 'Nchịkọta',
        shareButtonText: 'Kekọrịta',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Nchịkọta',
      error: {
        home: 'Akụkọ',
        currentPage: 'Current page',
        skipLinkText: 'Wụga n’ọdịnaya',
        404: {
          statusCode: '404',
          title: 'Ahụghị ibe akwụkwọ a',
          message:
            'E wela iwe, anyị enweghị ike iwetara gị ibe akwụkwọ ị na-achọ. Nwalie ọzọ:',
          solutions: [
            'Tulee akara URL ahụ ọzọ',
            "Kpatụ ọdụmbị 'Refresh' dị na braụza gị aka",
            'Jiri BBC "Search Bar" chọọ ibe akwụkwọ',
          ],
          callToActionFirst: "Maọbụ, biko gaa n'obi ",
          callToActionLinkText: 'BBC News Ìgbò',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/igbo',
        },
        500: {
          statusCode: '500',
          title: 'Mperi',
          message:
            'E wela iwe, anyị enweghị ike iwetara gị ibe akwụkwọ ị na-achọ. Gbalịa ọzọ:',
          solutions: [
            'Kpatụ ọdụmbi Refresh dị na braụza gị aka',
            'Ga alọghachị azụ ma e mechaa',
          ],
          callToActionFirst: "Maọbụ, biko gaa n'obi ",
          callToActionLinkText: 'BBC News Ìgbò',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/igbo',
        },
      },
      byline: {
        articleInformation: 'Ebe akụkọ a si',
        author: 'Onye dere ya',
        listItemImage: 'Ndepụta ihe, foto',
        published: 'Mgbe e biputara ya',
        reportingFrom: 'Ebeg o si',
        role: 'Ndị mere akụkọ a',
      },
      consentBanner: {
        privacy: {
          title: 'Anyị ewelitela ihe nzuzo anyị nakwa iwu dị na ya.',
          description: {
            uk: {
              first:
                'Anyị agbanwela ụfọdụ ihe dị mkpa nye ihe nzuzo anyị na iwu dị na ya nakwa anyị chọrọ ka ị mata ihe nke a pụtara nye gị na data gị.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Anyị agbanwela ụfọdụ ihe dị mkpa nye ihe nzuzo anyị na iwu dị na ya nakwa anyị chọrọ ka ị mata ihe nke a pụtara nye gị na data gị.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ọ dị mma',
          reject: 'Chọpụta ihe gbanwere',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: "Nabata ka e were data gị ma gaa n'ihu",
            reject: "Anabatala ka e were data gị ma gaa n'ihu",
            initial: {
              title: "Mee ka anyị ma i kwere ka anata data gị n'AMP",
              description: {
                first:
                  'Anyị na ndị anyị na ha na-emekọrịta na-eji teknụzụdịka ',
                linkText: 'cookies',
                last: ', were na-amịị ozi banyere gị iji were na-enye gị ụdị ihe ị chọrọ dịka o si gbasaa ihe akụkọ anyị na ozi azụmahịa anyị na-egosi gị. Biko me ka anyị mata ma ọ dị gị mma.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Hazie akara usoro m',
            },
            manage: {
              title: 'Hazie akara usoro m na peeji AMP',
              description: {
                para1:
                  'Usoro ndị a megidere sọọsọ na peeji AMP. A nwereike isi gị dowe usoro ndị a mgbe ịbịakwara peeji abụghị -AMP peeji BBC.',
                para2:
                  'E jiri ụzụ AMP nke Google rụọ peeji mfe nke akara ekwenti i banyere.',
                heading2: 'Sọọsọ nnabata data',
                para3:
                  "Ime ka peeji anyị rụọ ọrụ, anyị na-edowe ozi ụfọdụ n'ekwenti gị na-agwaghị gị.",
                para4: {
                  text: "Gụkọọ maka ozi dị mkpa anyị na-edowe n'igwe ekwenti gị n'iji me ka peeji websaịt anyị rụọ ọrụ.",
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5: "Anyị na-edowe nnabata gị n'ime igwe ekwenti gị.",
                heading3: 'Nnabata gị ma ịchọ',
                para6:
                  "I kwete n'usoro inye ikikere ka e ji nara gị data na peeji AMP ị na-ekwete ka anyị gosi ngwa ahịa masịrị gị mgbe ị nọghị na UK.",
                para7: {
                  text: 'Gụkọọ maka etu anyị na ndị otu anyị si egosi ahịa na BBC.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'I nwereike ịghara ikwe ka i na-ahụ ngosi ahịa ma ị pịa "Ekweghị m ka anata data makwa gaa n\'ihu" n\'ala. Biko marakwa na ị ka ga-anahụ ngosi ahịa mana o nwereike ha agaghị amasị gị.',
                para9:
                  'I nwereike ịgbanwe usoro ngosi ahịa ma ị pịa "Ngosi ahia / Erekwala ụdị ahịa ndị ga-amasị m" dị n\'okpuru mgbe ọbụla ị chọrọ.',
              },
            },
          },
          canonical: {
            title: "Ka anyị mara ma i kwenyere n'iwu ndị a",
            description: {
              uk: {
                first: 'Anyị na-eji ',
                linkText: 'cookies',
                last: ' enye gị nke kacha mkpa na ịntanetị. Biko me ka anyị mata ma i kwenyere.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Anyị na-eji ',
                linkText: 'cookies',
                last: ' enye gị nke kacha mkpa na ịntanetị. Biko me ka anyị mata ma i kwenyere.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Eeh, ekwere m',
            reject: "Mba, duga m n'ebe mwube",
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Ngwaọrụ gị akwadoghi ọkpụkpọ mgbasa ozi',
        contentExpired: 'Ọdịnaya a adịghịzị',
        contentNotYetAvailable: 'Ọdịnaya a adịbeghị maka ọkpụkpọ.',
        audio: 'Ọdịyo',
        photogallery: 'Image gallery',
        video: 'Vidio',
        bbc_igbo_radio: {
          title: 'Placeholder title',
          subtitle: 'Placeholder subtitle',
        },
        listen: 'Gee ntị',
        watch: 'Lee',
        liveLabel: 'NA EME UGBU A',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        closeVideo: 'Wepu',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Aha onyonyo, ',
          text: 'Warning: Third party content may contain adverts',
          articleText: "Warning: BBC amaghị maka ihe ndị si n'ọbaozi ndị ọzọ.",
          articleAdditionalText:
            '%provider_name% mgbasaozi azụmaahịa nwereike ịdị na ya',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          warningText:
            'BBC anaghị ahụta maka ọdịnaya nke saịtị ndị dị na mpụga.s',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
        consentBanner: {
          heading: `Hapụ [social_media_site] ihe dị na ya?`,
          body: `Edemede a nwere ihe ndị si na [social_media_site]. Anyị na-achọ ka i nye anyị ikike tupu e tinye ihe ọbụla, dịka akụrụngwa cookies na tekịnụzụ ndị ọzọ nwereike ịdị na ya. I nwereike ịgụ [social_media_site] [link] iwu cookie [/link] na [link] iwu nzuzo [/link] tupu ị nabata ya. Iji kirie ihe nọ n'ime ya, họrọ 'nabata na gaa n'ihu'.`,
          button: 'Nabata na gaa n’ihu',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Isi akụkọ',
      featuresAnalysisTitle: 'Kọwaara m isi akụkọ',
      latestMediaTitle: 'Kachasị ọhụrụ',
    },
    mostRead: {
      header: 'Akachasị Gụọ',
      lastUpdated: 'Emelitere ikpeazụ na:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: 'Akụkọ',
        url: '/igbo',
      },
      {
        title: 'Egwuregwu',
        url: '/igbo/topics/cnq68k0x2vrt',
      },
      {
        title: 'Ihe nkiri',
        url: '/igbo/topics/c3l19z3qjmyt',
      },
      {
        title: 'Nke ka ewuewu',
        url: '/igbo/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/igbo/institutional-48529074',
        text: 'Ihe mere ị ga-eji nwee ntụkwasiobi na BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Usoro anyị maka njikọ dị na mpụga.',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms',
          text: 'Usoro Ojiji',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'Gbasara BBC',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'Iwu Nzuzo',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Kuki',
        },
        {
          href: 'https://www.bbc.co.uk/igbo/send/u50853379',
          text: 'Kpọtụrụ BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Akụkọ BBC n’asụsụ ndị ọzọ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC anaghị ahụta maka ọdịnaya nke saịtị ndị dị na mpụga.',
    },
    timezone: 'Africa/Lagos',
  },
};

export default withContext(service);
