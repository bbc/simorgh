import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { uzbek as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/uz';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `uz-Cyrl`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Янгиланди',
    atiAnalyticsAppName: 'news-uzbek',
    atiAnalyticsProducerId: '96',
    chartbeatDomain: 'uzbek.bbc.co.uk',
    brandName: "BBC News O'zbek",
    product: 'BBC News',
    serviceLocalizedName: "O'zbek",
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/uzbek.png',
    defaultImageAltText: "BBC News O'zbek",
    dir: `ltr`,
    externalLinkText: ', ташқи',
    imageCaptionOffscreenText: 'Сурат тагсўзи, ',
    videoCaptionOffscreenText: 'Видео тагсўзи, ',
    audioCaptionOffscreenText: 'Аудио тагсўзи, ',
    defaultCaptionOffscreenText: 'Тагсўз, ',
    imageCopyrightOffscreenText: 'Сурат манбаси, ',
    locale: `uz-UZ`,
    datetimeLocale: `uz`,
    service: 'uzbek',
    serviceName: 'Uzbek',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcuzbek',
    twitterSite: '@bbcuzbek',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Бош саҳифа',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Ҳаммасини кўринг',
      home: 'Бош саҳифа',
      currentPage: 'Жорий саҳифа',
      skipLinkText: 'Саҳифага ўтиш',
      relatedContent: 'Бу мавзуда батафсилроқ',
      navMenuText: 'Бўлимлар',
      mediaAssetPage: {
        mediaPlayer: 'Медиа плейер',
        audioPlayer: 'Аудио плейер',
        videoPlayer: 'Видео плейер',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Саҳифа топилмади',
          message:
            'Узр, сизни қидираётган саҳифангизга олиб боролмаяпмиз. Марҳамат қилиб мана бу йўлларини кўринг:',
          solutions: [
            'url манзилини яна бир бор текшириб кўринг',
            'Браузерингиздаги "янгилаш" тугмасини босинг',
            'Ушбу саҳифани Би-би-сининг қидирув панелидан излаб кўринг',
          ],
          callToActionFirst: 'Бунга муқобил ',
          callToActionLinkText: "BBC News O'zbek",
          callToActionLast: 'бош саҳифасига киринг',
          callToActionLinkUrl: 'https://www.bbc.com/uzbek',
        },
        500: {
          statusCode: '500',
          title: 'Ички сервердаги хатолик',
          message:
            'Узр, ҳозирги пайтда сизни қидираётган саҳифангизга олиб боролмаяпмиз. Марҳамат қилиб мана бу йўлларини кўринг:',
          solutions: [
            'Браузерингиздаги "янгилаш" тугмасини босинг',
            'Яна бироз фурсатдан кейин ҳаракат қилиб кўринг',
          ],
          callToActionFirst: 'Бунга муқобил ',
          callToActionLinkText: "BBC News O'zbek",
          callToActionLast: 'бош саҳифасига киринг',
          callToActionLinkUrl: 'https://www.bbc.com/uzbek',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Биз шахсий ҳаёт махфийлиги ва Куки(Cookies)га оид сиёсатимизни янгиладик',
          description: {
            uk: {
              first:
                'Биз шахсий ҳаёт махфийлиги ва Куки(Cookie)га оид сиёсатимизга айрим муҳим ўзгаришларни киритдик. Ва бу нарса сиз ва сизнинг маълумотингиз учун нимани англатиши ҳақида сизни бохабар этиш истагидамиз.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Биз шахсий ҳаёт махфийлиги ва Куки(Cookie)га оид сиёсатимизга айрим муҳим ўзгаришларни киритдик. Ва бу нарса сиз ва сизнинг маълумотингиз учун нимани англатиши ҳақида сизни бохабар этиш истагидамиз.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Маъқул',
          reject: 'Нималар ўзгарди?',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Кукис(Cookies)га рози эканингизни билдиринг',
          description: {
            uk: {
              first: 'Биз ',
              linkText: 'кукидан',
              last:
                ' сизга янада яхшироқ онлайн имконият бериш мақсадида фойдаланамиз. Марҳамат қилиб ушбу барча кукиларга розилигингизни билдиринг.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Биз ва бизнинг ҳамкорларимиз ',
              linkText: 'кукисга',
              last:
                ', сингари технологиядан фойдаланамиз ва уларни сизга янада яхшироқ онлайн маҳсулот тақдим этиш, контентни ва ҳамда сизга кўрсатилаётган рекламани айнан сизга мослаш мақсадида тўплаймиз. Агар рози бўлсангиз, марҳамат қилиб буни бизга маълум қилинг!',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Ҳа, мен розиман',
          reject: 'Йўқ, мени ўзгартириш саҳифасига етакланг',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'Мултимедиа ўйнаш бу қурилмада дастакланмайди',
        contentExpired: 'Бу контентни ортиқ тинглаб/томоша қилиб бўлмайди.',
        audio: 'Аудио',
        photogallery: 'Фото галерея',
        video: 'Видео',
        bbc_uzbek_radio: {
          title: 'BBC Uzbek Radio Dasturi',
          subtitle: 'O’zbekiston, mintaqa va dunyo yangiliklari O’zbek tilida',
        },
        bbc_uzbek_tv: {
          title: 'Bi-bi-si O‘zbek - Afg‘oniston uchun TV dastur',
          subtitle:
            'Dastur haftada 5 kun - dushanbadan juma kuniga qadar Toshkent vaqti bilan soat 18.30 -18.40 da efirga uzatiladi',
        },
        listen: 'Тингланг',
        watch: 'Кўринг',
        liveLabel: 'ЖОНЛИ ЭФИР',
        previousRadioShow: 'Аввалги радио дастур',
        nextRadioShow: 'Кейинги радио дастур',
        duration: 'Давомийлиги',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Энг кўп ўқилган',
      lastUpdated: 'Сўнгги янгиланиш:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/uzbek/institutional-50220995',
        text: 'Нега сиз Би-би-сига ишонишингиз мумкин?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text:
          'Ташқи линкларга бизнинг ёндашувимиз қандайлиги ҳақида маълумотга эга бўлинг',
      },
      links: [
        {
          href: 'https://www.bbc.com/uzbek/institutional-36824297',
          text: 'Фойдаланиш шартлари',
        },
        {
          href: 'https://www.bbc.com/uzbek/institutional-36824300',
          text: 'Шахсий ҳаёт махфийлиги сиёсати',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Куки(Cookies)',
        },
        {
          href: 'https://www.bbc.com/uzbek/institutional-36826360',
          text: 'Би-би-си билан боғланиш',
        },
      ],
      copyrightText: 'BBC. Би-би-си ташқи сайтлар мазмуни учун масъул эмас.',
    },
    fonts: [],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Бош саҳифа',
        url: '/uzbek',
      },
      {
        title: 'Lotinda',
        url: '/uzbek/lotin',
      },
      {
        title: 'Ўзбекистон',
        url: '/uzbek/uzbekistan',
      },
      {
        title: 'Минтақа',
        url: '/uzbek/central_asia',
      },
      {
        title: 'Дунё',
        url: '/uzbek/world',
      },
      {
        title: 'Спорт',
        url: '/uzbek/sport',
      },
      {
        title: 'Илм-Фан',
        url: '/uzbek/topics/0f469e6a-d4a6-46f2-b727-2bd039cb6b53',
      },
      {
        title: 'Технология',
        url: '/uzbek/topics/31684f19-84d6-41f6-b033-7ae08098572a',
      },
      {
        title: 'Видео',
        url: '/uzbek/media/video',
      },
    ],
  },
};

export default withContext(service);
