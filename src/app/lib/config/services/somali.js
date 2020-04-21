import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { somali as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Africa/Mogadishu';
import '@bbc/psammead-locales/moment/so';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `so`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Waa la cusbooneysiiyay',
    atiAnalyticsAppName: 'news-somali',
    atiAnalyticsProducerId: '83',
    chartbeatDomain: 'somali.bbc.co.uk',
    brandName: 'BBC News Somali',
    product: 'BBC News',
    serviceLocalizedName: 'Somali',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/somali.png',
    defaultImageAltText: 'BBC News Somali',
    dir: `ltr`,
    externalLinkText: ', Bogag kale',
    imageCaptionOffscreenText: 'Qoraalka sawirka, ',
    videoCaptionOffscreenText: 'Qoraalka Muuqaalka, ',
    audioCaptionOffscreenText: 'Qoraalka Codka, ',
    defaultCaptionOffscreenText: 'Qoraal, ',
    imageCopyrightOffscreenText: 'Xigashada Sawirka, ',
    locale: `so-SO`,
    datetimeLocale: `so`,
    service: 'somali',
    serviceName: 'Somali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcsomali',
    twitterSite: '@bbcsomali',
    noBylinesPolicy:
      'https://www.bbc.com/somali/hayadeed-49283375#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/somali/hayadeed-49283375',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Somali',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Arag dhammaan',
      home: 'War',
      currentPage: 'Bogga hadda',
      skipLinkText: 'U gudub qaybta macluumaadka',
      relatedContent: 'Warar kale oo dheeraad ah oo la xiriira qodobkan',
      navMenuText: 'Qaybaha',
      mediaAssetPage: {
        mediaPlayer: 'Ciyaaridda warbixinnada',
        audioPlayer: 'Ciyaaridda Codka',
        videoPlayer: 'Ciyaaridda Muuqaalka',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Bogga lama heli karo',
          message:
            'Waan ka xunnahay, ma awoodno inaan kuu soo gudbino bogga aad raadineyso. Fadlan iskuday.',
          solutions: [
            'Iska xaqiiji url-ka ama linkiga',
            'Guji batanka cusbooneysiinta ee boggaaga',
            'Boggan wax ka raadi adigoo adeegsanaya hanaanka raadinta ee BBC',
          ],
          callToActionFirst: 'Taa bedelkeeda, fadlan booqo bogga hore ee ',
          callToActionLinkText: 'BBC News Somali',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/somali',
        },
        500: {
          statusCode: '500',
          title: 'Khalad ka dhacy gudaha server-ka',
          message:
            'Waan ka xunnahay, hadda ma awoodno inaan kuu soo gudbinno bogga aad raadineyso. Fadlan iskuday:',
          solutions: [
            'Guji batanka cusbooneysiinta ee boggaaga',
            'Markale dib ugu soo noqo',
          ],
          callToActionFirst: 'Taa bedelkeeda, fadlan booqo bogga hore ee ',
          callToActionLinkText: 'BBC News Somali',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/somali',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Waan cusbooneysiinay shuruucdeena la xiriirta xogta gaarka ah iyo Cookies-ka',
          description: {
            uk: {
              first:
                'Waxaa isbedel muhiim ah ku sameynay Shuruucda Xogta gaarka ah iyo qoraallada kooban waxaana dooneynaa in aad ogaato waxa ay arrinta kaaga dhigan tahay adiga iyo xogtaada.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Waxaa isbedel muhiim ah ku sameynay Shuruucda Xogta gaarka ah iyo qoraallada kooban waxaana dooneynaa in aad ogaato waxa ay arrinta kaaga dhigan tahay adiga iyo xogtaada.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'HAYE',
          reject: 'Ogow waxa isbedelay',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title:
            'Aan ogaano in aad aqbashay qoraallada dheeriga ah ee cookies-ka',
          description: {
            uk: {
              first: 'Waxaan isticmaaleynaa lifaaq ',
              linkText: 'cookies',
              last:
                ' si aad nooga heshid khibradda ugu wanaagsan ee adeegsiga intarnet-ka. Fadlan aan ogaano haddii aad ogolaatay dhammaan cookies-kan.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                'Anaga iyo baraha aan ogolnahay nahay waxaan adeegsanaa teknolijiyad sida ',
              linkText: 'cookies',
              last:
                ', waxaana uruurinaa xogta booqashada bogga si aan khibradda ugu fiican ee adeegsiga intarnet-ka aan kuu siino, si aan kugu soo gudbiyo warar iyo xayeysiinno adiga gaar kuu ah. Fadlan aan ogaano haddii aad aqbashay.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Haa, waan ogolaaday',
          reject: 'Maya, igee settings-ka',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'Qalabkan kuma ciyaari kartid maqalka iyo muuqaalka',
        contentExpired: 'Adeeggan hadda ma heli kartid',
        audio: 'Cod',
        photogallery: 'Albumka sawirrada',
        video: 'Muuqaal',
        bbc_somali_radio: {
          title: 'Raadiyaha BBC Soomaali',
          subtitle:
            'Wararka iyo xaaladda taagan ee dunida oo dhan, faallo, muusig, madadaallo iyo cayaaro.',
        },
        bbc_somali_tv: {
          title: 'Caawa Iyo Caalamka',
          subtitle:
            'Kala soco telefishinka BBC News Somali 30 daqiiqo oo isugu jira warar, wareysiyo & faallooyin ku saabsan Soomaaliya iyo Caalamka',
        },
        listen: 'Dhageyso',
        watch: 'Daawo',
        liveLabel: 'TOOS',
        nextLabel: 'Xiga',
        previousRadioShow: 'Barnaamijyadii hore ee Raadiyaha',
        nextRadioShow: 'Barnaamijka Xiga ee Raadiyaha',
        duration: 'Muddada',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Qoraalka Muuqaalka, ',
          text:
            'Digniin: Waxaa suuragal ah in macluumaadka dad kale ay ku jiraan xayaysiin',
        },
        fallback: {
          text: 'Macluumaadkan lama heli karo',
          linkText: 'Faahfaahin ka eeg %provider_name%',
          linkTextSuffixVisuallyHidden: ', Bogag kale',
          warningText:
            'BBC masuul kama ahan macluumadka bogagga kale ee dibadda.',
        },
        skipLink: {
          text: 'Ka bood %provider_name% boggan',
          endTextVisuallyHidden: 'Dhammaadka %provider_name% boggan',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Ugu akhris badan',
      lastUpdated: 'Markii ugu dambeysay ee la cusbooneysiiyay:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      onFrontPage: true,
      frontPagePosition: 'feature-main',
      header: 'Barnaamijyada Idaacadda',
    },
    recommendations: {
      hasRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/somali/hayadeed-49283375',
        text: 'Sababta aada ku aamini kartid BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Akhri xogta ku saabsan sida aan u abaarno bogagga dibadda.',
      },
      links: [
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098011',
          text: 'Shuruucda isticmaalka',
        },
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098081',
          text: 'Ku saabsan BBC',
        },
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098082',
          text: 'Shuruucda xogta gaarka ah',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098613',
          text: 'La xiriir BBC',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC masuul kama ahan macluumadka bogagga kale ee dibadda.',
    },
    fonts: [],
    timezone: 'Africa/Mogadishu',
    navigation: [
      {
        title: 'War',
        url: '/somali',
      },
      {
        title: 'Warar dheeraad ah',
        url: '/somali/war',
      },
      {
        title: 'Ganacsi',
        url: '/somali/topics/2f2db234-3c2d-40a4-b4ac-eea661faadd0',
      },
      {
        title: 'Cayaaraha',
        url: '/somali/cayaaraha',
      },
      {
        title: 'Aqoon Guud',
        url: '/somali/aqoon_guud',
      },
      {
        title: 'Muuqaal',
        url: '/somali/media/video',
      },
      {
        title: 'Barnaamijyada Idaacadda',
        url: '/somali/ka_qayb_gal/programmes',
      },
    ],
  },
};

export default withContext(service);
