import devanagari from '../../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kathmandu';
import '#psammead/psammead-locales/moment/ne';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ne`,
    articleAuthor: `http://www.facebook.com/bbcnews`,
    articleTimestampPrefix: '',
    articleTimestampSuffix: 'अद्यावधिक',
    atiAnalyticsAppName: 'news-nepali',
    atiAnalyticsProducerId: '63',
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
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'मुख पृष्ठ',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'धेरै पढिएको',
      lastUpdated: 'मा अन्तिम चोटि अद्यावधिक',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'धेरै हेरिएको',
      numberOfItems: 10,
      hasMostWatched: true,
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
        title: 'मुख पृष्ठ',
        url: '/nepali',
      },
      {
        title: 'पछिल्लो कार्यक्रम',
        url: '/nepali/bbc_nepali_radio/programmes/p0340xzv',
      },
      {
        title: 'भिडिओ',
        url: '/nepali/topics/cw9kv027nwnt',
      },
    ],
  },
};

export default withContext(service);
