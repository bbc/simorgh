import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { kyrgyz as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/ky';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `ky`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Жаңылоо',
    atiAnalyticsAppName: 'news-kyrgyz',
    atiAnalyticsProducerId: '58',
    chartbeatDomain: 'kyrgyz.bbc.co.uk',
    brandName: 'BBC News Кыргыз Кызматы',
    product: 'BBC News',
    serviceLocalizedName: 'Кыргыз КызMATы',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/kyrgyz.png',
    defaultImageAltText: 'BBC News Кыргыз КызMATы',
    dir: `ltr`,
    externalLinkText: ', Би-Би-Сиден тышкары баракча',
    imageCaptionOffscreenText: 'Сүрөттүн түшүндүрмөсү, ',
    videoCaptionOffscreenText: 'Видеонун түшүндүрмөсү, ',
    audioCaptionOffscreenText: 'Аудионун түшүндүрмөсү, ',
    defaultCaptionOffscreenText: 'Түшүндүрмө, ',
    imageCopyrightOffscreenText: 'Сүрөттүн булагы, ',
    locale: `ky-KG`,
    datetimeLocale: `ky`,
    service: 'kyrgyz',
    serviceName: 'News Кыргыз КызMATы',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbckyrgyz',
    twitterSite: '@bbckyrgyz',
    noBylinesPolicy:
      'https://www.bbc.com/kyrgyz/institutional-49677275#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/kyrgyz/institutional-49677275',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Кабарлар, акыркы мүнөттөгү кабарлар, талдоо, видео',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Баарын көрүү',
      home: 'Башталгыч бет',
      currentPage: 'Ачылып турган баракча',
      skipLinkText: 'Сайтка өтүү',
      relatedContent: 'Тема боюнча башка макалалар',
      navMenuText: 'Бөлүмдөр',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Баракча табылган жок',
          message:
            'Кечиресиз, сиз тандаган баракча ачылган жок. Кайра кириңиз:',
          solutions: [
            'Баракчанын дарегин текшериңиз',
            'Браузердеги жаңылоо баскычын басыңыз',
            'Баракчаны издөө аянтчадан табыңыз',
          ],
          callToActionFirst: 'Анын ордуна ',
          callToActionLinkText: 'BBC News Кыргыз Кызматы',
          callToActionLast: ' баракчабызга кириңиз',
          callToActionLinkUrl: 'https://www.bbc.com/kyrgyz',
        },
        500: {
          statusCode: '500',
          title: 'Ички сервердеги ката',
          message:
            'Кечиресиз, сиз издеп жаткан баракчаны таба алган жокпуз. Кайра кириңиз:',
          solutions: [
            'Браузердеги жаңылоо баскычын басыңыз',
            'Бир аздан кийин кайтып келиңиз',
          ],
          callToActionFirst: 'Анын ордуна ',
          callToActionLinkText: 'BBC News Кыргыз Кызматы',
          callToActionLast: ' баракчабызга кириңиз',
          callToActionLinkUrl: 'https://www.bbc.com/kyrgyz',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Жеке маалыматтын купуялуулугу боюнча эрежелер жаңыланды',
          description: {
            uk: {
              first:
                'Жеке маалыматтын купуялуулугу боюнча эрежелер жаңыланды. Би-Би-Си жаңы эрежелер сизге кандай таасир этерин түшүндүрүп берет.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Жеке маалыматтын купуялуулугу боюнча эрежелер жаңыланды. Би-Би-Си жаңы эрежелер сизге кандай таасир этерин түшүндүрүп берет.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ЖАРАЙТ',
          reject: 'Кандай өзгөрүүлөр болгонун билип алыңыз.',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Өзгөрүүлөргө макулсузбу?',
          description: {
            uk: {
              first: 'Биздин сайтыбызда иштөөнү жакшыртуу үчүн ',
              linkText: 'cookies',
              last: ' колдонобуз. Cookies боюнча эрежелерге макулсузбу?',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                'Биз жана өнөктөштөрүбүз сайтыбызда иштөөнү жакшыртуу үчүн ',
              linkText: 'cookies',
              last:
                ' колдонуп, браузердеги маалыматты топтойт. Бул аркылуу сиз жактырган контент жана жарнамалар көрсөтүлөт. Буга макулсузбу?',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Ооба, мен макулмун',
          reject: 'Жок, мени жөндөө баракчасына алып бар',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'Жабдыгыңыз медианын бул түрүн ойнотууга ылайыктуу эмес.',
        contentExpired: 'Бул маалымат мындан ары ачылбайт',
        audio: 'Аудио',
        photogallery: 'Көз ирмем',
        video: 'Видео',
        bbc_kyrgyz_radio: {
          title: 'Би-Би-Си Кыргыз кызматынын радиосу',
          subtitle:
            'Эл аралык жана жергиликтүү жаңылыктар, аналитика, кызыктуу материалдар кыргыз тилинде',
        },
        bbc_kyrgyz_tv: {
          title: 'TБи-Би-Си ТВ жаңылыктары',
          subtitle:
            'Би-Би-Си Кыргыз кызматынын эл аралык жаңылыктарын көрүңүз.',
        },
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
          textPrefixVisuallyHidden: 'Видеонун түшүндүрмөсү, ',
          text: 'Эскертүү: Жарнамалар болушу ыктымал',
        },
        fallback: {
          text: 'Баракча ачылбайт',
          linkText: '%provider_name% баракчадан көбүрөк пост окуу',
          linkTextSuffixVisuallyHidden: ', Би-Би-Сиден тышкары баракча',
          warningText:
            'Би-Би-Си сырткы интернет сайттардын мазмуну үчүн жооптуу эмес.',
        },
        skipLink: {
          text: '%provider_name% баракчаны өткөрүп жиберүү, пост',
          endTextVisuallyHidden: '%provider_name% посттун аягы',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Эң көп окулгандар',
      lastUpdated: 'Акыркы жаңылоо:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/kyrgyz/institutional-49677275',
        text: 'Эмнеге BBC News ишенсе болот?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Башка интернет сайттардын мазмуну боюнча биздин позиция.',
      },
      links: [
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157280',
          text: 'Колдонуу эрежелери',
        },
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157281',
          text: 'Би-Би-Си жөнүндө',
        },
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157282',
          text: 'Купуялык',
        },
        {
          href:
            'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/kyrgyz/institutional-38157284',
          text: 'Би-Би-Си менен байланышыңыз',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-Би-Си сырткы интернет сайттардын мазмуну үчүн жооптуу эмес.',
    },
    fonts: [],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Башталгыч бет',
        url: '/kyrgyz',
      },
      {
        title: 'Кыргызстан',
        url: '/kyrgyz/kyrgyzstan',
      },
      {
        title: 'Дүйнө',
        url: '/kyrgyz/world',
      },
      {
        title: 'Сапар TV',
        url: '/kyrgyz/sapartv',
      },
      {
        title: 'Видео',
        url: '/kyrgyz/media/video',
      },
      {
        title: 'Маданият/Илим',
        url: '/kyrgyz/entertainment',
      },
      {
        title: 'Журнал',
        url: '/kyrgyz/magazine',
      },
      {
        title: 'Блог',
        url: '/kyrgyz/blog',
      },
    ],
  },
};

export default withContext(service);
