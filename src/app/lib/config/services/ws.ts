import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news',
    atiAnalyticsProducerId: '30',
    atiAnalyticsProducerName: 'BBC_WORLD_NEWS',
    useReverb: true,
    chartbeatDomain: 'bbc.co.uk',
    brandName: 'BBC World Service',
    serviceLocalizedName: 'World Service',
    product: 'BBC News',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/ws/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC World Service',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'ws',
    serviceName: 'News',
    languageName: 'English',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latin,
    homePageTitle: 'Home',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      ads: {
        advertisementLabel: 'Advertisement',
      },
      home: 'Home',
      currentPage: 'Current page',
      skipLinkText: 'Skip to content',
      relatedContent: 'Related content',
      relatedTopics: 'Related topics',
      moreOnThis: '',
      navMenuText: 'Sections',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Live',
        liveCoverage: 'Live Coverage',
        breaking: 'Breaking',
        postedAt: 'Posted at',
        summary: 'Summary',
        shareButtonText: 'Share',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'At a glance',
      error: {
        404: {
          statusCode: '404',
          title: 'Page cannot be found',
          message:
            "Sorry, we're unable to bring you the page you're looking for. Please try:",
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/news',
        },
        500: {
          statusCode: '500',
          title: 'Internal server error',
          message:
            "Sorry, we're currently unable to bring you the page you're looking for. Please try:",
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News homepage.',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/news',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Accept data collection and continue',
            reject: 'Reject data collection and continue',
            initial: {
              title: 'Let us know you agree to data collection on AMP',
              description: {
                first: 'We and our partners use technologies, such as ',
                linkText: 'cookies',
                last: ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Manage my settings',
            },
            manage: {
              title: 'Manage consent settings on AMP pages',
              description: {
                para1:
                  'These settings apply to AMP pages only. You may be asked to set these preferences again when you visit non-AMP BBC pages.',
                para2:
                  'The lightweight mobile page you have visited has been built using Google AMP technology.',
                heading2: 'Strictly necessary data collection',
                para3:
                  'To make our web pages work, we store some limited information on your device without your consent.',
                para4: {
                  text: 'Read more about the essential information we store on your device to make our web pages work.',
                  url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'We use local storage to store your consent preferences on your device.',
                heading3: 'Optional data collection',
                para6:
                  'When you consent to data collection on AMP pages you are consenting to allow us to display personalised ads that are relevant to you when you are outside of the UK.',
                para7: {
                  text: 'Read more about how we personalise ads in the BBC and our advertising partners.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'You can choose not to receive personalised ads by clicking “Reject data collection and continue” below. Please note that you will still see advertising, but it will not be personalised to you.',
                para9:
                  'You can change these settings by clicking “Ad Choices / Do not sell my info” in the footer at any time.',
              },
            },
          },
          canonical: {
            title: 'Let us know you agree to cookies',
            description: {
              uk: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Yes, I agree',
            reject: 'No, take me to settings',
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Audio',
        photogallery: 'Image gallery',
        video: 'Video',
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {},
    },
    mostRead: {
      header: 'Popular Reads',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: false,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Terms of Use',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc/',
          text: 'About the BBC',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/accessibility/',
          text: 'Accessibility Help',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      extraLinks: [
        {
          href: 'https://bbcnews.bbcstudios.com',
          text: 'BBC Studios Commercial Opportunities',
        },
        {
          href: 'https://www.bbc.com/programmes/articles/2x9tqt6mc05vB2S37j8MWMJ/global-short-wave-frequencies',
          text: 'Global Shortwave Frequencies',
        },
      ],
      copyrightText:
        'BBC. The BBC is not responsible for the content of external sites.',
    },
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Home',
        url: '/news',
      },
      {
        title: 'UK',
        url: '/news/uk',
      },
      {
        title: 'World',
        url: '/news/world',
      },
      {
        title: 'Business',
        url: '/news/business',
      },
      {
        title: 'Politics',
        url: '/news/politics',
      },
      {
        title: 'Tech',
        url: '/news/technology',
      },
      {
        title: 'Science',
        url: '/news/science_and_environment',
      },
      {
        title: 'Health',
        url: '/news/health',
      },
      {
        title: 'Family & Education',
        url: '/news/education',
      },
      {
        title: 'Entertainment & Arts',
        url: '/news/entertainment_and_arts',
      },
      {
        title: 'Stories',
        url: '/news/stories',
      },
    ],
    collapsibleNavigation: [
      {
        id: 'home',
        title: 'Home',
        href: '/ws/languages',
      },
      {
        id: 'africa',
        title: 'Africa',
        links: [
          {
            id: 'afaanoromoo',
            href: 'https://www.bbc.com/afaanoromoo',
            label: 'BBC News Afaan Oromoo',
            lang: 'om',
            disableTranslation: true, // skips translation to avoid incorrect translations texts
          },
          {
            id: 'amharic',
            href: 'https://www.bbc.com/amharic',
            label: 'BBC News አማርኛ',
            lang: 'am',
            latinTransliteration: 'Zena be Amharic',
          },
          {
            id: 'afrique',
            href: 'https://www.bbc.com/afrique',
            label: 'BBC News Afrique',
            lang: 'fr',
          },
          {
            id: 'hausa',
            href: 'https://www.bbc.com/hausa',
            label: 'BBC News Hausa',
            lang: 'ha',
          },
          {
            id: 'igbo',
            href: 'https://www.bbc.com/igbo',
            label: 'BBC News Ìgbò',
            lang: 'ig',
          },
          {
            id: 'gahuza',
            href: 'https://www.bbc.com/gahuza',
            label: 'BBC News Gahuza',
            lang: 'rw',
            disableTranslation: true,
          },
          {
            id: 'pidgin',
            href: 'https://www.bbc.com/pidgin',
            label: 'BBC News Pidgin',
            lang: 'pcm',
          },
          {
            id: 'somali',
            href: 'https://www.bbc.com/somali',
            label: 'BBC News Somali',
            lang: 'so',
          },
          {
            id: 'swahili',
            href: 'https://www.bbc.com/swahili',
            label: 'BBC News Swahili',
            lang: 'sw',
          },
          {
            id: 'tigrinya',
            href: 'https://www.bbc.com/tigrinya',
            label: 'BBC News ትግርኛ',
            lang: 'ti',
            latinTransliteration: 'Zena bi Tigrinya',
          },
          {
            id: 'yoruba',
            href: 'https://www.bbc.com/yoruba',
            label: 'BBC News Yorùbá',
            lang: 'yo',
            latinTransliteration: 'Iroyin ni Yoruba',
          },
        ],
      },
      {
        id: 'asia-pacific',
        title: 'Asia Pacific',
        links: [
          {
            id: 'burmese',
            href: 'https://www.bbc.com/burmese',
            label: 'BBC News မြန်မာ',
            lang: 'my',
            latinTransliteration: 'Myanmar satinmyar',
          },
          {
            id: 'zhongwen',
            href: 'https://www.bbc.com/zhongwen/simp',
            label: 'BBC News 中文',
            lang: 'zh-hant',
          },
          {
            id: 'indonesia',
            href: 'https://www.bbc.com/indonesia',
            label: 'BBC News Indonesia',
            lang: 'id',
          },
          {
            id: 'japanese',
            href: 'https://www.bbc.com/japanese',
            label: '日本語ニュース',
            lang: 'ja',
          },
          {
            id: 'korean',
            href: 'https://www.bbc.com/korean',
            label: 'BBC News 코리아',
            lang: 'ko',
          },
          {
            id: 'thai',
            href: 'https://www.bbc.com/thai',
            label: 'BBC News ไทย',
            lang: 'th',
          },
          {
            id: 'vietnamese',
            href: 'https://www.bbc.com/vietnamese',
            label: 'BBC News Tiếng Việt',
            lang: 'vi',
          },
        ],
      },
      {
        id: 'asia-south',
        title: 'Asia South',
        links: [
          {
            id: 'bengali',
            href: 'https://www.bbc.com/bengali',
            label: 'BBC News বাংলা',
            lang: 'bn',
            latinTransliteration: 'Bangla khabar',
          },
          {
            id: 'dari',
            href: 'https://www.bbc.com/dari',
            label: 'BBC News Dari',
            lang: 'fa-AF',
            latinTransliteration: 'BBC News Dari',
            disableTranslation: true,
          },
          {
            id: 'gujarati',
            href: 'https://www.bbc.com/gujarati',
            label: 'BBC News ગુજરાતી',
            lang: 'gu',
            latinTransliteration: 'Gujarati ma samachar',
          },
          {
            id: 'hindi',
            href: 'https://www.bbc.com/hindi',
            label: 'BBC News हिन्दी',
            lang: 'hi',
          },
          {
            id: 'marathi',
            href: 'https://www.bbc.com/marathi',
            label: 'BBC News मराठी',
            lang: 'mr',
            latinTransliteration: 'Marathi batmya',
          },
          {
            id: 'nepali',
            href: 'https://www.bbc.com/nepali',
            label: 'BBC News नेपाली',
            lang: 'ne',
            latinTransliteration: 'Nepali samachar',
          },
          {
            id: 'pashto',
            href: 'https://www.bbc.com/pashto',
            label: 'BBC News پښتو',
            lang: 'ps',
            latinTransliteration: 'Pashto naryawal khparuna',
          },
          {
            id: 'punjabi',
            href: 'https://www.bbc.com/punjabi',
            label: 'BBC News ਪੰਜਾਬੀ',
            lang: 'pa',
            latinTransliteration: 'Punjabi khabaran',
          },
          {
            id: 'sinhala',
            href: 'https://www.bbc.com/sinhala',
            label: 'BBC News සිංහල',
            lang: 'si',
            latinTransliteration: 'Sinhala puwath',
          },
          {
            id: 'tamil',
            href: 'https://www.bbc.com/tamil',
            label: 'BBC News தமிழ்',
            lang: 'ta',
          },
          {
            id: 'telugu',
            href: 'https://www.bbc.com/telugu',
            label: 'BBC News తెలుగు',
            lang: 'te',
            latinTransliteration: 'Telugu vartalu',
          },
          {
            id: 'urdu',
            href: 'https://www.bbc.com/urdu',
            label: 'BBC News اردو',
            lang: 'ur',
            latinTransliteration: 'Urdu mein khabren',
          },
        ],
      },
      {
        id: 'europe',
        title: 'Europe',
        links: [
          {
            id: 'azeri',
            href: 'https://www.bbc.com/azeri',
            label: 'BBC News Azərbaycanca',
            lang: 'az',
          },
          {
            id: 'cymrufyw',
            href: 'https://www.bbc.co.uk/cymrufyw',
            label: 'BBC News Cymru',
            lang: 'cy',
          },
          {
            id: 'kyrgyz',
            href: 'https://www.bbc.com/kyrgyz',
            label: 'BBC News Кыргыз Кызматы',
            lang: 'ky',
            latinTransliteration: 'Kyrgyz tilindegi zhaniliktar',
          },
          {
            id: 'news',
            href: 'https://www.bbc.co.uk/news',
            label: 'News in English',
            lang: 'en',
          },
          {
            id: 'polska',
            href: 'https://www.bbc.com/polska',
            label: 'BBC News Polska',
            lang: 'pl',
          },
          {
            id: 'russian',
            href: 'https://www.bbc.com/russian',
            label: 'BBC News Русская служба',
            lang: 'ru',
          },
          {
            id: 'serbian',
            href: 'https://www.bbc.com/serbian',
            label: 'BBC News na srpskom',
            lang: 'sr-latn',
          },

          {
            id: 'ukrainian',
            href: 'https://www.bbc.com/ukrainian',
            label: 'BBC News Україна',
            lang: 'uk',
          },
          {
            id: 'uzbek',
            href: 'https://www.bbc.com/uzbek',
            label: "BBC News O'zbek",
            lang: 'uz-latn',
            latinTransliteration: "O'zbek tilidagi yangiliklar",
          },
        ],
      },
      {
        id: 'latin-america',
        title: 'Latin America',
        links: [
          {
            id: 'portuguese',
            href: 'https://www.bbc.com/portuguese',
            label: 'BBC News Brasil',
            lang: 'pt',
          },
          {
            id: 'mundo',
            href: 'https://www.bbc.com/mundo',
            label: 'BBC News Mundo',
            lang: 'es',
          },
        ],
      },
      {
        id: 'middle-east',
        title: 'Middle East',
        links: [
          {
            id: 'arabic',
            href: 'http://www.bbc.com/arabic',
            label: 'BBC News عربي',
            lang: 'ar',
          },
          {
            id: 'persian',
            href: 'http://www.bbc.com/persian',
            label: 'BBC News فارسی',
            lang: 'fa',
            latinTransliteration: 'Khabarha be Farsi',
          },
          {
            id: 'turkce',
            href: 'https://www.bbc.com/turkce',
            label: 'BBC News Türkçe',
            lang: 'tr',
          },
        ],
      },
    ],
  },
};

export default withContext(service);
