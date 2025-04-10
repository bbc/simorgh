import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Africa/Nairobi';
import '#psammead/psammead-locales/moment/sw';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `sw`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Imeboreshwa',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-swahili',
    atiAnalyticsProducerId: '86',
    atiAnalyticsProducerName: 'SWAHILI',
    useReverb: true,
    chartbeatDomain: 'swahili.bbc.co.uk',
    brandName: 'BBC News Swahili',
    product: 'BBC News',
    serviceLocalizedName: 'Swahili',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/swahili.png',
    defaultImageAltText: 'BBC News Swahili',
    dir: `ltr`,
    externalLinkText: ', ya nje',
    imageCaptionOffscreenText: 'Maelezo ya picha, ',
    videoCaptionOffscreenText: 'Maelezo ya video, ',
    audioCaptionOffscreenText: 'Maelezo ya sauti, ',
    defaultCaptionOffscreenText: 'Maelezo, ',
    imageCopyrightOffscreenText: 'Chanzo cha picha, ',
    locale: `sw-KE`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'sw',
    datetimeLocale: `sw`,
    service: 'swahili',
    serviceName: 'Swahili',
    languageName: 'Swahili',
    twitterCreator: '@bbcswahili',
    twitterSite: '@bbcswahili',
    noBylinesPolicy:
      'https://www.bbc.com/swahili/taasisi-49283417#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/swahili/taasisi-49283417',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/swahili/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Swahili',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Ukurasa',
        previousPage: 'Rejea',
        nextPage: 'Mbele',
        pageXOfY: 'Ukurasa {x} wa {y}',
      },
      ads: {
        advertisementLabel: 'Matangazo',
      },
      seeAll: 'Tazama zote',
      home: 'Habari',
      currentPage: 'Ukurasa uliopo ',
      skipLinkText: 'Ruka hadi maelezo',
      relatedContent: 'Maelezo zaidi kuhusu taarifa hii',
      relatedTopics: 'Mada zinazohusiana',
      navMenuText: 'Yaliyomo',
      mediaAssetPage: {
        mediaPlayer: 'Kicheza Nyenzo',
        audioPlayer: 'Kicheza Sauti',
        videoPlayer: 'Kicheza Video',
      },
      liveExperiencePage: {
        liveLabel: 'Moja kwa moja',
        liveCoverage: 'Moja kwa moja',
        breaking: 'Habari za hivi punde',
        postedAt: 'Imepakiwa mnamo',
        summary: 'Muhtasari',
        shareButtonText: 'Mshirikishe mwenzako',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Muhtasari',
      error: {
        404: {
          statusCode: '404',
          title: 'Ukurasa haupatikani',
          message:
            'Samahani, hatuwezi kukupeleka kwenye ukurasa unaoutafuta. Tafadhali jaribu:',
          solutions: [
            'Tunaitazama kwa mara ya pili url',
            'Kubonyeza kitufe cha kufungua upya ukurasa',
            'Tafuta ukurasa huu kwa kutumia sehemu ya Tafuta kwenye ukurasa wa BBC',
          ],
          callToActionFirst: 'Pia, tafadhali tembelea ukurasa wa kwanza wa ',
          callToActionLinkText: 'BBC News Swahili',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/swahili',
        },
        500: {
          statusCode: '500',
          title: 'Hitilafu katika server ya ndani',
          message:
            'Samahani, hatuwezi kukuletea ukurasa unaoutafuta. Tafadhali jaribu:',
          solutions: [
            'Kubonyeza kitufe cha kufungua upya ukurasa',
            'Inarudi tena baadaye',
          ],
          callToActionFirst: 'Pia, tafadhali tembelea ukurasa wa kwanza wa ',
          callToActionLinkText: 'BBC News Swahili',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/swahili',
        },
      },
      byline: {
        articleInformation: 'Maelezo kuhusu taarifa',
        listItemImage: 'Orodha,Picha',
        published: 'Iliyochapishwa',
        reportingFrom: 'Akiripoti kutoka',
        role: 'Nafasi',
      },
      consentBanner: {
        privacy: {
          title: 'Tumeboresha sera yetu ya faragha na vidakuzi au cookies',
          description: {
            uk: {
              first:
                'Tumefanya mabadiliko muhimu katika sera zetu za faragha na vidakuzi au cookies na tungependa ufahamu ina maana gani kwako na data yako.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Tumefanya mabadiliko muhimu katika sera zetu za faragha na vidakuzi au cookies na tungependa ufahamu ina maana gani kwako na data yako.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ndio',
          reject: 'Fahamu kilichobadilika',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Kubali kukusanywa taarifa zako na uendelee',
            reject: 'Kataa kukusanywa taarifa zako na uendelee',
            initial: {
              title:
                'Tufahamishe iwapo unakubali taarifa zako kukusanywa kupitia AMP',
              description: {
                first: 'Sisi na washirika wetu tunatumia teknolojia kama vile ',
                linkText: 'vidakuzi au cookies',
                last: ', na tunakusanya data katika mtandao kukufanya ufurahie matumizi ya mtandao na kukupa taarifa zinazokuvutia na matangazo unayoyaona. Tafadhali tufahamishe iwapo unakubali.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Wezesha mpangilio wangu',
            },
            manage: {
              title: 'Wezesha mpangilio wa ridhaa katika kurasa za AMP',
              description: {
                para1:
                  'Mpangilio huu utahusisha kurasa za AMP pekee. Unaweza kuulizwa juu ya mpangilio wako ukitembelea kurasa nyengine za bbc.com ambazo si za AMP.',
                para2:
                  'Ukurasa huu mwepesi wa simu uliotembelea umetengenezwa kutumia teknolojia ya Google AMP.',
                heading2: 'Ni lazima kukusanya taarifa',
                para3:
                  'Ili kuwezesha kurasa zetu kufanya kazi, tunahifadhi baadhi ya taarifa katika kifaa chako pasi na ridhaa yako.',
                para4: {
                  text: 'Soma zaidi kuhusu taarifa muhimu tunazohifadhi katika kifaa chako ili kuwezesha kurasa zetu kufanya kazi.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Tunatumia hifadhi ya kifaa chako kuhifadhi mapendekezo yako ya ridhaa kwa kifaa hicho.',
                heading3: 'Ukusanyaji wa taarifa kwa hiyari',
                para6:
                  'Unaporidhia kukusanywa kwa taarifa kupitia kurasa za AMP, pia unaridhia tukuoneshe matangazo ambayo yanaendana nawe ukiwa nje ya Uingereza.',
                para7: {
                  text: 'Soma zaidi jinsi gani BBC na washirika wetu tunavyokuletea matangazo yanayoendana nawe.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Unaweza kukataa kupokea matangazo kwa kubofya "Kataa kukusanywa taarifa zako na uendelee" chini. Zingatia kuwa utaendelea kuona matangazo lakini hayatakuwa yale unayoendana nayo.',
                para9:
                  'Unaweza kubadili mpangilio kwa kubofya "machuguo ya matangazo / Usiuze taarifa zangu" muda wowote ule.',
              },
            },
          },
          canonical: {
            title: 'Tufahamishe iwapo unakubali kupokea cookies',
            description: {
              uk: {
                first: 'Tunatumia ',
                linkText: 'kuki',
                last: ' kukufanya ufurahie mtandao. Tafadhali tufahamishe iwapo unakubali kupokea cookies au vidakuzi vyote hivi',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Tunatumia ',
                linkText: 'kuki',
                last: ' kukufanya ufurahie mtandao. Tafadhali tufahamishe iwapo unakubali kupokea cookies au vidakuzi vyote hivi',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Ndio, ninakubali',
            reject: 'Hapana, nipeleke kwa mpangilio',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Huwezi kusikiliza tena',
        contentExpired: 'Taarifa hii haipatikani tena.',
        contentNotYetAvailable: 'Kipindi hiki hakipatikani kwa sasa.',
        audio: 'Sauti',
        photogallery: 'Mkusanyiko wa picha',
        video: 'Video',
        bbc_swahili_radio: {
          title: 'BBC Swahili Radio',
          subtitle:
            'Habari za kimataifa, michezo na uchambuzi kutoka kwa idhaa ya dunia.',
        },
        bbc_swahili_tv: {
          title: 'Mitikasi Leo',
          subtitle:
            'Mitikasi Leo ina taarifa za biashara, uchambuzi na maoni ya wataalam wa 100bora kila siku.',
        },
        listen: 'Sikiliza',
        watch: 'Tazama',
        watchMoments: 'Tazama hapa',
        liveLabel: 'Moja kwa moja',
        nextLabel: 'MBELE',
        previousRadioShow: 'Kipindi kilichopita cha redio',
        nextRadioShow: 'Kipindi kijacho cha redio',
        duration: 'Muda',
        recentEpisodes: 'Vipindi vilivyopita',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Maelezo ya video, ',
          text: 'Onyo: Imetoka kwingine na inaweza kuwa na matangazo',
          articleText: 'Onyo: BBC haihusiki na maudhui ya nje',
          articleAdditionalText: 'Mitandao ya kijamii inaweza beba matangazo',
        },
        fallback: {
          text: 'Haipatikani tena',
          linkText: 'Tazama zaidi katika %provider_name%',
          linkTextSuffixVisuallyHidden: ', ya nje',
          warningText: 'BBC haihusiki na taarifa za kutoka mitandao ya nje.',
        },
        skipLink: {
          text: 'Ruka %provider_name% ujumbe',
          endTextVisuallyHidden: 'Mwisho wa %provider_name% ujumbe',
        },
        consentBanner: {
          heading: `Ruhusu maudhui? (Mitandao ya kijamii)`,
          body: `Mkala hii imebeba madhui yaliyotoka kwenye mitandao ya kijamii. Tunaomba ruhusa yako kabla kitu chochote hakija pakiwa, sababu wanaweza wakawa wanatumia Cookies na tekinolojia nyingine. Unaweza ukasoma sera sera ya kutumia cookies katika mitandao ya kijamii kabla ya kukubali. Kutazama maudhui haya chagua accept and continue`,
          button: 'Bonyeza kisha endelea',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Habari kuu',
      featuresAnalysisTitle: 'Gumzo mitandaoni',
    },
    mostRead: {
      header: 'Iliyosomwa zaidi',
      lastUpdated: 'Imeboreshwa mwisho:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Vipindi vya Redio',
      durationLabel: 'Muda %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/swahili/taasisi-49283417',
        text: 'Kwanini unaweza kuiamini BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Soma kuhusu mtazamo wetu wa viambatanishi vya nje.',
      },
      links: [
        {
          href: 'https://www.bbc.com/swahili/taasisi-37098622',
          text: 'Sheria ya matumizi',
        },
        {
          href: 'https://www.bbc.com/swahili/taasisi-37100009',
          text: 'Kuhusu BBC',
        },
        {
          href: 'https://www.bbc.com/swahili/taasisi-37100010',
          text: 'Sera ya faragha',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/swahili/send/u50853731',
          text: 'Wasiliana na BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Habari za BBC kwa lugha zingine',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC haihusiki na taarifa za kutoka mitandao ya nje.',
    },
    timezone: 'Africa/Nairobi',
    navigation: [
      {
        title: 'Habari',
        url: '/swahili',
      },
      {
        title: 'Michezo',
        url: '/swahili/topics/ckdxndddjkxt',
      },
      {
        title: 'Makala',
        url: '/swahili/topics/c6z8lg838klt',
      },
      {
        title: 'Afya',
        url: '/swahili/topics/cvjp2jj60v3t',
      },
      {
        title: 'Burudani',
        url: '/swahili/topics/c2dwqddr7y3t',
      },
      {
        title: 'Video',
        url: '/swahili/topics/cz40xlzvj6kt',
      },
      {
        title: 'Vipindi vya Redio',
        url: '/swahili/topics/ckrdle3133xt',
      },
    ],
  },
};

export default withContext(service);
