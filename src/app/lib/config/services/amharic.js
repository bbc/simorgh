import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { amharic as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_NOTO_SANS_ETHIOPIC_BOLD,
  F_NOTO_SANS_ETHIOPIC_REGULAR,
} from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/Africa/Addis_Ababa';
import '@bbc/psammead-locales/moment/am';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
      advertisementLabel: 'ማስታወቂያ',
    },
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
    themeColor: `${C_POSTBOX}`,
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
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'ሁሉንም ይመልከቱ',
      home: 'ዜና',
      currentPage: 'መነሻ ገፅ',
      skipLinkText: 'ወደ ዋናው ይዘት ይለፉ',
      relatedContent: 'በዚህ ዘገባ ላይ ተጨማሪ መረጃ',
      navMenuText: 'ክፍሎች',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
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
              first: 'እኛም ሆን ቴክኖሎጂያችንን የሚጠቀሙ አጋሮቻችን ለምሳሌም ',
              linkText: 'ኩኪዎችን የምንጠቀመው',
              last:
                ', ና መረጃዎችንም የምንሰብስበው የሚፈልጓቸውን መረጃዎችና ማስታወቂያዎች ቅድሚያ እንዲያገኙዋቸው በማሰብና አግልግሎታችንም የተሻለ እንዲሆን ነው።እባክዎ መስማማትዎን ያሳውቁን',
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
      media: {
        noJs: 'የእርሶ መሳሪያ ሚዲያ ፕሌይ ባክን ማጫወት ኣልተቻለም።',
        contentExpired: 'ይህንን ካሁን በኋላ ማግኘት አይችሉም፡፡',
        contentNotYetAvailable: 'ይህ ክፍል አርስዎ ገና አልተገኘም',
        audio: 'ድምጽ',
        photogallery: 'የፎቶ መድብሎች',
        video: 'ቪዲዮ',
        listen: 'ያድምጡ',
        watch: 'ተመልከት',
        liveLabel: 'ቀጥታ',
        nextLabel: 'ቀጣይ',
        previousRadioShow: 'ያለፈ የሬዲዮ ስርጭት',
        nextRadioShow: 'ቀጣይ የሬዲዮ ስርጭት',
        duration: 'ርዝመት',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'የቪዲዮ መግለጫ, ',
          text: 'ማሳሰቢያ፡ የሦስተኛ ወገን ይዘቶች ማስታወቂያ ሊኖራቸው ይችላል',
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
      },
      topStoriesTitle: 'እንዳያመልጥዎ',
      featuresAnalysisTitle: 'ከየፈርጁ',
    },
    brandSVG,
    mostRead: {
      header: 'ብዙ የተነበቡ',
      lastUpdated: 'በመጨረሻ ማሻሻያ የተደረገበት',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      onLiveRadioPage: true,
      onFrontPage: false,
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
        href: 'https://www.bbc.co.uk/help/web/links/',
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
          href: 'https://www.bbc.com/amharic/institutional-42228117',
          text: 'ቢቢሲን ያግኙ',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም.',
    },
    fonts: [F_NOTO_SANS_ETHIOPIC_BOLD, F_NOTO_SANS_ETHIOPIC_REGULAR],
    navigation: [
      {
        title: 'ዜና',
        url: '/amharic',
      },
      {
        title: 'ኢትዮጵያ',
        url: '/amharic/topics/e986aff5-6b26-4638-b468-371d1d9617b4',
      },
      {
        title: 'ቪዲዮ',
        url: '/amharic/media/video',
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
