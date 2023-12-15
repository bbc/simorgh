import noAscendersOrDescenders from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/Asia/Seoul';
import withContext from '../../../../contexts/utils/withContext';
import 'moment/locale/ko';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ko`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: '',
    articleTimestampSuffix: '에 업데이트 됨',
    atiAnalyticsAppName: 'news-korean',
    atiAnalyticsProducerId: '57',
    chartbeatDomain: 'korean.bbc.co.uk',
    brandName: 'BBC News 코리아',
    product: 'BBC News',
    serviceLocalizedName: '코리아',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
    defaultImageAltText: 'BBC News 코리아',
    dir: `ltr`,
    externalLinkText: ', 외부 사이트',
    imageCaptionOffscreenText: '사진 설명, ',
    videoCaptionOffscreenText: '동영상 설명, ',
    audioCaptionOffscreenText: '오디오 설명, ',
    defaultCaptionOffscreenText: '설명, ',
    imageCopyrightOffscreenText: '사진 출처, ',
    locale: `ko-KO`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ko',
    datetimeLocale: `ko`,
    service: 'korean',
    serviceName: 'Korean',
    languageName: 'Korean',
    twitterCreator: '@bbcnews',
    twitterSite: '@bbcnews',
    noBylinesPolicy:
      'https://www.bbc.com/korean/institutional-49283197#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/korean/institutional-49283197',
    isTrustProjectParticipant: true,
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: '홈페이지',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'TOP 뉴스',
      lastUpdated: '마지막 업데이트일',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: '인기 콘텐츠',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'BBC 코리아 라디오',
      durationLabel: '방송 길이 %duration%',
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
        href: 'https://www.bbc.com/korean/institutional-49283197',
        text: 'BBC News를 신뢰할 수 있는 이유',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: '외부 링크에 대한 본사 정책 보기',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: '이용 약관',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'BBC 소개',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: '개인정보취급방침',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: '쿠키정책',
        },
        {
          href: 'https://www.bbc.co.uk/korean/send/u50853423',
          text: '고객센터',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC는 외부 사이트 및 타사 콘텐츠에 대한 책임을 지지 않습니다',
    },
    navigation: [
      {
        title: '뉴스',
        url: '/korean',
      },
      {
        title: '비디오',
        url: '/korean/topics/cnwng7v0e54t',
      },
      {
        title: '라디오',
        url: '/korean/bbc_korean_radio/programmes/w13xttll',
      },
      {
        title: '다운로드',
        url: '/korean/downloads',
      },
      {
        title: 'TOP 뉴스',
        url: '/korean/popular/read',
      },
    ],
    timezone: 'Asia/Seoul',
  },
};

export default withContext(service);
