import sinhalese from '../../../components/ThemeProvider/fontScripts/sinhalese';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/si';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `si`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'යාවත්කාලීනවී ඇත',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-sinhala',
    atiAnalyticsProducerId: '82',
    atiAnalyticsProducerName: 'SINHALA',
    useReverb: true,
    chartbeatDomain: 'sinhala.bbc.co.uk',
    brandName: 'BBC News සිංහල',
    product: 'BBC News',
    serviceLocalizedName: 'සිංහල',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/sinhala.png',
    defaultImageAltText: 'BBC News සිංහල',
    dir: `ltr`,
    externalLinkText: ', බාහිර',
    imageCaptionOffscreenText: 'ඡායාරූප ශීර්ෂ වැකිය, ',
    videoCaptionOffscreenText: 'වීඩියෝ ශීර්ෂ වැකිය, ',
    audioCaptionOffscreenText: 'හඬ ශීර්ෂ වැකිය, ',
    defaultCaptionOffscreenText: 'ශීර්ෂ වැකිය, ',
    imageCopyrightOffscreenText: 'ඡායාරූප මූලාශ්‍රය, ',
    locale: `si-LK`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'si',
    datetimeLocale: `si`,
    service: 'sinhala',
    serviceName: 'Sinhala',
    languageName: 'Sinhala',
    twitterCreator: '@bbcsinhala',
    twitterSite: '@bbcsinhala',
    noBylinesPolicy:
      'https://www.bbc.com/sinhala/institutional-50288553#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/sinhala/institutional-50288553',
    isTrustProjectParticipant: true,
    script: sinhalese,
    manifestPath: '/sinhala/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'ප්‍රධාන පුවත්',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'පිටුව',
        previousPage: 'ආපසු',
        nextPage: 'ඊළඟ',
        pageXOfY: 'පිටුව {x} අතරින් {y}',
      },
      ads: {
        advertisementLabel: 'වෙළෙඳ දැන්වීමක් ',
      },
      seeAll: 'සියල්ල දැකගන්න',
      home: 'ප්‍රධාන පුවත්',
      currentPage: 'දැන් සිටින පිටුව',
      skipLinkText: 'අන්තර්ගතයට පිවිසෙන්න',
      relatedContent: 'මේ පුවතට සම්බන්ධ තවත් විස්තර',
      relatedTopics: 'සබැඳි විෂයයන්',
      navMenuText: 'අංශ',
      mediaAssetPage: {
        mediaPlayer: 'මීඩියා ධාවකය',
        audioPlayer: 'හඬ වාදකය',
        videoPlayer: 'වීඩියෝ ධාවකය',
      },
      liveExperiencePage: {
        liveLabel: 'සජීවී',
        liveCoverage: 'සජීවී වාර්තාකරණය',
        breaking: 'අලුත්ම පුවතක්',
        postedAt: 'යාවත්කාලීන කළේ',
        summary: 'සාරාංශය',
        shareButtonText: 'යවන්න',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'සාරාංශය',
      error: {
        404: {
          statusCode: '404',
          title: 'පිටුව සොයාගත නොහැක',
          message:
            'කණගාටුයි, ඔබ සොයන පිටුව ගෙන ඒමට අපට නොහැක. කරුණාකර උත්සාහ කරන්න:',
          solutions: [
            'url නැවත පරීක්ෂා කෙරෙමින් පවතී',
            'ඔබේ බ්‍රවුසරයේ යළි පණගැන්වීම් බොත්තම තද කෙරෙමින් පවතී',
            'බීබීසී සෙවුම් තුළින් මේ පිටුව සොයමින් පවතී',
          ],
          callToActionFirst: 'නොඑසේනම්, කරුණාකර මුල් පිටුවට පිවිසෙන්න ',
          callToActionLinkText: 'BBC News සිංහල',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/sinhala',
        },
        500: {
          statusCode: '500',
          title: 'අභ්‍යන්තර සර්වරයේ දෝෂයකි',
          message:
            'කණගාටුයි, ඔබ සොයන පිටුව ගෙන ඒමට දැනට අපට හැකියාවක් නැත. කරුණාකර උත්සාහ කරන්න:',
          solutions: [
            'ඔබේ බ්‍රවුසරයේ යළි පණගැන්වීම් බොත්තම තද කෙරෙමින් පවතී',
            'යළි පසුව පැමිණෙනු ඇත',
          ],
          callToActionFirst: 'නොඑසේනම්, කරුණාකර මුල් පිටුවට පිවිසෙන්න ',
          callToActionLinkText: 'BBC News සිංහල',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/sinhala',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'පෞද්ගලිකත්වය (Privacy) හා කුකීස් (Cookies) පිළිබඳ අපගේ ප්‍රතිපත්තිය යාවත්කාලීන කර ඇත.',
          description: {
            uk: {
              first:
                'පෞද්ගලිකත්වය (Privacy) හා කුකීස් (Cookies) පිළිබඳ අපගේ ප්‍රතිපත්තියට එක්කර ඇති වැදගත් වෙනස්කම් ඔබට සහ ඔබගේ දත්තවලට අදාළවන්නේ කෙසේදැයි ඔබ දැනුවත්වීම අවශ්‍යය.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'පෞද්ගලිකත්වය (Privacy) හා කුකීස් (Cookies) පිළිබඳ අපගේ ප්‍රතිපත්තියට එක්කර ඇති වැදගත් වෙනස්කම් ඔබට සහ ඔබගේ දත්තවලට අදාළවන්නේ කෙසේදැයි ඔබ දැනුවත්වීම අවශ්‍යය.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'හරි',
          reject: 'වෙනස් කර ඇත්තේ මොනවාදැයි දැනගන්න',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'දත්ත රැස්කිරීම පිළිගෙන ඉදිරියට යන්න',
            reject: 'දත්ත රැස්කිරීම ප්‍රතික්ෂේප කර ඉදිරියට යන්න',
            initial: {
              title: 'AMP හි දත්ත රැස්කිරීම සමග ඔබ එකඟ වන්නේ දැයි අපට දන්වන්න.',
              description: {
                first: 'අප සහ අපේ හවුල්කරුවන් කුකීස් ',
                linkText: 'වැනි තාක්ෂණය',
                last: ' භාවිත කරමින් බ්‍රවුසිං දත්ත රැස්කරන්නේ ඔබට හොඳම ඔන්ලයින් අත්දැකීම ලබාදීම සහ ඔබට පෙනෙන අන්තර්ගතය හා වෙළෙඳ ප්‍රචාරණ ඔබටම සමීප කිරීම සඳහාය. මීට ඔබ එකඟ නම් කරුණාකර ඒ බව අපට දන්වන්න.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'මගේ සැකසුම් කළමනාකරණය කරන්න',
            },
            manage: {
              title: 'AMP පිටුවල අනුමැතිය සඳහා වූ සැකසුම් කළමනාකරණය කරන්න',
              description: {
                para1:
                  'මෙම සැකසුම් අදාළ වන්නේ AMP පිටු සඳහා පමණි. AMP නොවන BBC පිටු වෙත ඔබ පිවිසෙද්දී මෙම සැකසුම් රුචිකත්වය යළි සකසා ගන්න ලෙස ඉල්ලා සිටීමට ඉඩ තිබේ.',
                para2:
                  'ඔබ මේ පිවිසී සිටින ජංගම දුරකථන සැහැල්ලු පිටුව නිර්මාණය කර තිබෙන්නේ ගූගල් AMP තාක්ෂණය භාවිතයෙනි.',
                heading2: 'අනිවාර්යයෙන් අවශ්‍ය දත්ත රැස්කිරීම',
                para3:
                  'අපගේ වෙබ් පිටු ක්‍රියාකාරීවීම සඳහා, ඔබේ අවසරයකින් තොරව සීමිත තොරතුරු ප්‍රමාණයක් අප විසින් ඔබේ සන්නිවේදන මෙවලමේ ගබඩා කරනු ලැබේ.',
                para4: {
                  text: 'අපගේ වෙබ් පිටු ක්‍රියාකාරීවීම සඳහා, ඔබේ සන්නිවේදන මෙවලමේ අප විසින් ගබඩා කරනු ලබන අත්‍යවශ්‍ය තොරතුරු ගැන වැඩිදුර කියවන්න.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'ඔබේ අනුමැතිය ඇති රුචිකත්ව ඔබේ සන්නිවේදන මෙවලමේ ගබඩා කිරීම සඳහා එහි ඇති ඉඩකඩ අප විසින් භාවිත කරනු ලැබේ.',
                heading3: 'විකල්ප දත්ත එකතුව',
                para6:
                  'AMP පිටුවල දත්ත රැස්කිරීම සඳහා ඔබ අනුමැතිය දෙනවිට, ඔබ එක්සත් රාජධානියෙන් බැහැර සිටින විට ඔබට අදාළවන දැන්වීම් ප්‍රදර්ශනය සඳහා ද ඔබගේ අනුමැතිය දෙනු ලබයි.',
                para7: {
                  text: 'බීබීසී තුළ සිටින අප සහ අපගේ දැන්වීම් හවුල්කරුවන් විසින් ඔබ වෙනුවෙන් ම දැන්වීම් වෙන් කෙරෙන්නේ කෙසේදැයි යන්න පිළිබඳ වැඩිදුර කියවන්න.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'පහතින් ඇති, "දත්ත රැස්කිරීම ප්‍රතික්ෂේප කර ඉදිරියට යන්න" ක්ලික් කිරීමෙන් වෙන් කෙරුණු දැන්වීම් නොලැබීම තෝරාගත හැක. තවදුරටත් දැන්වීම් දැකගත හැකි වුවත්, ඒවා ඔබ සඳහා වෙන් කර නොමැති බව කරුණාවෙන් සලකන්න.',
                para9:
                  'මෙහි පහළින් ඇති "දැන්වීම් රුචිකත්ව / මගේ තොරතුරු අලෙවි නොකරන්න" ක්ලික් කර ඕනෑම වේලාවක ඔබට මෙම සැකසුම් වෙනස් කළ හැකිය.',
              },
            },
          },
          canonical: {
            title: 'කුකීස් සමග එකඟවන්නේදැයි අපට දන්වන්න',
            description: {
              uk: {
                first: 'අප කුකීස් ',
                linkText: 'භාවිත කරන්නේ',
                last: ' හොඳම ඔන්ලයින් අත්දැකීම ඔබට ගෙන දීම සඳහාය. මේ කුකීස් සියල්ල සමග ඔබ එකඟදැයි කරුණාකර අපට දන්වන්න.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'අප කුකීස් ',
                linkText: 'භාවිත කරන්නේ',
                last: ' හොඳම ඔන්ලයින් අත්දැකීම ඔබට ගෙන දීම සඳහාය. මේ කුකීස් සියල්ල සමග ඔබ එකඟදැයි කරුණාකර අපට දන්වන්න.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'ඔව්, මම එකඟයි',
            reject: 'නැහැ, සැකසුම වෙත මා ගෙනයන්න',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'මෙහි කිසිවක් අඩංගු නැත.',
        contentExpired:
          'ඔබේ දුරකථනයේ හෝ පරිගණකයේ මෙය වාදනය කිරීමට අදාළ මෘදුකාංග නැත',
        contentNotYetAvailable: 'මෙහි ඇති දෑ සවන්දීම සඳහා තවම සූදානම් නැත.',
        audio: 'හඬ',
        photogallery: 'ඡායාරූප ගැලරිය ',
        video: 'වීඩියෝ',
        bbc_sinhala_tv: {
          title: 'බීබීසී සිංහල සංදේශය',
          subtitle:
            'බීබීසී සිංහල ඔස්සේ ශ්‍රී ලාංකීය, දකුණු ආසියාතික සහ ජාත්‍යන්තර පුවත්, විශ්ලේෂණ සහ ක්‍රීඩා පුවත්',
        },
        listen: 'සවන්දෙන්න',
        watch: 'නරඹන්න',
        listenLive: 'සජීව ශ්‍රවණය',
        liveLabel: 'සජීවී.',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'ධාවන කාලය',
        recentEpisodes: 'පෙර වැඩසටහන්',
        closeVideo: 'ඉවත්වෙන්න',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'වීඩියෝ ශීර්ෂ වැකිය, ',
          text: 'අනතුරු ඇඟවීමයි: බීබීසී නොවන වාර්තාවල වෙළෙඳ දැන්වීම් අඩංගු විය හැකිය',
          articleText:
            'අනතුරු ඇඟවීමයි: බාහිර වෙබ් අඩවිවල අන්තර්ගතය සඳහා BBCය වගකියනු නොලැබේ.',
          articleAdditionalText:
            '%provider_name% අන්තර්ගතයේ දැන්වීම් අඩංගු විය හැකි ය.',
        },
        fallback: {
          text: 'මෙහි අන්තර්ගතය නැත',
          linkText: 'වැඩිදුරටත් %provider_name% බලන්න',
          linkTextSuffixVisuallyHidden: ', බාහිර',
          warningText: 'බාහිර වෙබ් අඩවිවල අන්තර්ගතයට බීබීසී වගකියනු නොලැබේ.',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
        consentBanner: {
          heading: `[social_media_site] අන්තර්ගතයට අවසරදීමට ඔබ එකඟ ද?`,
          body: `මෙම ලිපියේ [social_media_site] විසින් සපයන ලද අන්තර්ගතයන් අඩංගු වේ. ඔවුන් කුකීස් සහ වෙනත් තාක්ෂණයන් භාවිතා කරන නිසා, ඒ කිසිවක් පූරණය වීමට පෙර අපි ඔබගේ අවසරය ඉල්ලා සිටිමු. එයට අවසරදීමට පෙර ඔබට [social_media_site] [link] කුකී ප්‍රතිපත්තිය [/link] සහ [link] රහස්‍යතා ප්‍රතිපත්තිය [/link] කියවීමට අවශ්‍ය විය හැකි ය. මෙම අන්තර්ගතය බැලීමට 'පිළිගෙන ඉදිරියට යන්න' තෝරන්න.`,
        },
      },
      include: {
        errorMessage:
          'කණගාටුයි, මෙම සැහැල්ලු ජංගම පිටුව තුළ අපට ලිපියේ මෙම කොටස පෙන්විය නොහැක.',
        linkText: 'අන්තර්ගතයේ සියල්ල දැක ගැනීමට පිටුවේ සම්පූර්ණ අනුවාදය බලන්න',
      },
      topStoriesTitle: 'ප්‍රධාන පුවත',
      featuresAnalysisTitle: 'විශේෂාංග',
      latestMediaTitle: 'අලුත්ම',
    },
    mostRead: {
      header: 'වැඩිපුරම කියැවූ',
      lastUpdated: 'අවසන් යාවත්කාලීනවීම:',
      numberOfItems: 5,
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
        href: 'https://www.bbc.com/sinhala/institutional-50288553',
        text: 'ඔබට බීබීසී විශ්වාස කළ හැක්කේ ඇයි',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'බාහිර යොමු කෙරෙහි අපගේ ප්‍රවේශය ගැන කියවන්න.',
      },
      links: [
        {
          href: 'https://www.bbc.com/sinhala/institutional-36017568',
          text: 'භාවිතයේ කොන්දේසි',
        },
        {
          href: 'https://www.bbc.com/sinhala/institutional-36019591',
          text: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'කුකීස්',
        },
        {
          href: 'https://www.bbc.co.uk/sinhala/send/u50853687',
          text: 'බීබීසී ය අමතන්න',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'බීබීසී පුවත් වෙනත් භාෂාවලින්',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. බාහිර වෙබ් අඩවිවල අන්තර්ගතයට බීබීසී වගකියනු නොලැබේ.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'ප්‍රධාන පුවත්',
        url: '/sinhala',
      },
      {
        title: 'ශ්‍රී ලංකා',
        url: '/sinhala/topics/cg7267dz901t',
      },
      {
        title: 'ලෝකය',
        url: '/sinhala/topics/c83plvepnq1t',
      },
      {
        title: 'වීඩියෝ',
        url: '/sinhala/topics/crldzm9n2lnt',
      },
      {
        title: 'ක්‍රීඩා',
        url: '/sinhala/topics/cvjp2jy9g2qt',
      },
      {
        title: 'සෞඛ්‍ය',
        url: '/sinhala/topics/cz74k723j57t',
      },
    ],
  },
};

export default withContext(service);
