import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { igbo as brandSVG } from '@bbc/psammead-assets/svgs';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import '@bbc/psammead-locales/moment/ig';
import '@bbc/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: false,
    lang: 'ig',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Mgbe ikpeazụ e tinyere ya ozi ọhụrụ',
    atiAnalyticsAppName: 'news-igbo',
    atiAnalyticsProducerId: '53',
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
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
    defaultImageAltText: 'BBC News Ìgbò',
    dir: 'ltr',
    externalLinkText: ', Site na mpụta',
    imageCaptionOffscreenText: 'Nkọwa foto ',
    videoCaptionOffscreenText: 'Aha onyonyo ',
    audioCaptionOffscreenText: 'Aha nkeananụānụ',
    defaultCaptionOffscreenText: 'Ihe a na-akpọ ya ',
    imageCopyrightOffscreenText: 'Ebe foto si ',
    brandSVG,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Ogbako',
    fonts: [],
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Lee ha niile',
      home: 'Akụkọ',
      currentPage: 'Peegi ị nọ ugbua',
      skipLinkText: 'Wụga n’ọdịnaya',
      relatedContent: "Ihe ndị ọzọ n'akụkọ a",
      navMenuText: 'Ngalaba',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
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
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: "Ka anyị mara ma i kwenyere n'iwu ndị a",
          description: {
            uk: {
              first: 'Anyị na-eji ',
              linkText: 'cookies',
              last:
                ' enye gị nke kacha mkpa na ịntanetị. Biko me ka anyị mata ma i kwenyere.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Anyị na ndị anyị na ha na-emekọrịta na-eji teknụzụdịka ',
              linkText: 'cookies',
              last:
                ', were na-amịị ozi banyere gị iji were na-enye gị ụdị ihe ị chọrọ dịka o si gbasaa ihe akụkọ anyị na ozi azụmahịa anyị na-egosi gị. Biko me ka anyị mata ma ọ dị gị mma.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Eeh, ekwere m',
          reject: "Mba, duga m n'ebe mwube",
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'Ngwaọrụ gị akwadoghi ọkpụkpọ mgbasa ozi',
        contentExpired: 'Ọdịnaya a adịghịzị',
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
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    mostRead: {
      header: 'Akachasị Gụọ',
      lastUpdated: 'Emelitere ikpeazụ na:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    navigation: [
      {
        title: 'Akụkọ',
        url: '/igbo',
      },
      {
        title: 'Egwuregwu',
        url: '/igbo/topics/4063f80f-cccc-44c8-9449-5ca44e4c8592',
      },
      {
        title: 'Ihe nkiri',
        url: '/igbo/media/video',
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
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Usoro anyị maka njikọ dị na mpụga.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms',
          text: 'Usoro Ojiji',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'Gbasara BBC',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'Iwu Nzuzo',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Kuki',
        },
        {
          href: 'https://www.bbc.com/igbo/institutional-43090448',
          text: 'Kpọtụrụ BBC',
        },
      ],
      copyrightText:
        'BBC. BBC anaghị ahụta maka ọdịnaya nke saịtị ndị dị na mpụga.',
    },
    timezone: 'Africa/Lagos',
  },
};

export default withContext(service);
