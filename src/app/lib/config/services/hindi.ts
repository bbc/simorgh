import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import '#psammead/psammead-locales/moment/hi';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `hi`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'अपडेटेड',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-hindi',
    atiAnalyticsProducerId: '52',
    chartbeatDomain: 'hindi.bbc.co.uk',
    brandName: 'BBC News हिंदी',
    product: 'BBC News',
    serviceLocalizedName: 'हिंदी',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hindi.png',
    defaultImageAltText: 'BBC News हिंदी',
    dir: `ltr`,
    externalLinkText: ', बाहरी',
    imageCaptionOffscreenText: 'इमेज कैप्शन, ',
    videoCaptionOffscreenText: 'वीडियो कैप्शन, ',
    audioCaptionOffscreenText: 'ऑडियो कैप्शन, ',
    defaultCaptionOffscreenText: 'कैप्शन, ',
    imageCopyrightOffscreenText: 'इमेज स्रोत, ',
    locale: `hi-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'hi',
    datetimeLocale: `hi`,
    service: 'hindi',
    serviceName: 'Hindi',
    languageName: 'Hindi',
    twitterCreator: '@bbchindi',
    twitterSite: '@bbchindi',
    noBylinesPolicy:
      'https://www.bbc.com/hindi/institutional-50223932#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/hindi/institutional-50223932',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'ब्रेकिंग न्यूज़ समाचार, ताजा खबर | News, latest news, breaking news',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    googleSiteVerification: 'D-aEHUiyVaMoUJXjVRbDVkxS0dLTMUZLD3dLPTnWO4Q',
    podcastPromo: {
      title: 'पॉडकास्ट',
      brandTitle: 'दिनभर: पूरा दिन,पूरी ख़बर (Dinbhar)',
      brandDescription:
        'वो राष्ट्रीय और अंतरराष्ट्रीय ख़बरें जो दिनभर सुर्खियां बनीं.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p09ds7cb.jpg',
        alt: 'दिनभर',
      },
      linkLabel: {
        text: 'दिनभर: पूरा दिन,पूरी ख़बर',
        href: 'https://www.bbc.com/hindi/podcasts/p09ds7zx',
      },
      skipLink: {
        text: 'छोड़कर %title% आगे बढ़ें',
        endTextVisuallyHidden: 'समाप्त',
      },
    },
    translations: {
      pagination: {
        previousPage: 'पिछला',
        nextPage: 'अगला',
        pageXOfY: 'Page {x} र {y}',
      },
      ads: {
        advertisementLabel: 'विज्ञापन',
      },
      recommendationTitle: 'ये भी पढ़ें',
      splitRecommendationTitle: 'कुछ और जानिए',
      seeAll: 'सब देखें',
      home: 'होम पेज',
      currentPage: 'मौजूदा पन्ना',
      skipLinkText: 'सामग्री को स्किप करें',
      relatedContent: 'संबंधित समाचार',
      relatedTopics: 'मिलते-जुलते मुद्दे',
      navMenuText: 'सेक्शन',
      mediaAssetPage: {
        mediaPlayer: 'मीडिया प्लेयर',
        audioPlayer: 'ऑडिया प्लेयर',
        videoPlayer: 'वीडियो प्लेयर',
      },
      liveExperiencePage: {
        liveLabel: 'लाइव',
        liveCoverage: 'लाइव कवरेज',
        breaking: 'ब्रेकिंग न्यूज़',
        postedAt: 'पोस्ट किया गया',
        summary: 'सारांश',
        shareButtonText: 'साझा कीजिए',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'सारांश',
      error: {
        404: {
          statusCode: '404',
          title: 'पेज नहीं मिला',
          message:
            'माफ़ी चाहते हैं, हम वह पन्ना नहीं दिखा पा रहे हैं जिसे आप ढूँढ रहे हैं. कृपया कोशिश करें:',
          solutions: [
            'URL को दोबारा जांचने की',
            'ब्राउज़र का रिफ़्रेश बटन दबाएं',
            'इस पेज को बीबीसी सर्च बार खोलकर खोजने की कोशिश करें',
          ],
          callToActionFirst: 'विकल्प के तौर पर हमारे ',
          callToActionLinkText: 'होमपेज BBC News हिंदी',
          callToActionLast: ' पर जाएं',
          callToActionLinkUrl: 'https://www.bbc.com/hindi',
        },
        500: {
          statusCode: '500',
          title: 'इंटरनल सर्वर एरर',
          message:
            'माफ़ी चाहते हैं, हम वह पन्ना नहीं दिखा पा रहे हैं जिसे आप ढूँढ रहे हैं. कृपया कोशिश करें:',
          solutions: [
            'ब्राउज़र का रिफ़्रेश बटन दबाएं',
            'कुछ समय बाद कोशिश करें',
          ],
          callToActionFirst: 'विकल्प के तौर पर हमारे ',
          callToActionLinkText: 'होमपेज BBC News हिंदी',
          callToActionLast: ' पर जाएं',
          callToActionLinkUrl: 'https://www.bbc.com/hindi',
        },
      },
      byline: {
        articleInformation: '....में',
        listItemImage: 'तस्वीर',
        published: 'प्रकाशित',
        reportingFrom: '........से',
        role: 'पदनाम',
      },
      consentBanner: {
        privacy: {
          title: 'हमने अपनी गोपनीयता और कुकीज़ की नीति को अपडेट किया है',
          description: {
            uk: {
              first:
                'हमने अपनी कुकीज़ और गोपनीयता की नीति में अहम बदलाव किए हैं, आपको जानना चाहिए कि इसका आप पर और आपके डेटा पर क्या असर होगा.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'हमने अपनी कुकीज़ और गोपनीयता की नीति में अहम बदलाव किए हैं, आपको जानना चाहिए कि इसका आप पर और आपके डेटा पर क्या असर होगा.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ओके',
          reject: 'जानें कि क्या बदला है',
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'डेटा कलेक्शन की मंजूरी दें और आगे बढ़ें',
            reject: 'डेटा कलेक्शन को नामंज़ूर करें और आगे बढ़ें',
            initial: {
              title:
                'हमें बताएँ कि आप एएमपी पर डेटा क्लेक्शन की सहमति दे रहे हैं',
              description: {
                first:
                  'हम और हमारे पार्टनर इस तरह की कुछ तकनीकों का इस्तेमाल करते हैं ',
                linkText: 'कुकीज़',
                last: ' का इस्तेमाल करके हम आपके ब्राउज़िंग डेटा की ज़रिए आपको बेहतर और ख़ास तौर पर आपके लिए सेवाएं देेते हैं. इससे हमें आपको सही कंटेंट और उपयुक्त विज्ञापन दिखाने में मदद मिलती है. हमें बताएं कि क्या आप इस पर राज़ी हैं.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'सेटिंग्स मैनेज करें',
            },
            manage: {
              title: 'एएमपी पेज की सेटिंग्स पर जाकर अपनी मंज़ूरी को मैनेज करें',
              description: {
                para1:
                  'ये सेटिंग्स सिर्फ़ एएमपी पन्नों के लिए ही है, आपसे आपकी पसंद दोबारा पूछी जा सकती है अगर आप बिना एएमपी वाले बीबीसी पन्ने पर जाते हैं.',
                para2:
                  'जो हल्का मोबाइल पन्ना आप देख रहे हैं उसे गूगल की एएमपी टेक्नोलॉजी के ज़रिए बनाया गया है.',
                heading2: 'पूरी तरह ज़रूरी डेटा क्लेक्शन',
                para3:
                  'अपनी वेबसाइट के ठीक से काम करने के लिए हमें सीमित स्तर पर कुछ जानकारियाँ सेव करनी पड़ती हैं जिसके लिए हम आपसे मंज़ूरी नहीं मांगते.',
                para4: {
                  text: 'उन जरूरी जानकारी के बारे में और अधिक पढ़ें जो हमने आपके डिवाइस पर स्टोर किए हैं ताकि पेज ठीक से दिख सके.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'हमें आपकी मंज़ूरी और पसंद को आपकी डिवाइस के लोकल स्टोरेज में स्टोर करते हैं.',
                heading3: 'वैकल्पिक डेटा क्लेक्शन',
                para6:
                  'जब आप हमें एएमपी डेटा कलेक्शन की मंज़ूरी देते हैं तो इसका मतलब होता है कि आप हमें आपकी रुचि के विज्ञापन दिखाने की भी मंज़ूरी दे रहे हैं. ऐसा तभी होता है जब आप ब्रिटेन से बाहर हों.',
                para7: {
                  text: 'हम आपकी रुचि के अनुरूप विज्ञापन और अपने विज्ञापनदाता कैसे चुनते हैं यह जानने के लिए और पढ़ें.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'आप डेटा कलेक्शन को नामंज़ूर करके आगे बढ़ने का विकल्प चुनते हैं तो आपकी रुचि के अनुरूप विज्ञापन नहीं दिखाए जाएँगे, लेकिन विज्ञापन आपको फिर भी दिखाए जाएँगे लेकिन वे पर्सनलाइज्ड नहीं होंगे.',
                para9:
                  'आप एड च्वाइसेस वाले बटन पर क्लिक करके अपनी पसंद बदल सकते हैं. आप डो नॉट सेल माइ इनफ़ो वाले बटन पर कभी भी क्लिक कर सकते हैं.',
              },
            },
          },
          canonical: {
            title: 'हमें बताएं कि आप कुकीज़ को लेकर सहमत हैं',
            description: {
              uk: {
                first: 'हम ',
                linkText: 'कुकीज़',
                last: ' का इस्तेमाल आपको बेहतर ऑनलाइन सेवाएं देने के लिए करते हैं. हमें बताएं कि आप इन सभी कुकीज़ से सहमत हैं.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'हम ',
                linkText: 'कुकीज़',
                last: ' का इस्तेमाल आपको बेहतर ऑनलाइन सेवाएं देने के लिए करते हैं. हमें बताएं कि आप इन सभी कुकीज़ से सहमत हैं.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'हां, मैं राज़ी हूं',
            reject: 'नहीं, मुझे सेटिंग्स पर ले चलें',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'प्लेबैक आपके उपकरण पर नहीं हो पा रहा',
        contentExpired: 'यह सामग्री अब उपलब्ध नहीं है.',
        contentNotYetAvailable: 'यह कार्यक्रम अभी चलने के लिए तैयार नहीं है.',
        audio: 'ऑडियो',
        photogallery: 'फ़ोटो गैलरी',
        video: 'वीडियो',
        bbc_hindi_radio: {
          title: 'बीबीसी हिंदी',
          subtitle:
            'दुनिया और भारत की ख़बरें, विश्लेषण और फ़ीचर. हिंदी में संवाद के सूत्रधार',
        },
        bbc_hindi_tv: {
          title: 'दुनिया',
          subtitle:
            'बीबीसी दुनिया में देखिए ताज़ा अंतरराष्ट्रीय और क्षेत्रीय ख़बरें, उनका विश्लेषण और सोशल मीडिया की हलचल. साथ ही होंगी कई रोचक ख़बरें भी.',
        },
        listen: 'सुनिए',
        watch: 'देखिए',
        listenLive: 'लाइव सुनें',
        listenNext: 'इसके बाद सुनिए',
        liveLabel: 'लाइव',
        nextLabel: 'अगला',
        previousRadioShow: 'पिछला रेडियो शो',
        nextRadioShow: 'अगला रेडियो शो',
        duration: 'अवधि',
        recentEpisodes: 'प्रसारण का समय',
        podcastExternalLinks: 'ये पॉडकास्ट इन प्लेटफ़ॉर्म्स पर भी उपलब्ध है -',
        download: 'एपिसोड डाउनलोड करें',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'वीडियो कैप्शन ',
          text: 'चेतावनी: तीसरे पक्ष की सामग्री में विज्ञापन हो सकते हैं.',
          articleText:
            'चेतावनी: बीबीसी दूसरी वेबसाइट्स की सामग्री के लिए ज़िम्मेदार नहीं है.',
          articleAdditionalText:
            '%provider_name% सामग्री में विज्ञापन हो सकते हैं.',
        },
        fallback: {
          text: 'सामग्री् उपलब्ध नहीं है',
          linkText: 'सोशल नेटवर्क पर और देखिए',
          linkTextSuffixVisuallyHidden: ' बाहरी सामग्री',
          warningText:
            'बाहरी साइटों की सामग्री के लिए बीबीसी ज़िम्मेदार नहीं है.',
        },
        skipLink: {
          text: 'छोड़िए %provider_name% पोस्ट',
          endTextVisuallyHidden: 'पोस्ट %provider_name% समाप्त',
        },
        consentBanner: {
          heading: '[social_media_site] सामग्री की इजाज़त?',
          body: `इस लेख में [social_media_site] से मिली सामग्री शामिल है. कुछ भी लोड होने से पहले हम आपकी इजाज़त मांगते हैं क्योंकि उनमें कुकीज़ और दूसरी तकनीकों का इस्तेमाल किया गया हो सकता है. आप स्वीकार करने से पहले [social_media_site] [link] cookie policy [/link] और [link] को पढ़ना चाहेंगे [/link]. इस सामग्री को देखने के लिए  'अनुमति  देंऔर जारी रखें' को चुनें.`,
          button: 'अनुमति  देंऔर जारी रखें',
        },
      },
      include: {
        errorMessage:
          'माफ़ी चाहते हैं, हम इस स्टोरी का कुछ हिस्सा लाइटवेट मोबाइल पेज पर नहीं दिखा सकते.',
        linkText:
          'आप अगर पूरी स्टोरी देखना चाहते हैं तो हमारे फुल वर्ज़न पर जाएं.',
      },
      topStoriesTitle: 'टॉप स्टोरी',
      featuresAnalysisTitle: 'ज़रूर पढ़ें',
      latestMediaTitle: 'ताज़ा',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'वैकल्पिक',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'आप इसे अपलोड कर रहे हैं:',
        fileUploadButton: 'एक फाइल चुनें',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'भेजें',

        // Validation
        validationRequired: 'कुछ तो गड़बड़ है',
        validationInvalidEmail:
          'कुछ गड़बड़ लग रही है. कृपया आप सही ई-मेल लिखें',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'यहां आवश्यक फाइलों की संख्या पूरी नहीं है. कृपया भेजने के लिए कम से कम फाइलें अपलोड करें {{minFiles}}.',
        validationFilesTooMany:
          'यहां पर ज़्यादा फाइलें हैं. आप अधिकतम फाइलें ही भेज सकते हैं {{maxFiles}}.',
        validationFilesInvalidType:
          'खेद है. हम इस तरह की फाइल का इस्तेमाल नहीं कर सकते. आप इन फाइलों में से किसी एक तरह की फाइल का चुनाव करें {{fileTypes}}.',
        validationFilesTooSmall:
          'इस फाइल में कुछ गड़बड़ है. किसी अन्य फाइल का चुनाव करें',
        validationFilesSizeExceeded:
          'खेद है. आपकी फाइलें काफी बड़ी हैं. आप एक बार में केवल 2GB की फाइलें ही अपलोड कर सकते हैं',
        validationWordLimit:
          'अधिकतम {{wordLimit}} शब्दों की फाइल ही भेज सकते हैं',

        // Messaging
        retentionPeriodDays: undefined,
        referenceNumber: 'रेफरेंस नंबर',
        submissionInfoSignedOutMessage:
          'आप अपने रेफरेंस के लिए इन बातो को नोट कर सकते हैं',
        privacyInfoHtml: undefined,
        emailToHtml:
          'ई-मेल {{emailLink}} अगर आप अपना विचार बदलते हैं, तो बस अपने रेफरेंस नंबर के साथ हमें ई-मेल करें कि आप अपनी भेजी सामग्री इस्तेमाल नहीं होने देना चाहते हैं',
        removalGuidelineText: undefined,

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'आपकी फाइल अपलोड हो रही है...',
        uploadingDescription: 'जब तक पूरा न हो जाए, तब तक इंतज़ार करें',

        // Success Screen
        successHeading: 'संदेश भेजा जा चुका है',
        successDescription: 'हमसे संपर्क करने के लिए आपका शुक्रिया',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'आपका संदेश नहीं भेजा गया है',
        errorDescription: 'कृपया फिर भेजने का प्रयास करें',

        // Closed Screen
        closedHeading: 'अब यह विकल्प बंद हो चुका है',
        closedDescription: 'ये इस तारीख़ को बंद हो चुका है {{date}}.',
      },
    },
    mostRead: {
      header: 'सबसे अधिक पढ़ी गईं',
      lastUpdated: 'अंतिम अपडेट:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'छोड़कर %title% आगे बढ़ें',
        endTextVisuallyHidden: 'समाप्त',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/hindi/institutional-50223932',
        text: 'आप बीबीसी पर क्यों भरोसा कर सकते हैं',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'बाहरी साइटों का लिंक देने की हमारी नीति के बारे में पढ़ें.',
      },
      links: [
        {
          href: 'https://www.bbc.com/hindi/institutional-37342293',
          text: 'इस्तेमाल की शर्तें',
        },
        {
          href: 'https://www.bbc.com/hindi/institutional-37343168',
          text: 'बीबीसी के बारे में',
        },
        {
          href: 'https://www.bbc.com/hindi/institutional-37342614',
          text: 'निजता की नीति',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'कुकीज़',
        },
        {
          href: 'https://www.bbc.co.uk/hindi/send/u50853357',
          text: 'बीबीसी से संपर्क',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. बाहरी साइटों की सामग्री के लिए बीबीसी ज़िम्मेदार नहीं है.',
      collectiveNewsroomText:
        'बीबीसी के लिए कलेक्टिव न्यूज़रूम की ओर से प्रकाशित',
    },
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'होम पेज',
        url: '/hindi',
      },
      {
        title: 'भारत',
        url: '/hindi/topics/ckdxnkz7607t',
      },
      {
        title: 'अमेरिकी चुनाव 2024',
        url: '/hindi/topics/cp9r94x30m5t',
      },
      {
        title: 'विदेश',
        url: '/hindi/topics/c9wpm0en87xt',
      },
      {
        title: 'मनोरंजन',
        url: '/hindi/topics/c06gq3n0pp7t',
      },
      {
        title: 'खेल',
        url: '/hindi/topics/cwr9j8g1kj9t',
      },
      {
        title: 'विज्ञान-टेक्नॉलॉजी',
        url: '/hindi/topics/c2lej0594knt',
      },
      {
        title: 'सोशल',
        url: '/hindi/topics/c2e4q0z9qznt',
      },
      {
        title: 'वीडियो',
        url: '/hindi/topics/cw9kv0kpxydt',
      },
      {
        title: 'पॉडकास्ट',
        url: '/hindi/institutional-61824775',
      },
    ],
  },
};

export default withContext(service);
