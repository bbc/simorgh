import cyrillic from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ru';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';
import russianUkrainianSharedTranslations from './russianUkrainianSharedTranslations';

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
      rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
    },
    cookie: {
      amp: {
        accept: 'Принять сбор данных и продолжить',
        reject: 'Отказать в сборе данных и продолжить',
        initial: {
          title: 'Сообщите нам, согласны ли вы на сбор данных на AMP-страницах',
          description: {
            first:
              'Мы вместе с нашими партнерами используем технологии, такие как ',
            linkText: 'cookies',
            last: ', а также собираем данные, чтобы вам было удобно пользоваться сайтом и чтобы содержание и реклама, которую вы видите, соответствовали вашим запросам. Пожалуйста, сообщите, согласны ли вы.',
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          manage: 'Изменить мои установки',
        },
        manage: {
          title: 'Изменить установки на AMP-страницах',
          description: {
            para1:
              'Эти установки относятся только к AMP-страницам. Вам нужно будет выставить эти преференции опять, если вы посетите страницы BBC, которые не поддерживают AMP.',
            para2:
              'Облегченная мобильная страница создана с использованием AMP-технологии от Google.',
            heading2: 'Сбор самых необходимых данных',
            para3:
              'Для того чтобы наши веб-страницы работали, мы храним ограниченную информацию о вашем девайсе без вашего согласия.',
            para4: {
              text: 'Прочесть подробнее о базовой информации, которую мы храним на вашем устройстве, чтобы на нем отображались наши веб-страницы (на англ. языке).',
              url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
            },
            para5:
              'Мы используем местные серверы для хранения согласованных вами преференций для вашего девайса.',
            heading3: 'Сбор необязательной информации',
            para6:
              'Когда вы даете согласие на сбор данных на AMP-странице, вы соглашаетесь на то, чтобы мы показывали вам рекламу, специально подобранную для вас, когда вы находитесь за пределами Великобритании.',
            para7: {
              text: 'Прочесть подробнее о том, как BBC и его рекламные партнеры подбирают реламу для вас.',
              url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
            },
            para8:
              'Вы можете отказаться от персонифицированной рекламы, кликнув на "Отказаться от сбора данных и продолжить" внизу. Пожалуйста, помните, что вы все равно будете получать рекламу, но она не будет подобрана под вас.',
            para9:
              'Вы можете изменить эти установки, кликнув на "Ad Choices / Do not sell my info"  в самом низу страницы, в любое время.',
          },
        },
      },
      canonical: {
        title: 'Сообщить, что вы согласны с использованием cookies',
        description: {
          uk: {
            first: 'Мы используем ',
            linkText: 'cookies',
            last: ', чтобы вам было удобно пользоваться сайтом. Сообщите нам, что вы согласны с использованием этих cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Мы используем ',
            linkText: 'cookies',
            last: ', чтобы вам было удобно пользоваться сайтом. Сообщите нам, что вы согласны с использованием этих cookies.',
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Да',
        reject: 'Нет, мне надо посмотреть настройки',
        rejectUrl:
          'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
  },
};

export const service: DefaultServiceConfig = {
  default: {
    translations: {
      ...russianUkrainianSharedTranslations,
      ...headerFooterTranslations,
    },
    lang: `ru`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Обновлено',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-russian',
    atiAnalyticsProducerId: '75',
    atiAnalyticsProducerName: 'RUSSIAN',
    chartbeatDomain: 'russian.bbc.co.uk',
    brandName: 'BBC News Русская служба',
    product: 'BBC News',
    serviceLocalizedName: 'Русская служба',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/russian/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News Русская служба',
    dir: `ltr`,
    externalLinkText: ', внешняя',
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
    languageName: 'Russian',
    twitterCreator: '@bbcrussian',
    twitterSite: '@bbcrussian',
    noBylinesPolicy:
      'https://www.bbc.com/russian/institutional-50098149#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/russian/institutional-50098149',
    isTrustProjectParticipant: true,
    script: cyrillic,
    manifestPath: '/russian/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Главная',
    iTunesAppId: 504278066,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    googleSiteVerification: 'D-aEHUiyVaMoUJXjVRbDVkxS0dLTMUZLD3dLPTnWO4Q',
    mostRead: {
      header: 'Популярное',
      lastUpdated: 'Последнее обновление:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    recommendations: {
      header: 'Самое популярное',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    podcastPromo: {
      title: 'WhatsApp',
      brandTitle: 'Канал Би-би-си в WhatsApp',
      brandDescription:
        'Тут мы публикуем только главные новости и самые интересные тексты. Канал доступен для нероссийских номеров.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0jq48n8.png',
        alt: 'WhatsApp',
      },
      linkLabel: {
        text: 'Подписывайтесь',
        href: 'https://whatsapp.com/channel/0029VaZ437k4Y9li4jkzIU0G',
      },
      skipLink: {
        text: 'Пропустить Реклама WhatsApp-канала и продолжить чтение.',
        endTextVisuallyHidden: 'Конец истории Реклама WhatsApp-канала',
      },
    },
    disclaimer: {
      para1: {
        text: 'Подпишитесь на нашу рассылку «Контекст»:',
        url: 'https://www.bbc.com/russian/resources/idt-b34bb7dd-f094-4722-92eb-cf7aff8cc1bc',
        isExternal: false,
      },
      para2: ' она поможет вам разобраться в событиях.',
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/russian/institutional-50098149',
        text: 'Почему BBC News заслуживает доверия',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/links-and-feeds',
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
          href: 'https://www.bbc.co.uk/russian/send/u50853643',
          text: 'Связаться с Би-би-си',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Би-би-си на других языках',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-би-си не несет ответственности за содержание других сайтов.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Главная',
        url: '/russian',
      },
      {
        title: 'Война в Украине',
        url: '/russian/topics/cez0n29ggrdt',
      },
      {
        title: 'Сводка потерь',
        url: '/russian/topics/cqx9qqylwvgt',
      },
      {
        title: 'Истории',
        url: '/russian/topics/cv27xky1pppt',
      },
      {
        title: 'Видео',
        url: '/russian/topics/c44vyp57qy4t',
      },
      {
        title: 'Фильмы',
        url: '/russian/topics/cl4x0jkk3e5t',
      },
      {
        title: 'Подкасты',
        url: '/russian/topics/c3l19z3z0p2t',
      },
    ],
  },
};

export default withContext(service);
