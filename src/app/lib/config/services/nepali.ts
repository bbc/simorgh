import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kathmandu';
import '#psammead/psammead-locales/moment/ne';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ne`,
    articleAuthor: `http://www.facebook.com/bbcnews`,
    articleTimestampPrefix: '',
    articleTimestampSuffix: 'अद्यावधिक',
    atiAnalyticsAppName: 'news-nepali',
    atiAnalyticsProducerId: '63',
    atiAnalyticsProducerName: 'NEPALI',
    useReverb: true,
    chartbeatDomain: 'nepali.bbc.co.uk',
    brandName: 'BBC News नेपाली',
    product: 'BBC News',
    serviceLocalizedName: 'नेपाली',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/nepali.png',
    defaultImageAltText: 'BBC News नेपाली',
    dir: `ltr`,
    externalLinkText: ', बाह्य',
    imageCaptionOffscreenText: 'तस्बिरको क्याप्शन, ',
    videoCaptionOffscreenText: 'भिडिओ क्याप्शन सुरु हुँदैछ, ',
    audioCaptionOffscreenText: 'अडिओ क्याप्शन सुरु हुँदैछ, ',
    defaultCaptionOffscreenText: 'क्याप्शन, ',
    imageCopyrightOffscreenText: 'तस्बिर स्रोत, ',
    locale: `ne-NP`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ne',
    datetimeLocale: `ne`,
    service: 'nepali',
    serviceName: 'Nepali',
    languageName: 'Nepali',
    twitterCreator: '@bbcnepali',
    twitterSite: '@bbcnepali',
    noBylinesPolicy:
      'https://www.bbc.com/nepali/institutional-50318130#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/nepali/institutional-50318130',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/nepali/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'मुख पृष्ठ',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'पेज',
        previousPage: 'पछाडि',
        nextPage: 'अर्को',
        pageXOfY: 'पेज {x} को {y}',
      },
      ads: {
        advertisementLabel: 'विज्ञापन',
      },
      seeAll: 'सबै हेर्नुहोस्',
      home: 'होमपेज',
      currentPage: 'अहिलेको पृष्ठ',
      skipLinkText: 'सामग्रीमा जानुहोस्',
      relatedContent: 'सम्बन्धित सामग्री',
      relatedTopics: 'सम्बन्धित सामग्री',
      navMenuText: 'सूची',
      mediaAssetPage: {
        mediaPlayer: 'मिडिया प्लेअर',
        audioPlayer: 'अडिओ प्लेअर',
        videoPlayer: 'भिडिओ प्लेअर',
      },
      liveExperiencePage: {
        liveLabel: 'लाइभ',
        liveCoverage: 'लाइभ कभरेज',
        breaking: 'ब्रेकिंग',
        postedAt: 'पोस्ट गरिएको',
        summary: 'सारांश',
        shareButtonText: 'शेयर गर्नुहोस्',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'सारांश',
      error: {
        404: {
          statusCode: '४०४',
          title: 'सामग्री फेला परेन।',
          message:
            'माफ गर्नुहोस्। तपाईँले खोज्नुभएको सामग्री हामीले भेट्टाउन सकेनौँ। यी उपायहरू गर्नुहोस्:',
          solutions: [
            'URL सही छ कि छैन जाँच्नुहोस्',
            'ब्राउजरमा रिफ्रेश थिच्नुहोस्',
            'बीबीसी सर्चमा खोज्नुहोस्',
          ],
          callToActionFirst: 'अथवा ',
          callToActionLinkText: 'BBC News नेपाली',
          callToActionLast: 'को होमपेजमा जानुहोस्',
          callToActionLinkUrl: 'https://www.bbc.com/nepali',
        },
        500: {
          statusCode: '५००',
          title: 'सर्भरमा समस्या देखियो।',
          message:
            'माफ गर्नुहोस्। तपाईँले खोज्नुभएको सामग्री हामीले देखाउन सकेनौँ। निम्न उपायहरू गर्नुहोस्:',
          solutions: [
            'Refresh थिच्नुहोस्',
            'केही समयपछि पुन: प्रयास गर्नुहोस्।',
          ],
          callToActionFirst: 'अथवा ',
          callToActionLinkText: 'BBC News नेपाली',
          callToActionLast: 'को होमपेजमा जानुहोस्।',
          callToActionLinkUrl: 'https://www.bbc.com/nepali',
        },
      },
      consentBanner: {
        privacy: {
          title: 'हामीले गोपनीयता र कुकीजसम्बन्धी नीतिहरू परिमार्जन गरेका छौँ।',
          description: {
            uk: {
              first:
                'हामीले गोपनीयता र कुकीजसम्बन्धी नीतिहरूमा महत्त्वपूर्ण परिमार्जन गरेका कारण यसबाट तपाईँ र तपाईँको डेटालाई पार्न सक्ने प्रभावबारे पढ्नुहोस्।',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'हामीले गोपनीयता र कुकीजसम्बन्धी नीतिहरूमा महत्त्वपूर्ण परिमार्जन गरेका कारण यसबाट तपाईँ र तपाईँको डेटालाई पार्न सक्ने प्रभावबारे पढ्नुहोस्।',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'मान्य छ।',
          reject: 'परिमार्जित कुरा हेर्नुहोस्।',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'डेटा संकलनप्रति सहमत र अघि बढ्ने',
            reject: 'डेेटा संकलनप्रति असहमत र अघि बढ्ने',
            initial: {
              title:
                'AMP मा हुने डेटा संकलनका बारे तपाईँको सहमति छ कि छैन भन्ने विषयमा हामीलाई जानकारी दिनुहोस्।',
              description: {
                first:
                  'हामी र हाम्रा साझेदारहरू तपाईँको अनलाइन अनुभव अझ उपयोगी होओस्, तपाईँलाई प्रासंगिक सामग्री र विज्ञापन देखाउन ',
                linkText: 'कुकीज',
                last: 'जस्ता प्रविधि प्रयोग गरेर तपाईँले हाम्रो साइटमा गरेका क्रियाकलापका जानकारी सङ्ग्रह गर्छौँ। कृपया तपाईँलाई यो कुरा मान्य छ भने हामीलाई जानकारी दिनुहोस्।',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'सेटिङ्गको व्यवस्थापन गर्ने',
            },
            manage: {
              title: 'AMP पेजहरूमा सहमति सम्बन्धी सेटिङ्गहरू व्यवस्थापन गर्ने',
              description: {
                para1:
                  'यी सेटिङ्गहरू AMP पेजहरूमा मात्र लागु हुन्छन्।  AMP विनाका bbc.com  पेजहरूमा जानु भयो भने यी रोजाइहरू पुनः परिवर्तन गर्न तपाईँलाई भनिने छ।',
                para2:
                  'तपाईँले हेर्नु भएको लाइटवेट अर्थात सादा स्वरूपको मोबाइल पेज Google AMP प्रविधिबाट बनाइएको हो।',
                heading2: 'अत्यन्त आवश्यक डेटा संकलन',
                para3:
                  'हाम्रो वेब पेज काम गर्ने बनाउन हामीले तपाईँको सहमति विना नै तपाईँको उपकरणमा केही सिमित जानकारीहरू राखेका छौँ।',
                para4: {
                  text: 'हाम्रो वेेब पेजलाई काम गर्ने बनाउन तपाईँको उपकरणमा राखिएको अति जरूरी जानकारीकाबारे यहाँ पढ्नुहोस्।',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'तपाईँँको उपकरणमा सहमति सम्बन्धी जानकारीकालागि हामीले लोकल स्टोरेज प्रयोग गर्ने गर्छौँ।',
                heading3: 'एेच्छिक डेटा संकलन',
                para6:
                  'AMP पेेजहरूमा तपाईँले डेटा संकलनको अनुमित दिँदा तपाईँले हामीलाई व्यक्तिगत अनुकूलन गरिएको विज्ञापनहरू देखाउने अनुमित दिएको मानिनेछ। तपाईँ युके बाहिर रहँदा ती विज्ञापनहरू तपाईँ सान्दर्भिक हुनेछन्।',
                para7: {
                  text: 'बीबीसी र हाम्रा विज्ञापन साझेदारहरूले विज्ञापनलाई कसरी व्यक्तिगत अनुकूलन गर्ने गर्छौँ भन्ने जान्न यहाँ पढ्नुहोस्।',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'तपाईँलेे "डेेटा संकलनप्रति असहमत र अघि बढ्ने" विकल्पमा क्लिक गरेर व्यक्तिगत अनुकूलन गरिएका विज्ञापनहरू स्वीकार नगर्न सक्नुहुन्छ। तर तपाईँले अन्य विज्ञापन भने देख्न सक्नुहुन्छ ती भने तपाईँको रुचि अनुसारका नहुन सक्छन्।',
                para9:
                  'पेजको पुछारमा फुटरमा रहेको "विज्ञापन विकल्प/ मेरो जानकारी नबेच्नु" भन्ने विकल्पमा क्लिक गरेर यी सेटिङ्गहरू परिवर्तन गर्न सकिन्छ।',
              },
            },
          },
          canonical: {
            title: 'कुकीजसम्बन्धी नीति मान्य छ भन्ने हामीलाई जानकारी दिनुहोस्।',
            description: {
              uk: {
                first: 'हामी तपाईँको अनलाइन अनुभव अझ उपयोगी होओस् भनेर ',
                linkText: 'कुकीज',
                last: ' प्रयोग गर्छौँ। कृपया तपाईँलाई कुकीज मान्य छ भने हामीलाई जानकारी दिनुहोस्।',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'हामी तपाईँको अनलाइन अनुभव अझ उपयोगी होओस् भनेर ',
                linkText: 'कुकीज',
                last: ' प्रयोग गर्छौँ। कृपया तपाईँलाई कुकीज मान्य छ भने हामीलाई जानकारी दिनुहोस्।',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'मलाई मान्य छ।',
            reject: 'मलाई मान्य छैन, सेटिङ्समा जान चाहन्छु।',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'तपाईंको उपकरणमा मिडिया प्लेब्याक सपोर्ट छैन',
        contentExpired: 'यो सामग्री अब उपलब्ध छैन',
        contentNotYetAvailable: 'यो सामाग्री प्ले गर्नलाई उपलब्ध भइसकेको छैन।',
        audio: 'अडिओ',
        photogallery: 'तस्बिर सङ्ग्रह',
        video: 'भिडिओ',
        bbc_nepali_radio: {
          title: 'बीबीसी नेपाली रेडियो',
          subtitle:
            'नेपाली भाषामा बीबीसी विश्व सेवाको राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार तथा समसामयिक चर्चा, राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार विश्लेषण, समाचारमा रहेका व्यक्तित्वहरुसंगको अन्तर्वार्ता, साप्ताहिक बहस तथा छलफल, विज्ञान, स्वास्थ्य.',
        },
        listen: 'सुन्नुहोस्',
        watch: 'हेर्नुहोस्',
        listenLive: 'प्रत्यक्ष सुन्नुहोस्',
        listenNext: 'अर्को सुन्नुहोस्',
        liveLabel: 'लाइभ',
        nextLabel: 'अर्को',
        previousRadioShow: 'पछिल्लो रेडिओ कार्यक्रम',
        nextRadioShow: 'अघिल्लो रेडिओ कार्यक्रम',
        duration: 'समयावधि',
        recentEpisodes: 'पहिलेका कार्यक्रमहरू',
        podcastExternalLinks: 'यो पडकास्ट सुन्नकालागि यहाँ उपलब्ध छ',
        download: 'एपिसोड डाउनलोड',
        closeVideo: 'बाहिरिनुहोस्',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'भिडिओ क्याप्शन सुरु हुँदैछ, ',
          text: 'चेतावनी: तेस्रो पक्षको सामग्रीमा विज्ञापन हुनसक्छ',
          articleText:
            'चेतावनी: बाह्य वेबसाइटका सामग्रीप्रति बीबीसी जिम्मेवार हुने छैन।',
          articleAdditionalText:
            '%provider_name% का सामग्रीमा विज्ञापन हुन सक्छन्।',
        },
        fallback: {
          text: 'सामग्री उपलब्ध छैन',
          linkText: 'थप %provider_name% मा हेर्नुहोस्',
          linkTextSuffixVisuallyHidden: ', बाह्य सामग्री',
          warningText: 'अन्य वेबसाइटका सामग्रीहरूका लागि बीबीसी जिम्मेवार छैन।',
        },
        skipLink: {
          text: 'यो %provider_name% पोस्ट छोड्नुहोस्',
          endTextVisuallyHidden: '%provider_name% पोस्ट समाप्त',
        },
        consentBanner: {
          heading: `[social_media_site] को सामग्रीलाई अनुमति छ?`,
          body: `यो लेखमा [social_media_site] बाट प्राप्त सामग्री समाविष्ट छ। यहाँ केही लोड हुनुअघि हामी तपाईँसँग अनुमति माग्छौँ किनभने तिनले कुकीज र अन्य प्रविधि प्रयोग गरेका हुनसक्छन्। स्वीकृति दिनुअघि तपाईँ [social_media_site] [link] cookie policy [/link] र [link]पढ्न सक्नुहुन्छ।[/link] यो सामग्री हेर्नका लागि 'स्वीकार छ, अगाडि बढौँ' छान्नुहोस्।`,
          button: 'स्वीकार छ, अगाडि बढौँ',
        },
      },
      include: {
        errorMessage: 'मोबाइलपेजमा सामग्रीको यो भाग देखाउन हामी असमर्थ छौँ।',
        linkText: 'पूरा सामग्री हेर्न यो पेजको पूर्ण संस्करण हेर्नुहोस्।',
      },
      topStoriesTitle: 'मुख्य समाचार',
      featuresAnalysisTitle: 'अन‌ि यो पनि',
    },
    mostRead: {
      header: 'धेरै पढिएको',
      lastUpdated: 'मा अन्तिम चोटि अद्यावधिक',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'पछिल्लो कार्यक्रम सुन्नुहोस्',
      durationLabel: 'अवधि %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/nepali/institutional-50318130',
        text: 'बीबीसीको विश्वसनीयता',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'बाह्य वेबसाइटको लिङ्क प्रयोग सम्बन्धमा हाम्रो नीति पढ्नुहोस्।',
      },
      links: [
        {
          href: 'https://www.bbc.com/nepali/institutional-38157764',
          text: 'प्रयोगका सर्तहरू',
        },
        {
          href: 'https://www.bbc.com/nepali/institutional-38157766',
          text: 'बीबीसीको बारेमा',
        },
        {
          href: 'https://www.bbc.com/nepali/institutional-38157767',
          text: 'गोपनीयता नीति',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'कुकीज',
        },
        {
          href: 'https://www.bbc.co.uk/nepali/send/u50853511',
          text: 'बीबीसीलाई सम्पर्क गर्नुहोस्',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'अरू भाषामा बीबीसी',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'बीबीसी। अन्य वेबसाइटका सामग्रीहरूका लागि बीबीसी जिम्मेवार छैन।',
    },
    timezone: 'Asia/Kathmandu',
    navigation: [
      {
        title: 'समाचार',
        url: '/nepali',
      },
      {
        title: 'नेपाल',
        url: '/nepali/topics/cyx5k2yzyj6t',
      },
      {
        title: 'विश्व',
        url: '/nepali/topics/cy5nkr41gx6t',
      },
      {
        title: 'स्वास्थ्य',
        url: '/nepali/topics/c2dwqjg83q0t',
      },
      {
        title: 'विज्ञान तथा प्रविधि',
        url: '/nepali/topics/c9de5jl3967t',
      },
      {
        title: 'रेडिओ',
        url: '/nepali/bbc_nepali_radio/programmes/p0340xzv',
      },
    ],
  },
};

export default withContext(service);
