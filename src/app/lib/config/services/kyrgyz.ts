import cyrillic from '../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ky';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ky`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Жаңылоо',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-kyrgyz',
    atiAnalyticsProducerId: '58',
    atiAnalyticsProducerName: 'KYRGYZ',
    useReverb: true,
    chartbeatDomain: 'kyrgyz.bbc.co.uk',
    brandName: 'BBC News Кыргыз Кызматы',
    product: 'BBC News',
    serviceLocalizedName: 'Кыргыз КызMATы',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/kyrgyz.png',
    defaultImageAltText: 'BBC News Кыргыз КызMATы',
    dir: `ltr`,
    externalLinkText: ', баракчалар',
    imageCaptionOffscreenText: 'Сүрөттүн түшүндүрмөсү, ',
    videoCaptionOffscreenText: 'Видеонун түшүндүрмөсү, ',
    audioCaptionOffscreenText: 'Аудионун түшүндүрмөсү, ',
    defaultCaptionOffscreenText: 'Түшүндүрмө, ',
    imageCopyrightOffscreenText: 'Сүрөттүн булагы, ',
    locale: `ky-KG`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ky',
    datetimeLocale: `ky`,
    service: 'kyrgyz',
    serviceName: 'News Кыргыз КызMATы',
    languageName: 'Kyrgyz',
    twitterCreator: '@bbckyrgyz',
    twitterSite: '@bbckyrgyz',
    noBylinesPolicy:
      'https://www.bbc.com/kyrgyz/institutional-49677275#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/kyrgyz/institutional-49677275',
    isTrustProjectParticipant: true,
    script: cyrillic,
    manifestPath: '/kyrgyz/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Кабарлар, акыркы мүнөттөгү кабарлар, талдоо, видео',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'бет',
        previousPage: 'Артка',
        nextPage: 'Эмики барак',
        pageXOfY: 'бет {x} of {y}',
      },
      ads: {
        advertisementLabel: 'Жарнама',
      },
      seeAll: 'Баарын көрүү',
      home: 'Башталгыч бет',
      currentPage: 'Ачылып турган баракча',
      skipLinkText: 'Сайтка өтүү',
      relatedContent: 'Тема боюнча башка макалалар',
      relatedTopics: 'Тектеш темалар',
      navMenuText: 'Бөлүмдөр',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Түз алып баруу',
        liveCoverage: 'Түз алып баруу',
        breaking: 'Чукул кабар',
        postedAt: 'Чыгарылган убакыт',
        summary: 'Корутунду',
        shareButtonText: 'Бөлүшүү',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Корутунду',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Маалымат топтоого уруксат берип, улантуу',
            reject: 'Маалымат топтоого уруксат бербей улантуу',
            initial: {
              title: 'AMP баракчаларынан маалымат топтоого уруксатпы?',
              description: {
                first:
                  'Биз жана өнөктөштөрүбүз сайтыбызда иштөөнү жакшыртуу үчүн ',
                linkText: 'cookies',
                last: ' колдонуп, браузердеги маалыматты топтойт. Бул аркылуу сиз жактырган контент жана жарнамалар көрсөтүлөт. Буга макулсузбу?',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Тескөө',
            },
            manage: {
              title: 'AMP баракчаларын тескөө',
              description: {
                para1:
                  'Сиз тандаган тескөөлөр AMP баракчасына таандык. Би-Би-Синин AMP саналбаган баракчасына кирип калсаңыз, кайра тескөөгө туура келиши мүмкүн.',
                para2:
                  'Уюлдук телефондо тез жүктөлгөн атайын баракча Google AMP технологиясы менен жасалган.',
                heading2:
                  'Баракчаны иштетүүгө маанилүү болгон маалымат гана топтолду',
                para3:
                  'Баракча тез жүктөлүшү үчүн сизден уруксат албай туруп телефонуңузга маалымат сакталат.',
                para4: {
                  text: 'Баракча тез жүктөлүшү үчүн кандай маалымат сакталып жатканы тууралуу кеңири маалымат алыңыз.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Ылайыктуу контент тууралуу маалымат телефонуңузда сакталат.',
                heading3: 'Кошумча маалымат чогултуу',
                para6:
                  'AMP баракчаларынан маалымат топтоого уруксат бергенде, Британиядан  тышкары мамлекеттерде жеке өзүңүзгө ылайыктуу жарнама сунуштоого дагы уруксат берип жатасыз.',
                para7: {
                  text: 'Би-Би-Си баракчаларында жарнамалар жеке сизге ылайыктуу болгудай тандалганы тууралуу кеңири маалымат алыңыз.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Жеке сизге ылайыктуу жарнамалардан баш тарткыңыз келсе "Маалымат топтоого уруксат бербей улантууну" тандаңыз. Сиз жарнамаларды көрө бересиз, бирок алар жеке сизге ылайыкталган эмес.',
                para9:
                  'Тескөөнү каалаган учурда өзгөртсөңүз болот. Ал үчүн баракчанын астындагы “Ad Choices / Do not sell my info” бөлүмүн каалаган учурда басып, өзүңүзгө ылайыктуу болгондой тескеп алууга мүмкүн.',
              },
            },
          },
          canonical: {
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
                first: 'Биздин сайтыбызда иштөөнү жакшыртуу үчүн ',
                linkText: 'cookies',
                last: ' колдонобуз. Cookies боюнча эрежелерге макулсузбу?',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Ооба, мен макулмун',
            reject: 'Жок, мени жөндөө баракчасына алып бар',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Жабдыгыңыз медианын бул түрүн ойнотууга ылайыктуу эмес.',
        contentExpired: 'Бул маалымат мындан ары ачылбайт',
        contentNotYetAvailable: 'Бул программа ойнотууга даяр эмес.',
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
        listen: 'Угуу',
        watch: 'Көрүү',
        listenLive: 'Түз ободо угуу',
        listenNext: 'Кийнкисин угуңуз',
        liveLabel: 'Түз ободо',
        nextLabel: 'NEXT',
        previousRadioShow: 'Мурдагы радио программа',
        nextRadioShow: 'Кезектеги радио программа',
        duration: 'Узактыгы',
        recentEpisodes: 'Мурдагы берүүлөр',
        podcastExternalLinks: 'Бул подкастты башка платформалардан дагы угуңуз',
        download: 'Подкастты жүктөп алыңыз',
        closeVideo: 'Чыгуу',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Видеонун түшүндүрмөсү, ',
          text: 'Эскертүү: Жарнамалар болушу ыктымал',
          articleText:
            'Эскертүү: Би-Би-Си тышкы сайттардын мазмуну үчүн жооп бербейт.',
          articleAdditionalText:
            '%provider_name% мазмунунда жарнама болушу мүмкүн',
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
        consentBanner: {
          heading: `[social_media_site] мазмуну көрсөтүлсүнбү?`,
          body: `Бул макалада [social_media_site] мазмуну бар. Алар кукилерди ж.б. технологияларды колдонушу мүмкүн. Ошондуктан жүктөөрдөн мурда сизден уруксат суралат.`,
        },
      },
      include: {
        errorMessage: 'Кечиресиз, бул баракча мобилдик телефондо ачылбайт',
        linkText: 'Башкы беттин толук версиясын ачыңыз',
      },
      topStoriesTitle: 'Башкы кабарлар',
      featuresAnalysisTitle: 'Редактордун тандоосу',
      latestMediaTitle: 'Соңку',
    },
    mostRead: {
      header: 'Эң көп окулгандар',
      lastUpdated: 'Акыркы жаңылоо:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      header: 'Эң көп окулгандар',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/kyrgyz/institutional-49677275',
        text: 'Эмнеге BBC News ишенсе болот?',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/kyrgyz/send/u50853445',
          text: 'Би-Би-Си менен байланышыңыз',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Башка тилдерде',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-Би-Си сырткы интернет сайттардын мазмуну үчүн жооптуу эмес.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Башталгыч бет',
        url: '/kyrgyz',
      },
      {
        title: 'Кыргызстан',
        url: '/kyrgyz/topics/cz74kjpyk07t',
      },
      {
        title: 'Дүйнө',
        url: '/kyrgyz/topics/ck2l9z012nkt',
      },
      {
        title: 'САПАР',
        url: '/kyrgyz/topics/c6z8lg83w7mt',
      },
      {
        title: 'Журнал',
        url: '/kyrgyz/topics/czp8pjrkgp0t',
      },
      {
        title: 'Подкасттар',
        url: '/kyrgyz/podcasts/p0c80v81',
      },
    ],
  },
};

export default withContext(service);
