import cyrillic from '../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/uk';
import withContext from '../../../contexts/utils/withContext';
import { mainTranslations as russianMainTranslations } from './russian';
import { UkrainianConfig } from '../../../models/types/serviceConfig';
import { Direction, Services } from '../../../models/types/global';

const secondaryColumnTranslations = {
  topStoriesTitle: 'Головне',
  featuresAnalysisTitle: 'Докладно',
};

const baseServiceConfig = {
  articleAuthor: `http://www.facebook.com/bbcnews`,
  articleTimestampPrefix: 'Оновлено: ',
  atiAnalyticsAppName: 'news-ukrainian',
  atiAnalyticsProducerId: '94',
  atiAnalyticsProducerName: 'UKRAINIAN',
  useReverb: true,
  chartbeatDomain: 'ukrainian.bbc.co.uk',
  brandName: 'BBC News Україна',
  product: 'BBC News',
  serviceLocalizedName: 'Україна',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukrainian.png',
  defaultImageAltText: 'BBC News Україна',
  dir: 'ltr' as Direction,
  externalLinkText: ', зовнішнє',
  imageCaptionOffscreenText: 'Підпис до фото, ',
  videoCaptionOffscreenText: 'Підпис до відео, ',
  audioCaptionOffscreenText: 'Підпис до аудіо',
  defaultCaptionOffscreenText: 'Підпис, ',
  imageCopyrightOffscreenText: 'Автор фото, ',
  service: 'ukrainian' as Services,
  serviceName: 'Ukrainian',
  twitterCreator: '@BBC_ua',
  twitterSite: '@BBC_ua',
  noBylinesPolicy:
    'https://www.bbc.com/ukrainian/institutional-50170368#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/ukrainian/institutional-50170368',
  isTrustProjectParticipant: true,
  script: cyrillic,
  manifestPath: '/ukrainian/manifest.json',
  swPath: '/sw.js',
  homePageTitle: 'Новини',
  showAdPlaceholder: true,
  showRelatedTopics: true,
  podcastPromo: {
    title: 'WhatsApp',
    brandTitle: 'BBC Україна тепер у WhatsApp',
    brandDescription: 'Головне про Україну та світ - у нашому WhatsApp-каналі',
    image: {
      src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0kv11pb.png',
      alt: 'BBC News Україна підписуйтеся на наш WhatsApp',
    },
    linkLabel: {
      text: 'Клікніть тут, щоб підписатися',
      href: 'https://www.whatsapp.com/channel/0029Vau5deM0QeaqQRTPVs2e',
    },
    skipLink: {
      text: 'Пропустити %title% і продовжити',
      endTextVisuallyHidden: 'Кінець %title%',
    },
  },
  translations: {
    pagination: {
      previousPage: 'Повернутися',
      nextPage: 'Наступна',
      pageXOfY: 'Page {x} із {y}',
    },
    ads: {
      advertisementLabel: 'Реклама',
    },
    seeAll: 'Подивитись все',
    home: 'Головна',
    currentPage: 'Поточна сторінка',
    skipLinkText: 'Перейти до змісту',
    navMenuText: 'Розділи',
    mediaAssetPage: {
      mediaPlayer: 'Медіаплеєр',
      audioPlayer: 'Аудіоплеєр',
      videoPlayer: 'Відеоплеєр',
    },
    liveExperiencePage: {
      liveLabel: 'Наживо',
      liveCoverage: 'Висвітлення наживо',
      breaking: 'Терміново',
      postedAt: 'Опубілковано о',
      summary: 'Стисло',
      shareButtonText: 'Поділитися',
    },
    downloads: {
      instructions: 'You can download and view today’s news.',
      title: 'File Download',
    },
    gist: 'Стисло',
    error: {
      404: {
        statusCode: '404',
        title: 'Сторінку не знайдено',
        message:
          'Вибачте, ми не знайшли сторінку, яку ви шукали. Спробуйте це:',
        solutions: [
          'Перевірте ще раз адресу посилання',
          'Натисніть на кнопку "оновити" в браузері',
          'Шукати сторінку в пошуковому вікні BBC',
        ],
        callToActionFirst: 'Спробуйте зайти на головну сторінку ',
        callToActionLinkText: 'BBC News Україна',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/ukrainian',
      },
      500: {
        statusCode: '500',
        title: 'Помилка серверу',
        message:
          'Вибачте, ми не змогли знайти сторінку, яку ви шукали. Спробуйте:',
        solutions: [
          'Натиснути кнопку "оновити" у вашому браузері',
          'Спробуйте пізніше',
        ],
        callToActionFirst: 'Спробуйте зайти на головну сторінку ',
        callToActionLinkText: 'Повернутися на головну',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/ukrainian',
      },
    },
    consentBanner: {
      privacy: {
        title:
          'Ми оновили наші правила використання особистих даних і файлів cookies',
        description: {
          uk: {
            first:
              'Ми змінили правила використання особистих даних і файлів cookies та хотіли б повідомити вам, що це означає для вас і ваших особистих даних.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'Ми змінили правила використання особистих даних і файлів cookies та хотіли б повідомити вам, що це означає для вас і ваших особистих даних.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'ОК',
        reject: 'Подивитися, що змінилося',
        rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
      },
      cookie: {
        amp: {
          accept: 'Погодитися на збір даних та продовжити.',
          reject: 'Відмовитися від збору даних та продовжити',
          initial: {
            title: 'Повідомте, що ви погоджуєтесь на збір даних на AMP',
            description: {
              first:
                'Ми разом з нашими партнерами використовуємо технології, такі як ',
              linkText: 'cookies',
              last: ', а також збираємо дані, щоб вам було зручно користуватися сайтом і щоб контент і реклама, яку ви бачите, відповідали вашим запитам. Будь ласка, повідомте, чи ви згодні.',
              linkUrl:
                'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            manage: 'Керувати налаштуваннями',
          },
          manage: {
            title: 'Керувати налаштуваннями щодо згоди на АМР-сторінках',
            description: {
              para1:
                'Ці налаштування стосуються лише сторінок AMP. Вас можуть попросити зазначити свої уподобання ще раз, якщо ви відвідуватимете інші сторінки bbc.com, які не є AMP-сторінками.',
              para2:
                'Мобільна сторінка, яку ви відвідували, створена за технологією Google AMP.',
              heading2: "Обов'язковий збір даних",
              para3:
                'Щоб забезпечити роботу наших сторінок, ми зберігаємо обмежену інформацію на вашому пристрої без вашої згоди.',
              para4: {
                text: 'Тут можна почитати докладніше про необхідну інформацію, яку ми зберігаємо на вашому пристрої, щоб забезпечити роботу наших вебсторінок.',
                url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
              },
              para5:
                "Ми використовуємо локальну пам'ять, щоб зберігати ваші уподобання щодо згоди на вашому пристрої.",
              heading3: "Необов'язковий збір інформації",
              para6:
                'Коли ви даєте згоду на збір даних на сторінках AMP, ви погоджуєтеся дозволити показувати вам персоналізовану рекламу, актуальну для вас, коли ви перебуваєте за межами Великої Британії.',
              para7: {
                text: 'Докладніше про те, як ми персоналізуємо рекламу на BBC та у наших рекламних партнерів можна прочитати тут.',
                url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
              },
              para8:
                'Ви можете не отримувати персоналізовану рекламу, натиснувши "Відмовитися від збору даних та продовжити" нижче. Зверніть увагу, що реклама все одно буде показуватися, але вона не буде персоналізованою для вас.',
              para9:
                'Ви можете змінити ці налаштування, натиснувши кнопку "Вибір реклами/Не продавати мою інформацію" в нижній частині сторінки у будь-який час.',
            },
          },
        },
        canonical: {
          title:
            'Повідомити, що ви погоджуєтесь з використанням файлів cookies',
          description: {
            uk: {
              first: 'Ми використовуємо ',
              linkText: 'cookies',
              last: ', щоб вам було зручно користуватися сайтом. Повідомте нам, що ви погоджуєтесь з використанням цих файлів cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Ми використовуємо ',
              linkText: 'cookies',
              last: ', щоб вам було зручно користуватися сайтом. Повідомте нам, що ви погоджуєтесь з використанням цих файлів cookies.',
              linkUrl:
                'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Так, згоден',
          reject: 'Ні, мені потрібно переглянути налаштування',
          rejectUrl:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
    },
    media: {
      noJs: 'Ваш пристрій не підтримує відтворення мультимедійних файлів',
      contentExpired: 'Контент більше не доступний',
      contentNotYetAvailable: 'Ця програма ще не доступна.',
      audio: 'Аудіо',
      photogallery: 'Фотогалерея',
      video: 'Відео',
      bbc_ukrainian_tv: {
        title: 'Випуск новин',
        subtitle:
          'BBC News Україна розповідає про головні події дня на Громадському і на сайті bbc.ua',
      },
      listen: 'Прослухати',
      watch: 'Дивитися',
      listenLive: 'Слухати наживо',
      listenNext: 'Слухати наступний',
      liveLabel: 'LIVE',
      nextLabel: 'NEXT',
      previousRadioShow: 'Попередня радіопрограма',
      nextRadioShow: 'Наступна радіопрограма',
      duration: 'Тривалість',
      recentEpisodes: 'Більше',
      podcastExternalLinks: 'Цей подкаст доступний у',
      download: 'Завантажити епізод',
      closeVideo: 'Вийти',
    },
    socialEmbed: {
      caption: {
        textPrefixVisuallyHidden: 'Підпис до відео, ',
        text: 'Увага: інші сайти можуть містити рекламу',
        articleText:
          'Увага: BBC не несе відповідальності за контент зовнішніх сайтів.',
        articleAdditionalText: 'Контент %provider_name% може містити рекламу',
      },
      fallback: {
        text: 'Контент недоступний',
        linkText: 'Дивіться більше у %provider_name%',
        linkTextSuffixVisuallyHidden: ', зовнішнє посилання',
        warningText: 'BBC не несе відповідальності за контент інших сайтів.',
      },
      skipLink: {
        text: 'Пропустити %provider_name% допис',
        endTextVisuallyHidden: 'Кінець %provider_name% допису',
      },
      consentBanner: {
        heading: `Дозволити контент [social_media_site]?`,
        body: `Ця стаття містить контент, наданий [social_media_site]. Ми питаємо про ваш дозвіл перед завантаженням, тому що сайт може використовувати файли cookie та інші технології. Ви можете ознайомитися з політикою щодо файлів [link] cookie [social_media_site] [/link] i [link] політикою конфіденційності [/link], перш ніж надати дозвіл. Щоб переглянути цей контент, виберіть "Прийняти та продовжити".`,
        button: 'Прийняти та продовжити',
      },
    },
    include: {
      errorMessage:
        'Вибачте, ми не можемо відобразити цю частину сторінки у мобільній версії.',
      linkText:
        'Перегляньте повну версію сторінки, щоб побачити увесь контент.',
    },
    relatedContent: 'Статті на цю ж тему',
    relatedTopics: 'Також на цю тему',
    ...secondaryColumnTranslations,
  },
  mostRead: {
    header: 'Найпопулярніше',
    lastUpdated: 'Останнє оновлення:',
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
      href: 'https://www.bbc.com/ukrainian/institutional-50170368',
      text: 'Чому BBC заслуговує на довіру',
    },
    externalLink: {
      href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
      text: 'Ознайомтеся з нашими правилами зовнішніх посилань.',
    },
    links: [
      {
        href: 'https://www.bbc.com/ukrainian/institutional-38144387',
        text: 'Правила користування',
      },
      {
        href: 'https://www.bbc.com/ukrainian/institutional-38144827',
        text: 'Особисті дані',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.co.uk/ukrainian/send/u50853885',
        text: 'Напишіть на ВВС',
      },
      {
        href: 'https://www.bbc.com/ws/languages',
        text: 'Новини ВВС іншими мовами',
      },
      {
        id: 'COOKIE_SETTINGS',
        href: '#',
        text: 'Do not share or sell my info',
        lang: 'en-GB',
      },
    ],
    copyrightText: 'BBC. BBC не несе відповідальності за контент інших сайтів.',
  },
  timezone: 'GMT',
  navigation: [
    {
      title: 'Головна',
      url: '/ukrainian',
    },
    {
      title: 'Війна з Росією',
      url: '/ukrainian/topics/czp6w66edqpt',
    },
    {
      title: 'Історії',
      url: '/ukrainian/topics/czrxg3vzy44t',
    },
    {
      title: 'Відео',
      url: '/ukrainian/topics/c44vmzqkzqqt',
    },
    {
      title: 'Книга року BBC',
      url: '/ukrainian/topics/cqwrq3rkdrnt',
    },
    {
      title: 'Подкасти',
      url: '/ukrainian/podcasts/p09jsy3h',
    },
  ],
};

export const service: UkrainianConfig = {
  default: {
    ...baseServiceConfig,
    datetimeLocale: 'uk',
    locale: 'uk_UA',
    languageName: 'Ukrainian',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'uk',
    lang: 'uk',
  },
  'ru-UA': {
    ...baseServiceConfig,
    languageName: 'Russian',
    translations: {
      ...baseServiceConfig.translations,
      ...russianMainTranslations,
      ...secondaryColumnTranslations,
      relatedTopics: 'Темы',
    },
    datetimeLocale: 'ru',
    serviceDatetimeLocale: 'uk',
    locale: 'ru_UA',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ru',
    lang: 'ru-UA',
    serviceLang: 'uk',
  },
};

export default withContext(service);
