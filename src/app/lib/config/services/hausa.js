import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { hausa as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/ha';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `ha`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Wanda aka sabunta',
    atiAnalyticsAppName: 'news-hausa',
    atiAnalyticsProducerId: '51',
    chartbeatDomain: 'hausa.bbc.co.uk',
    brandName: 'BBC News Hausa',
    product: 'BBC News',
    serviceLocalizedName: 'Hausa',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hausa.png',
    defaultImageAltText: 'BBC News Hausa',
    dir: `ltr`,
    externalLinkText: ', adireshin waje',
    imageCaptionOffscreenText: 'Bayanan hoto, ',
    videoCaptionOffscreenText: 'Bayanan bidiyo, ',
    audioCaptionOffscreenText: 'Bayanan sauti',
    defaultCaptionOffscreenText: 'Bayani, ',
    imageCopyrightOffscreenText: 'Asalin hoton, ',
    locale: `ha-GH`,
    datetimeLocale: `ha`,
    service: 'hausa',
    serviceName: 'Hausa',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbchausa',
    twitterSite: '@bbchausa',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Labaran Duniya',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Duba su baki daya',
      home: 'Labaran Duniya',
      currentPage: 'Shafin da ake ciki',
      skipLinkText: 'Tsallaka zuwa abubuwan da ke ciki',
      relatedContent: 'Karin bayani',
      navMenuText: 'Sassa',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Ba za a samu wannan shafin ba',
          message:
            'Afuwa, ba za mu iya kawo maku wannan shafin da kuke nema ba. Sake gwadawa:',
          solutions: [
            'Sake duba adireshin',
            'Sabunta shafin',
            'Bincika shafin ta hanyar amfani da gurbin binciken BBC',
          ],
          callToActionFirst: 'Maimakon haka, ziyarci shafin sashen ',
          callToActionLinkText: 'BBC News Hausa',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/hausa',
        },
        500: {
          statusCode: '500',
          title: "Matsalar na'ura",
          message:
            'Afuwa, ba za mu iya kawo maku wannan shafin da kuke nema ba. Sake gwadawa:',
          solutions: ['Sabunta shafin', 'Ziyarci shafin daga baya'],
          callToActionFirst: 'Maimakon haka, ziyarci shafin sashen ',
          callToActionLinkText: 'BBC News Hausa',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/hausa',
        },
      },
      consentBanner: {
        privacy: {
          title: "Mun sabunta Ka'idojinmu na Tsare Sirri",
          description: {
            uk: {
              first:
                "Mun yi wasu sauye-sauye kan muhimman Ka'idojinmu na Tsare Sirri, muna so ku san ta yadda hakan zai shafe ku da kuma bayananku.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Mun yi wasu sauye-sauye kan muhimman Ka'idojinmu na Tsare Sirri, muna so ku san ta yadda hakan zai shafe ku da kuma bayananku.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Madalla',
          reject: 'Duba abin da ya sauya',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: "Bayyana mana idan ka amince da ka'idojin",
          description: {
            uk: {
              first: 'Muna amfani da ',
              linkText: "ka'idoji",
              last:
                " domin samar maku da abubuwa masu kayatarwa a Intanet. Muna rokonku da ku sanar da mu idan kun gamsu da duka wadannan ka'idoji.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                'Mu da sauran abokan hulda muna amfani da fasaha kamar adireshin waje, sannan mu tattara wasu bayanai game da ku duka domin mu samar maku da abubuwa masu kayatarwa a Intanet',
              linkText: '',
              last: '',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Eh, na gamsu',
          reject: "A'a, ku kai ni wurin zabar tsari",
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: "Na'urarku na da matsalar sauraren sauti",
        contentExpired: 'Yanzu an daina samar da wannan shiri.',
        audio: 'Sauti',
        photogallery: 'Rumbun hotuna',
        video: 'Bidiyo',
        bbc_hausa_radio: {
          title: 'BBC Hausa Rediyo',
          subtitle:
            "Labaran duniya da sharhi da kuma bayanai kan al'amuran yau da kullum daga sashin Hausa na BBC.",
        },
        bbc_hausa_tv: {
          title: 'Labaran Talabijin',
          subtitle:
            "Sashen Hausa na BBC ya fara gabatar da shirin talabijin a ranakun Litinin zuwa Juma'a na kowane mako.",
        },
        listen: 'Listen',
        watch: 'Kalla',
        liveLabel: 'KAI TSAYE',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Wanda aka fi karantawa',
      lastUpdated: 'Na baya-bayan nan:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageUrl: '/hausa/institutional/2011/11/000001_mitocinmu',
      frequenciesPageLabel: 'Radio Frequencies Link Label',
      header: 'BBC News Radio',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/hausa/game-da-mu-49283501',
        text: 'Me yasa za ka aminta da BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Karanta hanyoyin da muke bi dangane da adireshin waje.',
      },
      links: [
        {
          href: 'https://www.bbc.com/hausa/game-da-mu-37377086',
          text: 'Sharudan yin amfani',
        },
        {
          href: 'https://www.bbc.com/hausa/game-da-mu-37377088',
          text: 'Dangane da BBC',
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
          href: 'https://www.bbc.com/hausa/game-da-mu-37377092',
          text: 'Tuntubi BBC',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC ba za ta dauki alhakin abubuwan da wasu shafukan daban suka wallafa ba. ',
    },
    fonts: [],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Labaran Duniya',
        url: '/hausa',
      },
      {
        title: 'Wasanni',
        url: '/hausa/wasanni',
      },
      {
        title: 'Mujalla',
        url: '/hausa/mujalla',
      },
      {
        title: 'Cikakkun Rahotanni',
        url: '/hausa/rahotanni',
      },
      {
        title: 'Bidiyo',
        url: '/hausa/media/video',
      },
      {
        title: 'Shirye-shirye na Musamman',
        url: '/hausa/shirye_shirye_na_musamman',
      },
      {
        title: 'Shirye-shiryen rediyo',
        url: '/hausa/media-43322903',
      },
      {
        title: 'Hotuna',
        url: '/hausa/media/photogalleries',
      },
    ],
  },
};

export default withContext(service);
