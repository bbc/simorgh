export default {
  pagination: {
    previousPage: 'ናይ ሕሉፍ',
    nextPage: 'ዝቕጽል',
    pageXOfY: 'Page {x} of {y}',
  },
  ads: {
    advertisementLabel: 'መላለዪ',
  },
  seeAll: 'ንኹሉ ርኣዩ',
  home: 'መእተዊ ገጽ',
  currentPage: 'ዘለኹሞ ገጽ',
  skipLinkText: 'ናብቲ ትሕዝቶ ቀጽሉ',
  relatedContent: 'ተዛማዲ ትሕዝቶ',
  relatedTopics: 'ተዛማዲ ዛዕባታት',
  navMenuText: 'ክፍልታት',
  mediaAssetPage: {
    mediaPlayer: 'Media player',
    audioPlayer: 'Audio player',
    videoPlayer: 'Video player',
  },
  liveExperiencePage: {
    liveLabel: 'ቀጥታ',
    liveCoverage: 'ቀጥታዊ ሸፈነ',
    breaking: 'ሓድሽ ዜና',
    postedAt: 'ዝተለጠፈሉ',
    summary: 'ጽማቝ ሓበሬታ',
  },
  error: {
    404: {
      statusCode: '404',
      title: 'እቲ ገጽ ክርከብ ኣይከኣለን',
      message: 'ይቕረታ! እቲ እትደልዩዎ ዘለኹም ገጽ ከነቕርበልኩም ኣይከኣልናን። በዚ ፈትኑ፡',
      solutions: [
        'ዝተጠቐምኩምሉ መእተዊ (URL) ቅኑዕ ምዃኑ ኣረጋግጹ',
        'ኣብ መእተዊኹም (ብራውዘር) ዘሎ መድገሚ ጠውቑ',
        "ነዚ'ዚ ንምርካብ ናይ ቢቢሲ መእተዊ ክትጥቀሙ ትኽእሉ",
      ],
      callToActionFirst: 'ከም ኣማራጺ ኣብ ናይ ',
      callToActionLinkText: 'BBC News ትግርኛ ገጽ',
      callToActionLast: ' ተወከሱ።',
      callToActionLinkUrl: 'https://www.bbc.com/tigrinya',
    },
    500: {
      statusCode: '500',
      title: 'ውሽጣዊ ጸገም ሰርቨር',
      message: 'ይቕሬታ፡ ነቲ ዝደለኹሞ ገጽ ክነቕርበልኩም ኣይከኣልናን። በዚ ፈትኑ፡',
      solutions: ['ኣብ መእተዊኹም (ብራውዘር) ዘሎ መድገሚ ጠውቑ', 'ጸኒሕኩም ክትምለሱ ምስ እትደልዩ'],
      callToActionFirst: 'ከም ኣማራጺ ከኣ ',
      callToActionLinkText: 'BBC News ትግርኛ',
      callToActionLast: ' ረኣይ።',
      callToActionLinkUrl: 'https://www.bbc.com/tigrinya',
    },
  },
  consentBanner: {
    privacy: {
      title: 'ኣብ ፖሊሲ ብሕትውናናን ኩኪታትን ምምሕያሻት ገይርና ኣለና።',
      description: {
        uk: {
          first:
            'ኣብ ፖሊሲ ብሕትውናናን ኩኪታትን ብዙሓት ኣገደስቲ ለውጥታት ገይርና ኣለና። እዚ ንዓኹምን ንዴታኹምን እንታይ ማለት ከምዝኾነ ክነፍልጠኩም ንደሊ።',
          linkText: null,
          last: null,
          linkUrl: null,
        },
        international: {
          first:
            'ኣብ ፖሊሲ ብሕትውናናን ኩኪታትን ብዙሓት ኣገደስቲ ለውጥታት ገይርና ኣለና። እዚ ንዓኹምን ንዴታኹምን እንታይ ማለት ከምዝኾነ ክነፍልጠኩም ንደሊ።',
          linkText: null,
          last: null,
          linkUrl: null,
        },
      },
      accept: 'ሕራይ',
      reject: 'እንታይ ከምዝተለወጠ ረኣዩ',
      rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
    },
    cookie: {
      amp: {
        accept: 'ሓበሬታ ንምእካብ ፍቓደኛታት እንተ ዄንኩም ቀጽሉ',
        reject: 'ሓበሬታ ንምእካብ ፍቓደኛታት እንተ ዘይኴንኩም ቀጽሉ',
        initial: {
          title: 'ብናይ ተንቀሳቓሲ ቴለፎን ገጽ (AMP) ሓበሬታ ክእንክብ ፍቓደኛታት ምዃንኩም ኣፍልጡና',
          description: {
            first: 'ንሕናን መሻርኽትናን ከም ',
            linkText: 'ኩኪስ',
            last: "  ዝኣመሰሉ ቴክኖሎጂ ክንጥቀም ዘድልየና፡ ብዛዕባ ናይ ኢንተርነት ኣጠቓቕማኹም ሓበሬታ ብምውህላል ንዓኹም ውልቃዊ ኣገዳስነት ዘለዎ ትሕዝቶ ወይ መወዓውዒ ብዝበለጸ ኣገባብ ንምቕራብ'ዩ። ትሰማምዑ እንተ ዄንኩም ኣፍልጡና።",
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          manage: 'መሳርዕ ምርጫታተይ ክውስን',
        },
        manage: {
          title: 'ናይ ተንቀሳቓሲ ቴለፎን ገጻት መሳርዕ (setting) ፍቓድ ክውስን',
          description: {
            para1:
              "እዞም መሳርዕ ንናይ ተንቀሳቓሲ ቴለፎን ገጻት ጥራይ ዝምልከቱ እዮም። ካብ ናይ ተንቀሳቓሲ ቴለፎን ወጻኢ ኣብ ዝርከብ ገጻት ቢቢሲ ምስ እትኸዱ'ውን ነዞም ምርጫታትኩም ደጊምኩም ክትሰርዑ ክትሕተቱ ትኽእሉ ኢኹም።",
            para2:
              "እዚ ዘለኹምዎ ናይ ፈኵስ ተንቀሳቃሲ ቴለፎን ገጽ ብናይ ጉግል ኤ-ኤም-ፒ (AMP) ቴክኖሎጂ ዝተሰርሐ'ዩ።",
            heading2: 'ኣዝዩ ኣገዳሲ ምእካብ ሓበሬታ',
            para3:
              'ናይ መርበብ ገጻትና ብግቡእ ንክሰርሕ፡ ብዛዕባ እቲ ንገጻትና ንምክትታል ትጥቀምሉ መሳርሒታት ዉሱን ሓበሬታ ብዘይ ፍቓድኩም ንዕቅብ ኢና።',
            para4: {
              text: 'ብዛዕባ ናይ መርበብ ገጻትና ብግቡእ ክሰርሑ ንምግባር ዝሕግዘና ኣብቲ እትጥቀምሉ መሳርሒ እንዕቅቦ ኣገዳሲ ሓበሬታ ንምፍላጥ ኣብዚ ኣንብቡ።',
              url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
            },
            para5: 'ንእተፍቅድዎ ምርጫታት ኣብቲ ኣብ መሳርሒኹም ዘሎ ማዕከን ኢና ንዕቅቦ',
            heading3: 'ሓበሬታ ዝእከበሉ ኣማራጺ',
            para6:
              "ኣብ ተንቀሳቓሲ ቴለፎን ኣብ ዘሎ ገጽና ሓበሬታ ክንእክብ እንተ ኣፍቂድኩምልና፡ ካብ ብሪጣንያ ወጻኢ ኣብ እትህልውሉ ንውልቅኹም ጥራይ ዝምልከት መውዓውዒ ከነርእየኩም ኣፍቂድኩም ኣለኹም ማለት'ዩ።",
            para7: {
              text: 'ብዛዕባ ኣብ ቢቢሲ ዘለዉ ውልቃዊ መወዓውዒታትን መሸርኽትናን ንምፍላጥ ኣብዚ ኣንብቡ',
              url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
            },
            para8:
              'ሓበሬታ ንምእካብ ፍቓደኛታት እንተ ዘይኴንኩም ቀጽሉ" ብምጥዋቕ ንውልቅኹም ጥራይ ዝምልከቱ መወዓውዒታት ከይትቕበሉ ክትውስኑ ትኽእሉ ኢኹም። ይኹን እምበር፡ ዋላ\'ኳ ንውልቅኹም ዝምልከቱ እንተዘይኮኑ መወዓውዒታት ከምእትርእዩ ከነዘኻኽር ንፈቱ።',
            para9:
              'ኣብ ዝኾነ ጊዜ፡ "ተወሳኺ ኣማራጺ/ ንሓበሬታይ ኣይትሽጥዎ" ኣብ ዝብል ብምጥዋቕ ምርጫታትኩም ክትቅይሩ ትኽእሉ ኢኹም።',
          },
        },
      },
      canonical: {
        title: "ኩኪስ' ንምጥቃም ከም ዝተሰማማዕኩም ኣፍልጡና",
        description: {
          uk: {
            first: 'ኣብ መርበብ ሓበሬታና ዝበለጸ ኣገልግሎት መታን ክትረኽቡ ኢና ',
            linkText: "'ኩኪስ'",
            last: " እንጥቀም። ንኹሎም እዞም 'ኩኪስ'  ከም እተሰማማዕኩምሎም ኣፍልጡና።",
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'ኣብ መርበብ ሓበሬታና ዝበለጸ ኣገልግሎት መታን ክትረኽቡ ኢና ',
            linkText: "'ኩኪስ'",
            last: " እንጥቀም። ንኹሎም እዞም 'ኩኪስ'  ከም እተሰማማዕኩምሎም ኣፍልጡና።",
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'እወ፡ እሰማማዕ እየ።',
        reject: 'ኣይፋል፡ ናብ መተዓራረዪ (ሴቲንግ) ውሰዱኒ።',
        rejectUrl:
          'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
  },
  media: {
    noJs: 'ትጥቀምሉ ዘለኹም መሳርሒ ኣይተቐበሎን።',
    contentExpired: 'እዚ እትደልይዎ ዘለኹም ትሕዝቶ የለን',
    contentNotYetAvailable: 'እዚ ትሕዝቶ ንምጽዋት የለን፡፡',
    audio: 'ድምጺ',
    photogallery: 'ስእልታት',
    video: 'ቪድዮ',
    listen: 'ስምዑ',
    watch: 'ተዓዘቡ',
    listenLive: 'ብቀጥታ ስምዑ',
    liveLabel: 'ቀጥታ',
    nextLabel: 'ዝቕጽል',
    previousRadioShow: 'ኣቐዲሙ ዝነበረ ፈነወ ራድዮ',
    nextRadioShow: 'ዝቕጽል ፈነወ ራድዮ',
    duration: 'ዕምሪ ፈነወ',
    recentEpisodes: 'ዝሓለፉ ክፋላት',
  },
  socialEmbed: {
    caption: {
      textPrefixVisuallyHidden: 'መግለጺ ቪድዮ፡, ',
      text: 'Warning: Third party content may contain adverts',
      articleText: 'Warning: ቢቢሲ ኣብ ካልእ ገጻት ንዘሎ ሓበሬታ ሓላፍነት ኣይወስድን።',
      articleAdditionalText: "ትሕዝቶ %provider_name% መወዓውዒታት ክህልዎ ይኽእል'ዩ።",
    },
    fallback: {
      text: 'Content is not available',
      linkText: 'View content on %provider_name%',
      linkTextSuffixVisuallyHidden: ', ደጋዊ',
      warningText: 'ቢቢሲ፡ ንትሕዝቶ ካልኦት መርበባት ሓበሬታ ሓላፍነት ኣይወስድን።',
    },
    skipLink: {
      text: 'Skip %provider_name% post',
      endTextVisuallyHidden: 'End of %provider_name% post',
    },
    consentBanner: {
      heading: `ንትሕዝቶ [social_media_site] ተፍቅድ ዶ?`,
      body: `እዚ ጽሑፍ ካብ [social_media_site] ዝተረኽቡ ትሕዝቶታት ኣሎዎ። እንተኾነ ኩኪስ ይዅን ካልእ ቴክኖሎጂ ክጥቀሙ ስለዝኽእሉ፡ ቅድሚ ምኽፋቱ ፍቓድኩም የድሊ። ፍቓደኛታት ቅድሚ ምዃንኩም፡ ነቲ ናይ [social_media_site] [link] ፖሊሲ ኩኪስ [/link] ከምኡ’ውን [link] ፖሊሲ ብሕትና [/link] ክተንብብዎ ትኽእሉ ኢኹም። ነዚ ትሕዝቶ ንምርኣይ፡ ‘እሰማማዕ’የ ቀጽል’ ዝብል ጠውቑ።`,
    },
  },
  include: {
    errorMessage: 'ይቕሬታ፡ ነዚ ክፋል ናይቲ ዛንታ ኣብዚ ፈኲስ ናይ ሞባይል ገጽ ከነቕርቦ ኣይከኣልናን',
    linkText: 'ምሉእ ትሕዝቶ ንምርኣይ ንምሉእ መቓን ገጽ ተዓዘቡ',
  },
  topStoriesTitle: 'ዜናታት',
  featuresAnalysisTitle: 'ኣዘራረብቲ ዛዕባታት',
  latestMediaTitle: 'ናይ መወዳእታ',
};
