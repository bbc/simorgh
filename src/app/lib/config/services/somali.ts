import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Africa/Mogadishu';
import '#psammead/psammead-locales/moment/so';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `so`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Waa la cusbooneysiiyay',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-somali',
    atiAnalyticsProducerId: '83',
    atiAnalyticsProducerName: 'SOMALI',
    useReverb: true,
    chartbeatDomain: 'somali.bbc.co.uk',
    brandName: 'BBC News Somali',
    product: 'BBC News',
    serviceLocalizedName: 'Somali',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/somali.png',
    defaultImageAltText: 'BBC News Somali',
    dir: `ltr`,
    externalLinkText: ', kale',
    imageCaptionOffscreenText: 'Qoraalka sawirka, ',
    videoCaptionOffscreenText: 'Qoraalka Muuqaalka, ',
    audioCaptionOffscreenText: 'Qoraalka Codka, ',
    defaultCaptionOffscreenText: 'Qoraal, ',
    imageCopyrightOffscreenText: 'Xigashada Sawirka, ',
    locale: `so-SO`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'so',
    datetimeLocale: `so`,
    service: 'somali',
    serviceName: 'Somali',
    languageName: 'Somali',
    twitterCreator: '@bbcsomali',
    twitterSite: '@bbcsomali',
    noBylinesPolicy:
      'https://www.bbc.com/somali/hayadeed-49283375#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/somali/hayadeed-49283375',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/somali/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Somali',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Bog',
        previousPage: 'Biggii Hore',
        nextPage: 'Bogga Xiga',
        pageXOfY: 'Bog {x} of {y}',
      },
      ads: {
        advertisementLabel: 'Xayeysiin',
      },
      seeAll: 'Arag dhammaan',
      home: 'War',
      currentPage: 'Bogga hadda',
      skipLinkText: 'U gudub qaybta macluumaadka',
      relatedContent: 'Warar kale oo dheeraad ah oo la xiriira qodobkan',
      relatedTopics: 'Mowduucyada la xiriira',
      navMenuText: 'Qaybaha',
      mediaAssetPage: {
        mediaPlayer: 'Ciyaaridda warbixinnada',
        audioPlayer: 'Ciyaaridda Codka',
        videoPlayer: 'Ciyaaridda Muuqaalka',
      },
      liveExperiencePage: {
        liveLabel: 'Toos',
        liveCoverage: 'Tebin toos ah',
        breaking: 'War deg deg ah',
        postedAt: '',
        summary: 'Kooban',
        shareButtonText: 'La wadaag',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Kooban',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Ogolow xog uruurinta horeyna u soco',
            reject: 'Diid xog uruurinta horeyna u soco',
            initial: {
              title: 'Aan isla ogaano in aad ogoshahay xog uruurinta AMP',
              description: {
                first:
                  'Anaga iyo baraha aan ogolnahay nahay waxaan adeegsanaa teknolijiyad sida ',
                linkText: 'cookies',
                last: ', waxaana uruurinaa xogta booqashada bogga si aan khibradda ugu fiican ee adeegsiga intarnet-ka aan kuu siino, si aan kugu soo gudbiyo warar iyo xayeysiinno adiga gaar kuu ah. Fadlan aan ogaano haddii aad aqbashay.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Maareynta qeybteyda',
            },
            manage: {
              title: 'Maareynta qeybta ogolaanshaha ee bogagga AMP',
              description: {
                para1:
                  'Qeybahan waxay quseeyaan bogagga AMP oo keli ah. Markale waa lagu weydiin karaa in aad wax ka bedesho, marka aad booqato bogagga BBC ee aan AMP ahayn.',
                para2:
                  'Bogagga fudud ee Mobile-ka ee aad booqatay waxaa lagu dhisay isticmaalka tiknolojiyadda Google AMP.',
                heading2:
                  'Wuxuu ku kooban yahay oo keli ah xogta aan laga maarmin.',
                para3:
                  'Si ay bogaggeena web-ka u shaqeeyaa, waxaan xog kooban ku keydineynaa qalabkaaga, adigoo aan ogolaan.',
                para4: {
                  text: 'Akhriso xog dheeraad ah oo ku saabsan macluumaadka muhiimka ah ee aan qalabkaaga ku keydineyno si aan uga shaqeysiiyo bogaggeena.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Waxaan isticmaaleynaa keydin gudaha ah si aan ogolaanshahaaga ugu keydino qalabkaaga gudihiisa.',
                heading3: 'Xog uruurinta ikhtiyaariga ah',
                para6:
                  'Marka aad ogolaato xog uruurinta bogagga AMP waxaad ogolaaneysaa oo aad inoo fasexeysaa in aad ku tusno xayeysiin xiriir kula leh, marka aad ku sugan tahay meel ka baxsan UK.',
                para7: {
                  text: 'Akhriso xogta dheeraadka ah ee ku saabsan xayeysiinta xiriirka kula leh ee BBC iyo kuwa nagala shaqeeya xayeysiiska.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Waad dooran kartaa in aanan lagu soo gaarsiin xayeysiin xiriirka kula leh adigoo gujinaya "Diid xog uruurinta siina soco" ee hoose. Fadlan ogow weli waad arkeysaa xayeysiis, balse ma noqoneyso mid kula xiriirta.',
                para9:
                  'Waad bedeli kartaa qeybahan adigoo gujinaya "dookha xayeysiin / Ha iibin xogteyda" ee kuu soo muuqaneysa, markasta.',
              },
            },
          },
          canonical: {
            title:
              'Aan ogaano in aad aqbashay qoraallada dheeriga ah ee cookies-ka',
            description: {
              uk: {
                first: 'Waxaan isticmaaleynaa lifaaq ',
                linkText: 'cookies',
                last: ' si aad nooga heshid khibradda ugu wanaagsan ee adeegsiga intarnet-ka. Fadlan aan ogaano haddii aad ogolaatay dhammaan cookies-kan.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Waxaan isticmaaleynaa lifaaq ',
                linkText: 'cookies',
                last: ' si aad nooga heshid khibradda ugu wanaagsan ee adeegsiga intarnet-ka. Fadlan aan ogaano haddii aad ogolaatay dhammaan cookies-kan.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Haa, waan ogolaaday',
            reject: 'Maya, igee settings-ka',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Qalabkan kuma ciyaari kartid maqalka iyo muuqaalka',
        contentExpired: 'Adeeggan hadda ma heli kartid',
        contentNotYetAvailable:
          'Adeeggani hadda diyaar ma aha oo ma ciyaari kartid',
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
        listenLive: 'Toos u dhageyso',
        liveLabel: 'TOOS',
        nextLabel: 'Xiga',
        previousRadioShow: 'Barnaamijyadii hore ee Raadiyaha',
        nextRadioShow: 'Barnaamijka Xiga ee Raadiyaha',
        duration: 'Muddada',
        recentEpisodes: 'Barnaamijyadii Hore',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Qoraalka Muuqaalka, ',
          text: 'Digniin: Waxaa suuragal ah in macluumaadka dad kale ay ku jiraan xayaysiin',
          articleText:
            'Digniin: BBC macluumaadka ku qoran bog kale masuul kama ahan',
          articleAdditionalText:
            '%provider_name% Waxaa laga yaabaa inay ku jirta xayasiis',
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
        consentBanner: {
          heading: `Oggolow  [social_media_site] macluumaadka`,
          body: `Macluumaadkan waxaa daabacay [social_media_site].  Waxaan dalbanayenaa fasaxaaga ka hor inta aan la furin, waxaa laga yaabaa inay isticmaalayaan cookies iyo farsamooyin kale. hadii aad u bahato akhri [social_media_site] [link] xeerarka cokie [/link] iyo [link] kan ku saabsan xogta gaarka ah[/link] ka hor inta aadan aqbalin. si aad u aragto xogta guji ‘aqbal oo soco’.`,
          button: 'Aqbal horayna u soco',
        },
      },
      include: {
        errorMessage:
          'Waanu ka xunnahay, qeybta kuma soo bandhigi karno bogga mobile-kaan',
        linkText: 'Eeg qeybta bogga oo dhan, si xogta oo dhan aad u aragto.',
      },
      topStoriesTitle: 'Wararka ugu waaweyn',
      featuresAnalysisTitle: 'Xul',
      latestMediaTitle: 'Arrimhii u danbeeyey',
    },
    mostRead: {
      header: 'Ugu akhris badan',
      lastUpdated: 'Markii ugu dambeysay ee la cusbooneysiiyay:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Barnaamijyada Idaacadda',
      durationLabel: 'Muddada %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/somali/hayadeed-49283375',
        text: 'Sababta aad ku aamini kartid BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.co.uk/somali/send/u50853709',
          text: 'La xiriir BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Wararka BBC ee luqadaha kale',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC masuul kama ahan macluumadka bogagga kale ee dibadda.',
    },
    timezone: 'Africa/Mogadishu',
    navigation: [
      {
        title: 'War',
        url: '/somali',
      },
      {
        title: 'Ganacsi',
        url: '/somali/topics/c2dwqd32v4yt',
      },
      {
        title: 'Cayaaraha',
        url: '/somali/topics/cpzd4zj1pn2t',
      },
      {
        title: 'Muuqaal',
        url: '/somali/topics/c7pl4k5r9xxt',
      },
      {
        title: 'Barnaamijyada Idaacadda',
        url: '/somali/topics/cn6rqlrkm0pt',
      },
    ],
  },
};

export default withContext(service);
