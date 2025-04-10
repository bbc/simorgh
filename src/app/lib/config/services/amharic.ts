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
    atiAnalyticsProducerName: 'AMHARIC',
    useReverb: true,
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
    manifestPath: '/amharic/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'ዜና',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'ቢቢሲ አማርኛ በዋትስአፕ',
      brandTitle: 'የቢቢሲ አማርኛ ዋትስአፕ ቻናል',
      brandDescription: 'ዜና፣ ትንታኔ እና ታሪኮችን በቀጥታ በዋትስአፕ ለማግኘት',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe//p0krq6vq.png',
        alt: 'የቢቢሲ አማርኛ ዋትስአፕ ቻናል',
      },
      linkLabel: {
        text: 'ይህን በመጫን የቻናላችን አባል ይሁኑ!',
        href: 'https://bit.ly/4gsoTyI',
      },
    },
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
      liveExperiencePage: {
        liveLabel: 'ቀጥታ',
        liveCoverage: 'የቀጥታ ሽፋን',
        breaking: 'ሰበር',
        postedAt: 'የታተመዉ',
        summary: 'ጭምቅ ሃሳብ',
        shareButtonText: 'ያጋሩ',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
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
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
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
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
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
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'እሺ፣ እስማማለሁ',
            reject: 'ወደ ማውጫ መመለስ እፈልጋለሁ',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
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
        closeVideo: 'ይውጡ',
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
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'ግዴት አይደለም',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'እየጫኑ ያሉት ይህ ነው፡',
        fileUploadButton: 'ፋይል ይምረጡ',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'ላክ',

        // Validation
        validationRequired: 'አንድ የጎደለ ነገር አለ',
        validationInvalidEmail: 'ትክክል አይመስልም። እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough: 'በቂ ፋይሎች አይደሉም። እባክዎ ቢያንስ {{minFiles}} ያስገቡ።',
        validationFilesTooMany: 'ብዙ ፋይሎች ናቸው። መጫን የሚችሉት የፋይል መጠን {{maxFiles}}።',
        validationFilesInvalidType:
          'ይቅርታ፤ እንደዚህ አይነት ፋይሎችን መጠቀም አንችልም። እባክዎ {{fileTypes}} አይነት ፋይሎችን ይጨምሩ።',
        validationFilesTooSmall: 'ፋይሉ ስህተት አለው። እባክዎ ሌላ ፋይል ይምረጡ።',
        validationFilesSizeExceeded:
          'ይቅርታ፤ እነዚህ ፋይሎች መጠናቸው ከፍ ያለ ነው። በአንድ ግዜ መጫን የሚችሉት 1.2GB ፋይል ነው።',
        validationWordLimit: 'የሚፈቀደው የቃላት መጠን {{wordLimit}}',

        // Messaging
        retentionPeriodDays: undefined,
        referenceNumber: 'መለያ ቁጥር',
        submissionInfoSignedOutMessage: 'ለማስታወስ ያክል ዝርዝሩን በግልዎ መዝግበው መያዝ ይችላሉ።',
        privacyInfoHtml:
          'የግላዊ መረጃዎ ምስጢራዊነት የተጠበቀ ይሆናል፤ ዝርዝሩን ለማወቅ {{privacyInfoLink}} ክፍል ያንብቡ።',
        emailToHtml:
          'ሃሳብዎን ቀይረው መጠቀም ካልፈለጉ፤ በዚህ አድራሻ ኢሜይል ይላኩ {{emailLink}}። የማጣቀሻ ቁጥሩንም ከመጻፍ አይዘንጉ።',
        removalGuidelineText:
          'በፕሮግራም ወይም በኦንላይን ላይ አንዳች ነገር አቅርበው ጥቅም ላይ ከዋለ በኋላ ልናነሳው አንችልም።',

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'በመጫን ላይ . . .',
        uploadingDescription: 'እባክዎ እስኪጠናቀቅ ድረስ ይጠብቁ።',

        // Success Screen
        successHeading: 'መልዕክቱ ተልኳል',
        successDescription: 'መልዕክት ስለላኩ እናመሰግናለን',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'መልዕክትዎ አልተጫነም',
        errorDescription: 'በድጋሚ ለመጫን ይሞክሩ',

        // Closed Screen
        closedHeading: 'ይህ አሁን ዝግ ነው',
        closedDescription: 'ይህ የተዘጋው {{date}} ነው።',
      },
    },
    mostRead: {
      header: 'ብዙ የተነበቡ',
      lastUpdated: 'በመጨረሻ ማሻሻያ የተደረገበት',
      numberOfItems: 10,
      hasMostRead: true,
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
          href: 'https://www.bbc.com/ws/languages',
          text: 'ቢቢሲን በተለያዩ ቋንቋዎች',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
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
        title: 'ፖለቲካ',
        url: '/amharic/topics/cg7265pj1jvt',
      },
      {
        title: 'ሴቶች',
        url: '/amharic/topics/cnq681w4dq6t',
      },
      {
        title: 'ጤና',
        url: '/amharic/topics/cxnyk76p0q2t',
      },
      {
        title: 'ስፖርት',
        url: '/amharic/topics/cdr56g2x71dt',
      },
      {
        title: 'ጥበብ',
        url: '/amharic/topics/cr50yvqzzwpt',
      },
      {
        title: 'ቴክኖሎጂ',
        url: '/amharic/topics/c06gq8wx467t',
      },
      {
        title: 'ምጣኔ ሃብት',
        url: '/amharic/topics/cnq6815jj3xt',
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
