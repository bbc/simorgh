import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/yo';
import '#psammead/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'yo',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Ìgbà tí a ṣe àfíkun gbẹ̀yìn',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-yoruba',
    atiAnalyticsProducerId: '107',
    chartbeatDomain: 'yoruba.bbc.co.uk',
    brandName: 'BBC News Yorùbá',
    product: 'BBC News',
    serviceLocalizedName: 'Yorùbá',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/yoruba.png',
    defaultImageAltText: 'BBC News Yorùbá',
    dir: 'ltr',
    externalLinkText: ', ìta',
    imageCaptionOffscreenText: 'Àkọlé àwòrán, ',
    videoCaptionOffscreenText: 'Àkọlé fídíò, ',
    audioCaptionOffscreenText: 'Àkọlé fọ́nrán ohùn, ',
    defaultCaptionOffscreenText: 'Àkọlé, ',
    imageCopyrightOffscreenText: 'Oríṣun àwòrán, ',
    locale: 'yo',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'yo',
    datetimeLocale: 'yo',
    service: 'yoruba',
    serviceName: 'Yoruba',
    languageName: 'Yoruba',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: false,
    showRelatedTopics: true,
    noBylinesPolicy:
      'https://www.bbc.com/yoruba/institutional-48528718#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/yoruba/institutional-48528718',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Àbáwọlé',
    mostRead: {
      header: 'Èyítí A Ń Kà Jùlọ',
      lastUpdated: 'Tí a mú dójú ìwọ̀n gbẹ̀yìn ní:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Èyí tí a wò jùlọ',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/yoruba/institutional-48528718',
        text: 'Ìdí tí ẹ fi le è nígbàagbọ́ nínú ìròyìn BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Ọwọ́ tí a fi mú ìbáṣepọ̀ ti ìta.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: 'Ìlànà Lílò',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'Nípa BBC',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'Òfin Àṣírí',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/yoruba/send/u50853973',
          text: 'Kàn sí BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC kò mọ̀ nípa àwọn ohun tí ó wà ní àwọn ojú òpó tí ó wà ní ìta.',
    },
    timezone: 'Africa/Lagos',
    navigation: [
      {
        title: 'Ìròyìn',
        url: '/yoruba',
      },
      {
        title: 'Eré ìdárayá',
        url: '/yoruba/topics/c340q0y3p5kt',
      },
      {
        title: 'Fídíò',
        url: '/yoruba/media/video',
      },
      {
        title: 'Èyí to gbajúmọ̀ jù',
        url: '/yoruba/popular/read',
      },
    ],
  },
};

export default withContext(service);
