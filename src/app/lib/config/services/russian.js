import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import {
  F_REITH_SANS_BOLD,
  F_REITH_SANS_BOLD_ITALIC,
  F_REITH_SANS_ITALIC,
  F_REITH_SANS_REGULAR,
  F_REITH_SERIF_MEDIUM,
  F_REITH_SERIF_MEDIUM_ITALIC,
  F_REITH_SERIF_LIGHT,
} from '@bbc/psammead-styles/fonts';
import { russian as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/ru';
import withContext from '../../../contexts/utils/withContext';

// Translations used in the header and footer elements of the page
const headerFooterTranslations = {
  home: 'Главная',
  currentPage: 'Текущая страница',
  navMenuText: 'Разделы',
  consentBanner: {
    privacy: {
      title: 'Мы обновили наши правила использования личных данных и куки.',
      description: {
        uk: {
          first:
            'Мы внесли важные изменения в наши правила использования личных данных и cookies и хотели бы сообщить вам, что это значит для вас и ваших личных данных.',
          linkText: null,
          last: null,
          linkUrl: null,
        },
        international: {
          first:
            'Мы внесли важные изменения в наши правила использования личных данных и cookies и хотели бы сообщить вам, что это значит для вас и ваших личных данных.',
          linkText: null,
          last: null,
          linkUrl: null,
        },
      },
      accept: 'ОК',
      reject: 'Посмотреть, что изменилось',
      rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
    },
    cookie: {
      title: 'Сообщить, что вы согласны с использованием cookies',
      description: {
        uk: {
          first: 'Мы используем ',
          linkText: 'cookies',
          last:
            ', чтобы вам было удобно пользоваться сайтом. Сообщите нам, что вы согласны с использованием этих cookies.',
          linkUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
        },
        international: {
          first:
            'Мы вместе с нашими партнерами используем технологии, такие как ',
          linkText: 'cookies',
          last:
            ', а также собираем данные, чтобы вам было удобно пользоваться сайтом и чтобы содержание и реклама, которую вы видите, соответствовали вашим запросам. Пожалуйста, сообщите, согласны ли вы.',
          linkUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
        },
      },
      accept: 'Да, согласен',
      reject: 'Нет, мне надо посмотреть настройки',
      rejectUrl:
        'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
    },
  },
};

// Translations used in the main element of the page
export const mainTranslations = {
  seeAll: 'Посмотреть все',
  skipLinkText: 'Перейти к содержанию',
  relatedContent: 'Новости по теме',
  mediaAssetPage: {
    mediaPlayer: 'Медиа плеер',
    audioPlayer: 'Аудио плеер',
    videoPlayer: 'Видео плеер',
  },
  error: {
    404: {
      statusCode: '404',
      title: 'Страница не найдена',
      message:
        'Извините, мы не нашли страницу, которую вы искали. Попробуйте это:',
      solutions: [
        'Проверьте еще раз адрес ссылки',
        'Нажмите на кнопку "обновить" в браузере',
        'Искать страницу в поисковом окне Би-би-си',
      ],
      callToActionFirst: 'Попробуйте зайти на ',
      callToActionLinkText: 'главную страницу Русской службы',
      callToActionLast: '',
      callToActionLinkUrl: 'https://www.bbc.com/russian',
    },
    500: {
      statusCode: '500',
      title: 'Ошибка сервера',
      message:
        'Извините, мы не смогли найти страницу, которую вы искали. Попробуйте:',
      solutions: [
        'Нажать кнопку "обновить" в вашем браузере',
        'Попытайтесь позже',
      ],
      callToActionFirst: 'Попробуйте зайти на ',
      callToActionLinkText: 'главную страницу Русской службы',
      callToActionLast: '',
      callToActionLinkUrl: 'https://www.bbc.com/russian',
    },
  },
  media: {
    noJs:
      'Для просмотра этого контента вам надо включить JavaScript или использовать другой браузер',
    contentExpired: 'Контент больше не доступен.',
    contentNotYetAvailable: 'Эта передача еще не доступна для воспроизведения.',
    audio: 'Аудио',
    photogallery: 'Фотогалерея',
    video: 'Видео',
    bbc_russian_radio: {
      title: 'Русская служба Би-би-си',
      subtitle:
        'мировые новости с местным колоритом. Как видятся события в России и регионе из-за рубежа.',
    },
    bbc_russian_tv: {
      title: 'Выпуск новостей Русской службы Би-би-си',
      subtitle:
        'Смотрите лучшие репортажи Би-би-си из России и со всего мира. Каждый день - с понедельника по пятницу – в выпуске теленовостей Би-би-си наши корреспонденты помогут вам понять, что происходит и почему это важно для вас.',
    },
    listen: 'Слушать',
    watch: 'Смотреть',
    liveLabel: 'LIVE',
    nextLabel: 'Дальше',
    previousRadioShow: 'Предыдущая передача',
    nextRadioShow: 'Следующая передача',
    duration: 'Продолжительность',
  },
  socialEmbed: {
    caption: {
      textPrefixVisuallyHidden: 'Подпись к видео, ',
      text: 'Внимание: Контент других сайтов может содержать рекламу.',
    },
    fallback: {
      text: 'Контент недоступен',
      linkText: 'Смотреть еще в %provider_name%',
      linkTextSuffixVisuallyHidden: ', внешняя ссылка',
      warningText:
        'Би-би-си на несет ответственности за содержание других сайтов.',
    },
    skipLink: {
      text: 'Пропустить контент из %provider_name%',
      endTextVisuallyHidden: 'Контент из %provider_name% окончен',
    },
  },
  topStoriesTitle: 'Главное',
  featuresAnalysisTitle: 'Журнал',
};

export const service = {
  default: {
    translations: { ...mainTranslations, ...headerFooterTranslations },
    ads: {
      hasAds: true,
      advertisementLabel: 'Реклама',
    },
    lang: `ru`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Обновлено',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-russian',
    atiAnalyticsProducerId: '75',
    chartbeatDomain: 'russian.bbc.co.uk',
    brandName: 'BBC News Русская служба',
    product: 'BBC News',
    serviceLocalizedName: 'Русская служба',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/russian.png',
    defaultImageAltText: 'BBC News Русская служба',
    dir: `ltr`,
    externalLinkText: ', внешняя ссылка',
    imageCaptionOffscreenText: 'Подпись к фото, ',
    videoCaptionOffscreenText: 'Подпись к видео, ',
    audioCaptionOffscreenText: 'Подпись к аудио, ',
    defaultCaptionOffscreenText: 'Подпись, ',
    imageCopyrightOffscreenText: 'Автор фото, ',
    locale: `ru-RU`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ru',
    datetimeLocale: `ru`,
    service: 'russian',
    serviceName: 'Russian',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcrussian',
    twitterSite: '@bbcrussian',
    noBylinesPolicy:
      'https://www.bbc.com/russian/institutional-50098149#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/russian/institutional-50098149',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Главная',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    brandSVG,
    mostRead: {
      header: 'Самое популярное',
      lastUpdated: 'Последнее обновление:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/russian/institutional-50098149',
        text: 'Почему BBC News заслуживает доверия',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Познакомьтесь с нашими правилами внешних ссылок.',
      },
      links: [
        {
          href: 'https://www.bbc.com/russian/institutional-36515745',
          text: 'Правила использования',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36515748',
          text: 'О Би-би-си',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36517234',
          text: 'Личные данные',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Куки',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36517237',
          text: 'Связаться с Би-би-си',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-би-си не несет ответственности за содержание других сайтов.',
    },
    fonts: [
      F_REITH_SANS_BOLD,
      F_REITH_SANS_BOLD_ITALIC,
      F_REITH_SANS_ITALIC,
      F_REITH_SANS_REGULAR,
      F_REITH_SERIF_MEDIUM,
      F_REITH_SERIF_MEDIUM_ITALIC,
      F_REITH_SERIF_LIGHT,
    ],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Главная',
        url: '/russian',
      },
      {
        title: 'Коронавирус',
        url: '/russian/in-depth-51962199',
      },
      {
        title: 'Истории',
        url: '/russian/features-50983593',
      },
      {
        title: 'Видео',
        url: '/russian/media/video',
      },
      {
        title: 'Фильмы',
        url: '/russian/in-depth-48104242',
      },
      {
        title: 'Подкасты',
        url: '/russian/media-47937790',
      },
    ],
  },
};

export default withContext(service);
