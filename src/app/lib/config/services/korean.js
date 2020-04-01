import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { korean as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Seoul';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/ko';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `ko`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: '최종 송고일',
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
    imageCaptionOffscreenText: '사진 설명 ',
    videoCaptionOffscreenText: '동영상 설명 ',
    audioCaptionOffscreenText: '오디오 설명 ',
    defaultCaptionOffscreenText: '설명 ',
    imageCopyrightOffscreenText: '사진 출처 ',
    locale: `ko-KO`,
    datetimeLocale: `ko`,
    service: 'korean',
    serviceName: 'Korean',
    themeColor: `${C_POSTBOX}`,
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
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: '모든 기사 보기',
      home: '뉴스',
      currentPage: '현재 페이지',
      skipLinkText: '내용으로 건너뛰기',
      relatedContent: '관련 기사 더 보기',
      navMenuText: '섹션',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '페이지를 찾을 수 없습니다',
          message:
            '죄송합니다. 찾으시는 페이지를 가져올 수 없습니다. 이 중 하나를 해보세요:',
          solutions: [
            'URL 주소 재확인',
            '웹브라우저의 새로 고침 버튼 누르기',
            'BBC 검색 기능을 이용해 해당 페이지 찾아보기',
          ],
          callToActionFirst: '',
          callToActionLinkText: 'BBC News 코리아',
          callToActionLast: ' 홈페이지를 방문해보세요',
          callToActionLinkUrl: 'https://www.bbc.com/korean',
        },
        500: {
          statusCode: '500',
          title: '내부 서버 에러',
          message:
            '죄송합니다. 찾으시는 페이지를 가져올 수 없습니다. 이 중 하나를 해보세요:',
          solutions: ['웹브라우저의 새로 고침 버튼 누르기', '다시 시도해 보기'],
          callToActionFirst: '',
          callToActionLinkText: 'BBC News 코리아',
          callToActionLast: ' 홈페이지를 방문해보세요',
          callToActionLinkUrl: 'https://www.bbc.com/korean',
        },
      },
      consentBanner: {
        privacy: {
          title: '개인정보와 쿠키 처리방침을 변경했습니다',
          description: {
            uk: {
              first:
                '변경된 개인정보와 쿠키 처리방침이 이용자에게 어떤 영향을 미칠지 알려드립니다',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                '변경된 개인정보와 쿠키 처리방침이 이용자에게 어떤 영향을 미칠지 알려드립니다.',
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
              first: 'BBC는 이용자의 최적의 온라인 경험을 위해 ',
              linkText: '쿠키',
              last: ' 정보를 수집합니다. 쿠키생성에 동의하시는지 알려주세요',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'BBC와 파트너사는 ',
              linkText: '쿠키',
              last:
                ' 웹브라우징 데이터 수집 같은 기술을 통해 이용자에게 최적의 온라인 경험을 제공하고 개인에 맞춤화된 콘텐츠와 광고를 노출하고자 합니다. 이에 동의하는지 알려주세요.',
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
        noJs: '사용 기기에서 미디어 재생이 지원되지 않습니다',
        contentExpired: '더 이상 이용할 수 없는 콘텐츠입니다.',
        audio: '오디오',
        photogallery: '사진 갤러리',
        video: '비디오',
        listen: '청취',
        watch: '감상하기',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'TOP 뉴스',
      lastUpdated: '최종 송고일',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'BBC 코리아 라디오',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/korean/institutional-49283197',
        text: 'BBC News를 신뢰할 수 있는 이유',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: '외부 콘텐츠 링크에 대한 본사 정책 보기.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: '이용 약관',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'BBC 소개',
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
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC는 외부 인터넷 사이트 및 콘텐츠에 대한 책임을 지지않습니다.',
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
  },
};

export default withContext(service);
