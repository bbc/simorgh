import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { korean as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Seoul';

const service = {
  lang: `ko`,
  articleAuthor: `https://www.facebook.com/bbcnewskorean`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-korean',
  atiAnalyticsProducerId: '57',
  brandName: 'BBC News 코리아',
  product: 'BBC News 코리아',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
  defaultImageAltText: 'BBC News 코리아',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `ko-KO`,
  datetimeLocale: `ko-KO`.toLowerCase(),
  service: 'korean',
  serviceName: 'News 코리아',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcworld',
  twitterSite: '@bbcworld',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  translations: {
    home: '뉴스',
    currentPage: 'Current page',
    skipLinkText: '내용으로 건너뛰기',
    error: {
      404: {
        statusCode: '404',
        title: '404 - 페이지를 찾을 수 없습니다',
        message:
          '웹사이트 주소를 잘못 입력하셨을 수 있습니다. 주소와 철자를 확인해 주십시오.',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC 뉴스 홈 페이지',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/korean',
      },
      500: {
        statusCode: '500',
        title: '500 - 오류',
        message: '오류가 발생했습니다. 페이지를 새로 고쳐 주십시오.',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC 뉴스 홈 페이지',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/korean',
      },
    },
    consentBanner: {
      privacy: {
        title: '개인정보와 쿠키 처리방침을 변경했습니다',
        description: {
          uk: {
            first:
              "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              '변경된 개인정보와 쿠키 처리방침이 이용자에게 어떤 영향을 미칠지 알려드립니다',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: '알겠습니다',
        reject: '변경사항을 확인하세요',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: '쿠키생성에 동의하시나요',
        description: {
          uk: {
            first: 'We use ',
            linkText: 'cookies',
            last:
              ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'BBC와 파트너사는 ',
            linkText: '쿠키',
            last:
              '웹브라우징 데이터 수집 같은 기술을 통해 이용자에게 최적의 온라인 경험을 제공하고 개인에 맞춤화된 콘텐츠와 광고를 노출하고자 합니다. 이에 동의하는지 알려주세요',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: '네, 동의합니다',
        reject: '아니요, 재 세팅 하겠습니다',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: '오디오',
      photogallery: '이미지 갤러리',
      video: '비디오',
    },
  },
  brandSVG,
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: '외부 콘텐츠 링크에 대한 본사 정책 보기.',
    },
    links: [
      {
        href: 'https://www.bbc.com/korean/institutional-49283197',
        text: 'BBC News를 신뢰할 수 있는 이유',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/terms/',
        text: '이용 약관',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
        text: '개인정보취급방침',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
        text: '쿠키정책',
      },
      {
        href: 'https://www.bbc.com/korean/institutional-42224941',
        text: '고객센터',
      },
    ],
    copyrightText:
      'Copyright © 2019 BBC. BBC는 외부 인터넷 사이트 및 콘텐츠에 대한 책임을 지지않습니다.',
  },
  fonts: [],
  navigation: [
    {
      title: '뉴스',
      url: '/korean',
    },
    {
      title: '비디오',
      url: '/korean/media/video',
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
};

export default service;
