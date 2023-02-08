import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Africa/Mogadishu';
import '#psammead/psammead-locales/moment/so';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `so`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Waa la cusbooneysiiyay',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-somali',
    atiAnalyticsProducerId: '83',
    chartbeatDomain: 'somali.bbc.co.uk',
    brandName: 'BBC News Somali',
    product: 'BBC News',
    serviceLocalizedName: 'Somali',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/somali.png',
    defaultImageAltText: 'BBC News Somali',
    dir: `ltr`,
    externalLinkText: ', kale',
    imageCaptionOffscreenText: 'Qoraalka sawirka, ',
    videoCaptionOffscreenText: 'Qoraalka Muuqaalka, ',
    audioCaptionOffscreenText: 'Qoraalka Codka, ',
    defaultCaptionOffscreenText: 'Qoraal, ',
    imageCopyrightOffscreenText: 'Xigashada Sawirka, ',
    locale: `so-SO`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'so',
    datetimeLocale: `so`,
    service: 'somali',
    serviceName: 'Somali',
    languageName: 'Somali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcsomali',
    twitterSite: '@bbcsomali',
    noBylinesPolicy:
      'https://www.bbc.com/somali/hayadeed-49283375#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/somali/hayadeed-49283375',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Somali',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    mostRead: {
      header: 'Ugu akhris badan',
      lastUpdated: 'Markii ugu dambeysay ee la cusbooneysiiyay:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Ugu daawasho badan',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Barnaamijyada Idaacadda',
      durationLabel: 'Muddada %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/somali/hayadeed-49283375',
        text: 'Sababta aad ku aamini kartid BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Akhri xogta ku saabsan sida aan u abaarno bogagga dibadda.',
      },
      links: [
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098011',
          text: 'Shuruucda isticmaalka',
        },
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098081',
          text: 'Ku saabsan BBC',
        },
        {
          href: 'https://www.bbc.com/somali/hayadeed-37098082',
          text: 'Shuruucda xogta gaarka ah',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/somali/send/u50853709',
          text: 'La xiriir BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC masuul kama ahan macluumadka bogagga kale ee dibadda.',
    },
    timezone: 'Africa/Mogadishu',
    navigation: [
      {
        title: 'War',
        url: '/somali',
      },
      {
        title: 'Ganacsi',
        url: '/somali/topics/c2dwqd32v4yt',
      },
      {
        title: 'Cayaaraha',
        url: '/somali/topics/cpzd4zj1pn2t',
      },
      {
        title: 'Muuqaal',
        url: '/somali/media/video',
      },
      {
        title: 'Barnaamijyada Idaacadda',
        url: '/somali/media-54071665',
      },
      {
        title: 'Barnaamijka Baafinta',
        url: '/somali/war-48705502',
      },
    ],
  },
};

export default withContext(service);
