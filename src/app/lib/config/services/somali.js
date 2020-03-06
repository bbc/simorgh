import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { somali as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Africa/Mogadishu';
import '@bbc/psammead-locales/moment/so';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
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
    externalLinkText: ', bogag kale',
    imageCaptionOffscreenText: 'Qoraalka sawirka ',
    videoCaptionOffscreenText: 'Qoraalka Muuqaalka ',
    audioCaptionOffscreenText: 'Qoralka Codka ',
    defaultCaptionOffscreenText: 'Qoraal ',
    imageCopyrightOffscreenText: 'Xigashada Sawirka, ',
    locale: `so-SO`,
    datetimeLocale: `so`,
    service: 'somali',
    serviceName: 'Somali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcsomali',
    twitterSite: '@bbcsomali',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
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
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Bogga lama heli karo',
          message:
            'Waan ka xunnahay, ma awoodno inaan kuu soo gudbino bogga aad raadineyso. Fadlan iskuday.',
          solutions: [
            'iska xaqiiji url-ka ama linkiga',
            'Guji batanka cusbooneysiinta ee boggaaga',
            'Boggan wax k raadi adigoo adeegsanaya hanaanka raadinta ee BBC',
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
                'Waxaa isbedel muhiim ah ku sameynay Shuruucda Xogta gaarka ah iyo qoraallada kooban waxaana dooneynaa in aad ogaato waxa ay arrinta kaaga dhigan tahay adiga iyo xogtaada.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Waxaa isbedel muhiim ah ku sameynay Shuruucda Xogta gaarka ah iyo qoraallada kooban waxaana dooneynaa in aad ogaato waxa ay arrinta kaaga dhigan tahay adiga iyo xogtaada.',
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
                'Anaga iyo baraha aan ollogga nahay waxaan adeegsanaa teknolijiyad sida ',
              linkText: 'cookies',
              last:
                ', waxaana uruurinaa xogt booqashada bogga si aan khibradda ugu fiican ee adeegsiga intarnet-ka aan kuu siino, si aan kugu soo gudbiyo warar iyo xayeysiinno adiga gar kuu ah. Fadlan aan ogaano haddii aad oggoshahay.',
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
        noJs:
          'Qalabkan aad haysato kuma ciyaari kartid maqalkan iyo muuqaalkan',
        contentExpired:
          'Adeeggani hadda iyo wixii ka danbeeya ma jiro oo ma heli kartid',
        audio: 'Maqal',
        photogallery: 'Albamka sawirrada',
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
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'TOOS',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
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
        title: 'Maqal',
        url: '/somali/media/audio',
      },
      {
        title: 'Muuqaal',
        url: '/somali/media/video',
      },
      {
        title: 'Barnaamijyada Idaacadda',
        url: '/somali/ka_qayb_gal/programmes',
      },
      {
        title: 'Sawirro',
        url: '/somali/media/photogalleries',
      },
    ],
  },
};

export default withContext(service);
