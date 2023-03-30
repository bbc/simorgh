import noAscendersOrDescenders from '../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/Africa/Addis_Ababa';
import '#psammead/psammead-locales/moment/am';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `am`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ተሻሽሏል',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-amharic',
    atiAnalyticsProducerId: '4',
    chartbeatDomain: 'amharic.bbc.co.uk',
    brandName: 'BBC News አማርኛ',
    product: 'BBC News',
    serviceLocalizedName: 'አማርኛ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
    defaultImageAltText: 'BBC News አማርኛ',
    dir: `ltr`,
    externalLinkText: ', ውጫዊ',
    imageCaptionOffscreenText: 'የምስሉ መግለጫ, ',
    videoCaptionOffscreenText: 'የተንቀሳቃሹ ምስል መግለጫ, ',
    audioCaptionOffscreenText: 'የድምፅ መግለጫ, ',
    defaultCaptionOffscreenText: 'መግለጫ, ',
    imageCopyrightOffscreenText: 'የፎቶው ባለመብት, ',
    locale: `am-ET`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'am',
    datetimeLocale: 'am',
    service: 'amharic',
    serviceName: 'Amharic',
    languageName: 'Amharic',
    twitterCreator: '@bbcnews',
    twitterSite: '@bbcnews',
    noBylinesPolicy:
      'https://www.bbc.com/amharic/institutional-49283133#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/amharic/institutional-49283133',
    isTrustProjectParticipant: true,
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ዜና',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'ገፁ',
        previousPage: 'ከዚህ በፊት ያለ',
        nextPage: 'ቀጣይ',
        pageXOfY: 'ገፁ {x} የ {y}',
      },
      ads: {
        advertisementLabel: 'ማስታወቂያ',
      },
      seeAll: 'ሁሉንም ይመልከቱ',
      home: 'ዜና',
      currentPage: 'መነሻ ገፅ',
      skipLinkText: 'ወደ ዋናው ይዘት ይለፉ',
      relatedContent: 'በዚህ ዘገባ ላይ ተጨማሪ መረጃ',
      relatedTopics: 'ተያያዥ ርዕሶች',
      navMenuText: 'ክፍሎች',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      gist: 'ጭምቅ ሃሳብ',
      error: {
        404: {
          statusCode: '404',
          title: 'ገፁን አሁን ማግኘት አይችሉም',
          message: 'የሚፈልጉትን ገፅ ማምጣት ባለመቻላችን እናዝናለን። እባክዎ እንደገና ይሞክሩ',
          solutions: [
            'ድረገፁን በድጋሚ በመሞከር ላይ',
            'ገፅዎ ላይ ያለውን ሪፍሬሽ ቁልፍ  እንደገና ተጭነው ይሞክሩት',
            'የቢቢሲን መፈለጊያ ቁልፍ በመጠቀም ይፈልጉ',
          ],
          callToActionFirst: 'እንደ አማራጭም እባክዎ ገፃችን ላይ የሚገኘውን ',
          callToActionLinkText: 'BBC News አማርኛ',
          callToActionLast: ' ድረገፅ ይጎብኙ',
          callToActionLinkUrl: 'https://www.bbc.com/amharic',
        },
        500: {
          statusCode: '500',
          title: 'የአገልግሎት ችግር አጋጥሟል',
          message: 'የሚፈልጉትን ገፅ ማምጣት ባለመቻላችን እናዝናለን። እባክዎ እንደገና ይሞክሩ',
          solutions: ['በገፅዎ ላይ ያለውን ሪፍሬሽ የሚለውን ቁልፍ ይጫኑ', 'እንደገና ይመለሱ'],
          callToActionFirst: 'እንደ አማራጭም እባክዎ ገፃችን ላይ የሚገኘውን ',
          callToActionLinkText: 'BBC News አማርኛ',
          callToActionLast: ' ድረገፅ ይጎብኙ',
          callToActionLinkUrl: 'https://www.bbc.com/amharic',
        },
      },
      byline: {
        author: 'ፀሐፊ',
        articleInformation: 'የጽሁፉ መረጃ',
        listItemImage: 'ዝርዝር፣ ምስል',
        published: 'ታትሟል',
        reportingFrom: 'ዘገባው ከ',
        role: 'የሥራ ድርሻ',
      },
      consentBanner: {
        privacy: {
          title: 'በፕራይቬሲና ኩኪዎችን በመጠቀም ፖሊሲዎቻችን ላይ ማሻሻያ አድርገናል።',
          description: {
            uk: {
              first:
                'በፕራይቬሲና ኩኪዎችን በመጠቀም ፖሊሲዎቻችን ላይ ጠቃሚ ለውጦችን አድርገናል። ለርስዎም ሆን በመረጃዎች ላይ ለውጦቹ ምን ማለት እንደሆኑ እንዲያውቁ እንፈልጋለን።',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'በፕራይቬሲና ኩኪዎችን በመጠቀም ፖሊሲዎቻችን ላይ ጠቃሚ ለውጦችን አድርገናል። ለርስዎም ሆን በመረጃዎች ላይ ለውጦቹ ምን ማለት እንደሆኑ እንዲያውቁ እንፈልጋለን።',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'እሺ',
          reject: 'ምን እንደተቀየረ ይመልከቱ',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'ለሚሰበሰበው መረጃ ፈቃደኛ ሆነው ይቀጥሉ',
            reject: 'ለሚሰበሰበው መረጃ ፈቃደኛ ሳይሆኑ ይቀጥሉ',
            initial: {
              title: 'ገጻችንን በቀላሉ እንዲያገኙ ለማገዝ በምንሰበስበው መረጃ ላይ ይስማሙ እንደሆነ ያሳውቁን',
              description: {
                first: 'እኛም ሆንን አጋሮቻችን ',
                linkText: 'ኩኪዎችን',
                last: 'የመሳሰሉ ቴክኖሎጂዎችን የምንጠቀመውና መረጃዎችን የምንሰብስበው እርስዎ የሚፈልጉት መረጃና ማስታወቂያ ቅድሚያ እንዲደርስዎና የላቀ የድረገጽ አገልግሎት እንዲያገኙ ለማድረግ ነው። እባክዎ መስማማትዎን ያሳውቁን።',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'የአጠቃቀም ምርጫዎን ለማስተካከል',
            },
            manage: {
              title: 'በቀላሉ የሚከፈቱ ገጾች የአጠቃቀም ምርጫዎን ለማስተካከል',
              description: {
                para1:
                  'ይህ የአጠቃቀም ምርጫ በቀላሉ በሚከፈቱ ገጾች ላይ ብቻ የሚሰራ ነው። የሚጎበኙት ለዚሁ የተዘጋጀ የቢቢሲ ገጽ ካልሆነ በድጋሚ ምርጫዎን ሊጠየቁ ይችላሉ።',
                para2: 'የጎበኙት በቀላሉ የሚከፈት ገጽ የተዘጋጀው የጉግል ቴክኖሎጂን በመጠቀም ነው።',
                heading2: 'የግድ አስፈላጊ የሆነ መረጃ',
                para3:
                  'ድረ ገጻችን እንዲሰራ ለማድረግ የእርስዎ ፈቃድ ሳያስፈልግ የተወሰኑ መረጃዎችን በሚገለገሉበት መሳሪያ ላይ እናስቀምጣለን።',
                para4: {
                  text: 'ድረ ገጻችን እንዲሰራ ለማድረግ በሚገለገሉበት መሳሪያ ላይ ያስቀመጥነውን ጠቃሚ መረጃን በተመለከተ ተጨማሪ ያንብቡ',
                  url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5: 'በመገልገያ መሳሪያዎ ላይ የስምምነት ምርጫዎችዎን እናስቀምጣለን።',
                heading3: 'የግድ ያልሆነ መረጃ',
                para6:
                  'በቀላሉ ገጻችንን ለመመልከት ሲስማሙ፤ ከዩናይትድ ኪንግደም ውጪ በሚሆኑበት ጊዜ እርስዎን የሚመለከቱ ማስታወቂያዎች እንዲደርስዎ ፈቃደኛ መሆንዎን ያመለክታል።',
                para7: {
                  text: 'ቢቢሲ እና የማስታወቂያ አጋሮቹ ማስታወቂያዎችን እንዴት ግለሰቦችን የሚመለከቱ እንደሚያደርጉት የበለጠ ያንብቡ',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'እርስዎን የሚመለከቱ ማስታወቂያዎች እንዲደርስዎ ካልፈለጉ ከታች ያለውን "ለሚሰበሰበው መረጃ ፈቃደኛ ሳይሆኑ ይቀጥሉ" የሚለውን ይጫኑ። ልብ ማለት ያለብዎ ነገር የማይመለከቱት እርስዎን የሚመለከቱ ማስታወቂያዎችን እንጂ ሌሎች ማስታወቂያዎችን መመልከትዎ አይቀርም።',
                para9:
                  'ይህንን ምርጫዎን ለመቀየር ከግርጌ ያለውን “Ad Choices / Do not sell my info” የሚለውን በመጫን በፈለጉ ጊዜ መቀየር ይችላሉ።',
              },
            },
          },
          canonical: {
            title: 'ኩኪዎችን መጠቀም ላይ መስማማትዎን ያሳውቁን',
            description: {
              uk: {
                first: 'ለርስዎ ',
                linkText: 'የምናቀርበውን አገልግሎት ለማሻሻል በማሰብ ኩኪዎችን',
                last: ' እንጠቀማለን። ኩኪዎችን መጠቀም ላይ መስማማትዎን እባክዎ ያሳውቁን.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'ለርስዎ ',
                linkText: 'የምናቀርበውን አገልግሎት ለማሻሻል በማሰብ ኩኪዎችን',
                last: ' እንጠቀማለን። ኩኪዎችን መጠቀም ላይ መስማማትዎን እባክዎ ያሳውቁን.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'እሺ፣ እስማማለሁ',
            reject: 'ወደ ማውጫ መመለስ እፈልጋለሁ',
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'የእርሶ መሳሪያ ሚዲያ ፕሌይ ባክን ማጫወት ኣልተቻለም።',
        contentExpired: 'ይህንን ካሁን በኋላ ማግኘት አይችሉም፡፡',
        contentNotYetAvailable: 'ይህ ክፍል አርስዎ ገና አልተገኘም',
        audio: 'ድምጽ',
        photogallery: 'የፎቶ መድብሎች',
        video: 'ቪዲዮ',
        listen: 'ያድምጡ',
        watch: 'ተመልከት',
        listenLive: 'በቀጥታ ያድምጡ',
        listenNext: 'ቀጣዩን ያድምጡ',
        liveLabel: 'ቀጥታ',
        nextLabel: 'ቀጣይ',
        previousRadioShow: 'ያለፈ የሬዲዮ ስርጭት',
        nextRadioShow: 'ቀጣይ የሬዲዮ ስርጭት',
        duration: 'ርዝመት',
        recentEpisodes: 'ያለፉ ዝግጅቶች’',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'የቪዲዮ መግለጫ, ',
          text: 'ማሳሰቢያ፡ የሦስተኛ ወገን ይዘቶች ማስታወቂያ ሊኖራቸው ይችላል',
          articleText: 'ማሳሰቢያ: በሌሎች ገጾች ላይ ላሉ ይዘቶች ቢቢሲ ኃላፊነት አይወስድም።',
          articleAdditionalText: '%provider_name%] ማስታወቂያ ሊኖረው ይችላል።',
        },
        fallback: {
          text: 'የሚፈልጉት ይዘት የለም',
          linkText: 'በ %provider_name% ተጨማሪ ይመልከቱ',
          linkTextSuffixVisuallyHidden: ', ውጫዊ',
          warningText: 'ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም.',
        },
        skipLink: {
          text: 'የ %provider_name% ይዘትን ይለፉት',
          endTextVisuallyHidden: 'የ %provider_name% ይዘት መጨረሻ',
        },
        consentBanner: {
          heading: 'ይዘቱን [social_media_site] ይፈቅዳሉ?',
          body: `ይህ ጽሑፍ በ[social_media_site]. የቀረበ ይዘት ይዟል። ገጹ ቴክኖሎጂዎች ወይም ኩኪዎች ሊኖረው ስለሚችል ገጹ ከመከፈቱ በፊት የእርስዎን ፍቃድ እንጠይቃለን። ፍቃድዎን ከመስጠትዎ በፊት የ[social_media_site] [link] ኩኪ ፖሊሲ እና የ[link] የግለኝነት ፖሊሲ [/link] ማንበብ ይፈልጉ ይሆናል። 
          ይዘቱን ለማንበብ ‘እቀበላለሁ ቀጥል’ የሚለውን ይምረጡ።`,
        },
      },
      include: {
        errorMessage:
          'ይቅርታ፤ የዚህን ይዘት የተወሰነ ክፍል ለሞባይል አመቺ በሆነ መልክ ልናቀርብ አልቻልንም።',
        linkText: 'በገጹ ላይ ያሉትን ሁሉንም ይዘቶች ለማየት ሙሉውን ይዘት ይመልከቱ  ',
      },
      topStoriesTitle: 'እንዳያመልጥዎ',
      featuresAnalysisTitle: 'ከየፈርጁ',
      latestMediaTitle: 'የቅርብ ጊዜ',
    },
    mostRead: {
      header: 'ብዙ የተነበቡ',
      lastUpdated: 'በመጨረሻ ማሻሻያ የተደረገበት',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'በብዛት የታዩ',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'ያድምጡ',
      durationLabel: 'ርዝመት %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/amharic/institutional-49283133',
        text: 'ቢቢሲን ለምን ማመን እንደሚገባዎ',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'ስለ ውጪ ሊንኮች ያለን አቀራረብ',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'የአጠቃቀም ደንብ',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'ስለ ቢቢሲ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'የፕራይቬሲ ፖሊሲ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ኩኪዎች',
        },
        {
          href: 'https://www.bbc.co.uk/amharic/send/u50853181',
          text: 'ቢቢሲን ያግኙ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም.',
    },
    navigation: [
      {
        title: 'ዜና',
        url: '/amharic',
      },
      {
        title: 'ኢትዮጵያ',
        url: '/amharic/topics/c7zp57r92v5t',
      },
      {
        title: 'ቪዲዮ',
        url: '/amharic/topics/c917ezk2pmvt',
      },
      {
        title: 'በጣም የተወደዱ',
        url: '/amharic/popular/read',
      },
    ],
    timezone: 'Africa/Addis_Ababa',
  },
};

export default withContext(service);
