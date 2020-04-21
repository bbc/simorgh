import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { nepali as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Kathmandu';
import '@bbc/psammead-locales/moment/ne';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `ne`,
    articleAuthor: `http://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'अद्यावधिक गरिएको समय',
    atiAnalyticsAppName: 'news-nepali',
    atiAnalyticsProducerId: '63',
    chartbeatDomain: 'nepali.bbc.co.uk',
    brandName: 'BBC News नेपाली',
    product: 'BBC News',
    serviceLocalizedName: 'नेपाली',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/nepali.png',
    defaultImageAltText: 'BBC News नेपाली',
    dir: `ltr`,
    externalLinkText: ', बाह्य सामग्री',
    imageCaptionOffscreenText: 'तस्बिरको क्याप्शन, ',
    videoCaptionOffscreenText: 'भिडिओ क्याप्शन सुरु हुँदैछ, ',
    audioCaptionOffscreenText: 'अडिओ क्याप्शन सुरु हुँदैछ, ',
    defaultCaptionOffscreenText: 'क्याप्शन, ',
    imageCopyrightOffscreenText: 'तस्बिर स्रोत, ',
    locale: `ne-NP`,
    datetimeLocale: `ne`,
    service: 'nepali',
    serviceName: 'Nepali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnepali',
    twitterSite: '@bbcnepali',
    noBylinesPolicy:
      'https://www.bbc.com/nepali/institutional-50318130#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/nepali/institutional-50318130',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'मुख पृष्ठ',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'सबै हेर्नुहोस्',
      home: 'होमपेज',
      currentPage: 'अहिलेको पृष्ठ',
      skipLinkText: 'सामग्रीमा जानुहोस्',
      relatedContent: 'सम्बन्धित सामग्री',
      navMenuText: 'सूची',
      mediaAssetPage: {
        mediaPlayer: 'मिडिया प्लेअर',
        audioPlayer: 'अडिओ प्लेअर',
        videoPlayer: 'भिडिओ प्लेअर',
      },
      error: {
        404: {
          statusCode: '४०४',
          title: 'सामग्री फेला परेन।',
          message:
            'माफ गर्नुहोस्। तपाईँले खोज्नुभएको सामग्री हामीले देखाउन सकेनौँ। निम्न उपायहरू गर्नुहोस्:',
          solutions: [
            'URL सही छ कि छैन जाँच्नुहोस्',
            'Refresh थिच्नुहोस्',
            'बीबीसी सर्चमा खोज्नुहोस्',
          ],
          callToActionFirst: 'अथवा ',
          callToActionLinkText: 'BBC News नेपाली',
          callToActionLast: 'को होमपेजमा जानुहोस्।',
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
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'कुकीजसम्बन्धी नीति मान्य छ भन्ने हामीलाई जानकारी दिनुहोस्।',
          description: {
            uk: {
              first: 'हामी तपाईँको अनलाइन अनुभव अझ उपयोगी होओस् भनेर ',
              linkText: 'कुकीज',
              last:
                ' प्रयोग गर्छौँ। कृपया तपाईँलाई कुकीज मान्य छ भने हामीलाई जानकारी दिनुहोस्।',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                'हामी र हाम्रा साझेदारहरू तपाईँको अनलाइन अनुभव अझ उपयोगी होओस्, तपाईँलाई प्रासंगिक सामग्री र विज्ञापन देखाउन ',
              linkText: 'कुकीज',
              last:
                'जस्ता प्रविधि प्रयोग गरेर तपाईँले हाम्रो साइटमा गरेका क्रियाकलापका जानकारी सङ्ग्रह गर्छौँ। कृपया तपाईँलाई यो कुरा मान्य छ भने हामीलाई जानकारी दिनुहोस्।',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'मलाई मान्य छ।',
          reject: 'मलाई मान्य छैन, सेटिङ्समा जान चाहन्छु।',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'तपाईंको उपकरणमा मिडिया प्लेब्याक सपोर्ट छैन',
        contentExpired: 'यो सामग्री उपलब्ध छैन',
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
        liveLabel: 'प्रत्यक्ष प्रसारण',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'भिडिओ क्याप्शन सुरु हुँदैछ, ',
          text: 'चेतावनी: तीसरे पक्ष की सामग्री में विज्ञापन हो सकते हैं.',
        },
        fallback: {
          text: 'सामग्री उपलब्ध नहीं है',
          linkText: '%provider_name% पर और देखिए',
          linkTextSuffixVisuallyHidden: ', बाह्य सामग्री',
          warningText:
            'बीबीसी। अन्य वेबसाइटका सामग्रीहरूका लागि बीबीसी जिम्मेवार छैन।',
        },
        skipLink: {
          text: 'छोड़िए %provider_name% पोस्ट',
          endTextVisuallyHidden: 'पोस्ट %provider_name% समाप्त',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'धेरै पढिएको',
      lastUpdated: 'अन्तिम चोटि अद्यावधिक गरिएको मिति:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/nepali/institutional-50318130',
        text: 'बीबीसीको विश्वसनीयता',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'बाह्य वेबसाइटको लिङ्क प्रयोग सम्बन्धमा हाम्रो नीति पढ्नुहोस्।',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'प्रयोगका सर्तहरू',
        },
        {
          href: 'https://www.bbc.com/nepali/institutional-38157766',
          text: 'बीबीसीको बारेमा',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'गोपनीयता नीति',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'कुकीज',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'बीबीसीलाई सम्पर्क गर्नुहोस्',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        '२०१९ बीबीसी। अन्य वेबसाइटका सामग्रीहरूका लागि बीबीसी जिम्मेवार छैन।',
    },
    fonts: [],
    timezone: 'Asia/Kathmandu',
    navigation: [
      {
        title: 'मुख पृष्ठ',
        url: '/nepali',
      },
      {
        title: 'कोरोनाभाइरस',
        url: '/nepali/news-51941128',
      },
      {
        title: 'पछिल्लो कार्यक्रम',
        url: '/nepali/multimedia/radio_programmes',
      },
      {
        title: 'भिडियो',
        url: '/nepali/media/video',
      },
    ],
  },
};

export default withContext(service);
