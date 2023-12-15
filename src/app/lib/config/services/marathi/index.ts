import devanagari from '../../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import '#psammead/psammead-locales/moment/mr';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `mr`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'अपडेटेड',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-marathi',
    atiAnalyticsProducerId: '59',
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
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'बातम्या',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'पॉडकास्ट',
      brandTitle: 'तीन गोष्टी',
      brandDescription: 'दिवसभरातल्या कोरोना आणि इतर घडामोडींचा आढावा',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0940n6j.jpg',
        alt: 'तीन गोष्टी',
      },
      linkLabel: {
        text: 'भाग',
        href: 'https://www.bbc.com/marathi/podcasts/p09431p4',
      },
    },
    translations,
    mostRead: {
      header: 'सर्वाधिक वाचलेले',
      lastUpdated: 'शेवटचा अपडेट:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'सर्वाधिक पाहिलेले',
      numberOfItems: 10,
      hasMostWatched: true,
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
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. बीबीसी बाह्य इंटरनेट साइट्सच्या सामग्रीसाठी बीबीसी जबाबदार नाही. बाह्य लिंक्सबद्दल आम्हाल काय वाटतं? इथे वाचा.',
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
        title: 'लोकप्रिय',
        url: '/marathi/popular/read',
      },
    ],
  },
};

export default withContext(service);
