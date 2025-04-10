import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import '#psammead/psammead-locales/moment/mr';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `mr`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'अपडेटेड',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-marathi',
    atiAnalyticsProducerId: '59',
    atiAnalyticsProducerName: 'MARATHI',
    useReverb: true,
    chartbeatDomain: 'marathi.bbc.co.uk',
    brandName: 'BBC News मराठी',
    product: 'BBC News',
    serviceLocalizedName: 'मराठी',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/marathi.png',
    defaultImageAltText: 'BBC News मराठी',
    dir: `ltr`,
    externalLinkText: ', बाहेर',
    imageCaptionOffscreenText: 'फोटो कॅप्शन, ',
    videoCaptionOffscreenText: 'व्हीडिओ कॅप्शन, ',
    audioCaptionOffscreenText: 'ऑडिओ कॅप्शन, ',
    defaultCaptionOffscreenText: 'कॅप्शन, ',
    imageCopyrightOffscreenText: 'फोटो स्रोत, ',
    locale: `mr-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'mr',
    datetimeLocale: `mr`,
    service: 'marathi',
    serviceName: 'Marathi',
    languageName: 'Marathi',
    twitterCreator: '@bbcnewsmarathi',
    twitterSite: '@bbcnewsmarathi',
    noBylinesPolicy:
      'https://www.bbc.com/marathi/institutional-50418391#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/marathi/institutional-50418391',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/marathi/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'बातम्या',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'बीबीसी मराठी व्हॉट्सॲपवर',
      brandTitle: 'बीबीसी न्यूज मराठी आता व्हॉट्सॲपवर',
      brandDescription:
        'तुमच्या कामाच्या गोष्टी आणि बातम्या आता थेट तुमच्या फोनवर',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0kptdp6.jpg',
        alt: 'BBC News मराठी आत्ताच फॉलो करा WhatsApp कर',
      },
      linkLabel: {
        text: 'फॉलो करा',
        href: 'https://www.whatsapp.com/channel/0029Vaa8TxTIyPtQpqWBTh3j',
      },
    },
    translations: {
      pagination: {
        page: 'पान',
        previousPage: 'मागील',
        nextPage: 'पुढील',
        pageXOfY: 'पान {x} पैकी {y}',
      },
      ads: {
        advertisementLabel: 'जाहिरात',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: 'सर्व पाहा',
      home: 'बातम्या',
      currentPage: 'सध्याचे पान',
      skipLinkText: 'थेट मजकुरावर जा',
      relatedContent: 'संबंधित मजकूर',
      relatedTopics: 'संबंधित विषय',
      navMenuText: 'विभाग',
      mediaAssetPage: {
        mediaPlayer: 'मीडिया प्लेयर',
        audioPlayer: 'ऑडिओ प्लेयर',
        videoPlayer: 'व्हीडिओ प्लेयर',
      },
      liveExperiencePage: {
        liveLabel: 'LIVE',
        liveCoverage: 'लाईव्ह कव्हरेज',
        breaking: 'ब्रेकिंग',
        postedAt: 'वाजता पोस्ट केलं',
        summary: 'थोडक्यात',
        shareButtonText: 'शेअर करा',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'थोडक्यात',
      error: {
        404: {
          statusCode: '404',
          title: 'हे पान सापडलं नाही',
          message:
            'माफ करा, तुम्ही शोधत असलेलं पान आम्हाला सापडलं नाही. कृपया हे करून पाहा:',
          solutions: [
            'तुमचं URL पुन्हा एकदा तपासा',
            'तुमच्या ब्राऊझरमध्ये रिफ्रेश बटण दाबा',
            'बीबीसीचं सर्च बार वापरून हे पृष्ठ शोधा',
          ],
          callToActionFirst: 'किंवा, ',
          callToActionLinkText: 'बीबीसी न्यूज मराठी',
          callToActionLast: 'च्या होमपेजला भेट द्या.',
          callToActionLinkUrl: 'https://www.bbc.com/marathi',
        },
        500: {
          statusCode: '500',
          title: 'अंतर्गत सर्व्हरमध्ये बिघाड',
          message:
            'माफ करा, तुम्ही शोधत असलेलं पृष्ठ आम्हाला सापडले नाही. कृपया प्रयत्न करा:',
          solutions: [
            'तुमच्या ब्राऊझरमध्ये रिफ्रेश बटण दाबा',
            'थोड्या वेळाने परत या',
          ],
          callToActionFirst: 'किंवा, ',
          callToActionLinkText: 'बीबीसी न्यूज मराठी',
          callToActionLast: 'च्या होमपेजला भेट द्या.',
          callToActionLinkUrl: 'https://www.bbc.com/marathi',
        },
      },
      consentBanner: {
        privacy: {
          title: 'आम्ही आमचं गोपनीयतेचं आणि कुकीजच्या बाबतीतलं धोरण बदललं आहे',
          description: {
            uk: {
              first:
                'आम्ही आमच्या गोपनीयतेच्या आणि कुकीजच्या बाबतीतल्या धोरणांमध्ये काही महत्त्वपूर्ण बदल केले आहेत आणि आम्हाला वाटतं तुम्ही हे जाणून घ्यायला हवं की त्याचा तुमच्यावर काय परिणाम होऊ शकतो.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'आम्ही आमच्या गोपनीयतेच्या आणि कुकीजच्या बाबतीतल्या धोरणांमध्ये काही महत्त्वपूर्ण बदल केले आहेत आणि आम्हाला वाटतं तुम्ही हे जाणून घ्यायला हवं की त्याचा तुमच्यावर काय परिणाम होऊ शकतो.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ओके',
          reject: 'पाहा नेमकं काय बदललंय',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'माहिती गोळा करा आणि पुढे सुरू ठेवा',
            reject: 'माहिती गोळा करू नका आणि पुढे सुरू ठेवा',
            initial: {
              title:
                'AMP संदर्भात माहिती जमा करण्यासाठी तुम्ही राजी आहात का हे आम्हाला सांगा.',
              description: {
                first: 'आम्ही आणि आमचे सहकारी ',
                linkText: 'कुकीज',
                last: 'सारखं तंत्रज्ञान वापरून तुमचा ब्राऊझिंग डेटा गोळा करत असतो, जेणेकरून तुमचा ऑनलाईन अनुभव सर्वोत्तम व्हावा आणि तुम्हाला खास तुमच्यासाठीचा मजकूर आणि अ‍ॅड दाखवता याव्यात. तुमची याला सहमती असल्याचं आम्हाला कळवा.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'सेटिंग्ज पाहा',
            },
            manage: {
              title: 'AMP पानांवर परवानगी संदर्भातील सेटिंग्ज दाखवा',
              description: {
                para1:
                  'ही सेटिंग्ज AMP पानांपुरतीच मर्यादित आहेत. तुम्ही BBCच्या बिगर-AMP पानांना भेट द्याल, तेव्हा तुम्हाला पुन्हा पर्यायांसाठी विचारणा होऊ शकते.',
                para2:
                  'मोबाईलसाठी त्वरित लोड होऊ शकणारं हे पान गुगलच्या AMP तंत्रज्ञानातून तयार करण्यात आलं आहे.',
                heading2: 'ही माहिती जमा करणं आवश्यक आहे',
                para3:
                  'आमची वेबपेजेस सुलभपणे चालावीत यासाठी आम्ही मर्यादित प्रमाणात तुमच्या उपकरणाविषयीची काही माहिती विनाअनुमती साठवतो.',
                para4: {
                  text: 'वेबपेजेस सुरळीतपणे चालावीत यासाठी तुमच्या उपकरणातील कोणती माहिती साठवली जाते याविषयी वाचा.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'तुमच्या परवानगीचे पर्याय साठवण्यासाठी आम्ही तुमच्या उपकरणातील लोकल स्टोरेजचा वापर करतो.',
                heading3: 'वैकल्पिक माहिती गोळा करणे',
                para6:
                  'जेव्हा तुम्ही युके बाहेर असताना AMP पानांसंदर्भातली माहिती गोळा करण्याची परवानगी देता, तेव्हा तुम्हाला विशिष्ट वैयक्तिक स्वरूपाच्या जाहिराती दाखवण्यात याव्यात यासाठी तुमची परवानगी आहे असा अर्थ होतो.',
                para7: {
                  text: 'बीबीसी आणि आमचे जाहिरात पार्टनर वैयक्तिक स्वरूपाच्या जाहिराती कसे देतात याविषयी वाचा.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  "वैयक्तिक स्वरूपाच्या जाहिराती दिसू नयेत यासाठी तुम्ही 'माहिती गोळा करू नका आणि पुढे सुरू ठेवा' हा पर्याय  निवडू शकता.",
                para9:
                  'तुम्ही या सेटिंग्समध्ये कधीही बदल करण्यासाठी तळाशी असलेल्या "Ad Choices / Do not sell my info" या पर्यायांवर क्लिक करू शकता.',
              },
            },
          },
          canonical: {
            title: 'तुम्ही कुकीजच्या बाबतीत सहमत असल्याचं आम्हाला सांगा',
            description: {
              uk: {
                first: 'आम्ही ',
                linkText: 'कुकीज',
                last: ' वापरून तुमचा ऑनलाईन अनुभव सर्वोत्तम करण्याचा प्रयत्न करतो. सर्व कुकीजच्या बाबतीत तुमची सहमती असल्याचं आम्हाला कळवा.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'आम्ही ',
                linkText: 'कुकीज',
                last: ' वापरून तुमचा ऑनलाईन अनुभव सर्वोत्तम करण्याचा प्रयत्न करतो. सर्व कुकीजच्या बाबतीत तुमची सहमती असल्याचं आम्हाला कळवा.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'हो, माझी सहमती आहे',
            reject: 'नाही, मला सेटिंग्स दाखवा',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'मीडिया प्लेबॅक आपल्या डिव्हाइसवर असमर्थित आहे',
        contentExpired: 'ही सामग्री यापुढे उपलब्ध नाही',
        contentNotYetAvailable: 'ही सामग्री अद्याप प्ले करण्यासाठी उपलब्ध नाही',
        audio: 'ऑडिओ',
        photogallery: 'फोटो गॅलरी',
        video: 'व्हीडिओ',
        bbc_marathi_tv: {
          title: 'BBC विश्व',
          subtitle:
            'मराठीतल्या पहिल्या डिजिटल बुलेटिनमध्ये पाहा देश-विदेशातल्या ताज्या बातम्या.',
        },
        listen: 'ऐका',
        watch: 'पाहा',
        watchMoments: 'शॉर्ट व्हीडिओ पाहा',
        liveLabel: 'LIVE',
        nextLabel: 'पुढचे',
        listenLive: 'ऐका',
        listenNext: 'पुढचा ऐका',
        previousRadioShow: 'यापूर्वीचा रेडिओ शो',
        nextRadioShow: 'पुढचा रेडिओ शो',
        duration: 'वेळ',
        recentEpisodes: 'ताजे एपिसोड',
        podcastExternalLinks: 'हे पॉडकास्ट तुम्ही इथे ऐकू शकता',
        download: 'एपिसोड डाऊनलोड करा',
        closeVideo: 'बंद करा',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'व्हीडिओ कॅप्शन, ',
          text: 'सावधान: बाहेरच्या मजकुरावर काही अॅड असू शकतात',
          articleText:
            'सावधान: अन्य वेबसाईट्सवरील मजकुरासाठी बीबीसी जबाबदार नाही.  ',
          articleAdditionalText:
            '%provider_name% मजुकरात जाहिरातींचा समावेश असू शकतो.',
        },
        fallback: {
          text: 'मजकूर उपलब्ध नाही',
          linkText: '%provider_name%वर आणखी पाहा',
          linkTextSuffixVisuallyHidden: ', बाहेरचा मजकूर',
          warningText:
            'बीबीसी बाह्य इंटरनेट साइट्सच्या सामग्रीसाठी बीबीसी जबाबदार नाही. बाह्य लिंक्सबद्दल आम्हाल काय वाटतं? इथे वाचा.',
        },
        skipLink: {
          text: '%provider_name% पोस्टवरून पुढे जा',
          endTextVisuallyHidden: '%provider_name% पोस्ट समाप्त',
        },
        consentBanner: {
          heading: `परवानगी (सोशल मीडिया साईट) मजकूर?`,
          body: `या लेखात सोशल मीडियावरील वेबसाईट्सवरचा मजकुराचा समावेश आहे. कुठलाही मजकूर अपलोड करण्यापूर्वी आम्ही तुमची परवानगी विचारतो. कारण संबंधित वेबसाईट कुकीज तसंच अन्य तंत्रज्ञान वापरतं. तुम्ही स्वीकारण्यापूर्वी सोशल मीडिया वेबसाईट्सची कुकीज तसंच गोपनीयतेसंदर्भातील धोरण वाचू शकता. हा मजकूर पाहण्यासाठी 'स्वीकारा आणि पुढे सुरू ठेवा'.`,
          button: 'मान्य करा आणि पुढे जा',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'मोठ्या बातम्या',
      featuresAnalysisTitle: 'बीबीसी मराठी स्पेशल',
      latestMediaTitle: 'नवीनतम',
    },
    mostRead: {
      header: 'सर्वाधिक वाचलेले',
      lastUpdated: 'शेवटचा अपडेट:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/marathi/institutional-50418391',
        text: 'तुम्ही बीबीसीवर विश्वास ठेवू शकता कारण',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'बाह्य लिंक्सबद्दल आम्हाल काय वाटतं? इथे वाचा.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'वापराच्या अटी',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'गोपनीयतेचं धोरण',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'कुकीज',
        },
        {
          href: 'https://www.bbc.co.uk/marathi/send/u50853467',
          text: 'बीबीसीशी संपर्क साधाा',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News इतर भाषांमध्ये',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. बीबीसी बाह्य इंटरनेट साइट्सच्या सामग्रीसाठी बीबीसी जबाबदार नाही. बाह्य लिंक्सबद्दल आम्हाल काय वाटतं? इथे वाचा.',
      collectiveNewsroomText: 'बीबीसीसाठी कलेक्टिव्ह न्यूजरूमचं प्रकाशन',
    },
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'बातम्या',
        url: '/marathi',
      },
      {
        title: 'महाराष्ट्र',
        url: '/marathi/topics/c5qvpxvv7y3t',
      },
      {
        title: 'भारत',
        url: '/marathi/topics/cxnyk3y49x6t',
      },
      {
        title: 'आंतरराष्ट्रीय',
        url: '/marathi/topics/c719d2enyn3t',
      },
      {
        title: 'व्हीडिओ',
        url: '/marathi/topics/cl29j0epz13t',
      },
      {
        title: 'सोपी गोष्ट',
        url: '/marathi/topics/cpxrqmrke02t',
      },
      {
        title: 'लोकप्रिय',
        url: '/marathi/popular/read',
      },
    ],
  },
};

export default withContext(service);
