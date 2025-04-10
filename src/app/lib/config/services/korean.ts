import noAscendersOrDescenders from '../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/Asia/Seoul';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/ko';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ko`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: '',
    articleTimestampSuffix: '에 업데이트 됨',
    atiAnalyticsAppName: 'news-korean',
    atiAnalyticsProducerId: '57',
    atiAnalyticsProducerName: 'KOREAN',
    useReverb: true,
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
    manifestPath: '/korean/manifest.json',
    swPath: '/sw.js',
    homePageTitle: '홈페이지',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: '이전',
        nextPage: '다음',
        pageXOfY: 'Page {x} / {y}',
      },
      ads: {
        advertisementLabel: '광고',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: '모든 기사 보기',
      home: '홈',
      currentPage: '현재 페이지',
      skipLinkText: '내용 보기',
      relatedContent: '관련 기사 더 보기',
      relatedTopics: '관련 토픽',
      navMenuText: '섹션',
      mediaAssetPage: {
        mediaPlayer: '미디어 플레이어',
        audioPlayer: '오디오 플레이어',
        videoPlayer: '비디오 플레이어',
      },
      liveExperiencePage: {
        liveLabel: 'Live',
        liveCoverage: '생중계',
        breaking: '속보',
        postedAt: '작성',
        summary: '요약',
        shareButtonText: '공유',
      },
      downloads: {
        instructions: '오늘의 뉴스를 다운받아 보실 수 있습니다',
        title: '파일 다운로드',
      },
      gist: '요약',
      error: {
        404: {
          statusCode: '404',
          title: '페이지를 찾을 수 없습니다',
          message:
            '죄송합니다. 페이지를 찾지 못했습니다. 이 중 하나를 시도해보세요:',
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
            '죄송합니다. 페이지를 찾지 못했습니다. 이 중 하나를 시도해보세요:',
          solutions: [
            '웹브라우저의 새로 고침 버튼 누르기',
            '나중에 다시 시도하기',
          ],
          callToActionFirst: '',
          callToActionLinkText: 'BBC News 코리아',
          callToActionLast: ' 홈페이지를 방문해보세요',
          callToActionLinkUrl: 'https://www.bbc.com/korean',
        },
      },
      byline: {
        articleInformation: '기사 관련 정보',
        author: '기자',
        listItemImage: '기자 사진',
        published: '게재 시간',
        role: '기자',
      },
      consentBanner: {
        privacy: {
          title: '개인 정보와 쿠키 처리 방침이 업데이트되었습니다',
          description: {
            uk: {
              first:
                '개인 정보와 쿠키 처리 방침에서 주요 변경 사항과 이 변경 사항이 이용자와 이용자의 정보에 가질 영향에 대해 알려드리고자 합니다.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                '개인 정보와 쿠키 처리 방침에서 주요 변경 사항과 이 변경 사항이 이용자와 이용자의 정보에 가질 영향에 대해 알려드리고자 합니다.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: '네',
          reject: '변경사항을 확인하세요',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: '데이터 수집 동의하고 계속하기',
            reject: '데이터 수집 거부하고 계속하기',
            initial: {
              title: 'AMP 자료 수집 동의 여부를 알려주십시오',
              description: {
                first: 'BBC와 파트너사는 ',
                linkText: '쿠키',
                last: ', 웹브라우징 데이터 수집과 같은 기술을 통해 이용자에게 최적의 온라인 경험과 맞춤 콘텐츠, 광고를 제공하고 있습니다. 이에 동의하십니까?',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: '나의 설정 바꾸기',
            },
            manage: {
              title: 'AMP 페이지 관련 동의 설정 바꾸기',
              description: {
                para1:
                  '이러한 설정은 AMP 페이지에만 적용됩니다. 만약 비-AMP BBC 홈페이지를 방문하실 경우에는 페이지 설정을 다시 해야 할 수 있습니다.',
                para2:
                  '방문하신 경량 모바일 페이지는 구글 AMP 기술로 만들어졌습니다.',
                heading2: '필수적인 데이터 수집',
                para3:
                  '홈페이지를 가동하기 위해 사용자의 동의 없이 기기의 정보를 제한적으로 저장합니다.',
                para4: {
                  text: '홈페이지를 가동하기 위해 사용자 기기에서 저장하는 필수적인 정보에 대해 더 읽어보기',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  '사용자의 정보 수집 동의 여부는 로컬 스토리지에 저장됩니다.',
                heading3: '선택적인 정보 수집',
                para6:
                  'AMP 데이터 수집에 동의하시면, 영국 밖에서 맞춤형 광고 수신에 동의하는 것입니다.',
                para7: {
                  text: 'BBC와 파트너사의 맞춤형 광고 제공에 대해 더 자세히 알아보기',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  "맞춤형 광고를 보지 않기 위해선 '데이터 수집 거부하고 계속하기'를 클릭하시면 됩니다. 이 경우에 맞춤형 광고가 아닌 다른 광고는 제공될 수 있습니다.",
                para9:
                  "하단의 '광고 선택하기/내 정보 제공하지 않기'를 클릭해 언제든지 설정을 바꿀 수 있습니다.",
              },
            },
          },
          canonical: {
            title: '쿠키 수집에 동의하십니까?',
            description: {
              uk: {
                first: 'BBC는 이용자에게 최적의 온라인 경험을 제공하기 위해 ',
                linkText: '쿠키',
                last: ' 정보를 이용합니다. 쿠키 수집에 동의하십니까?',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'BBC는 이용자에게 최적의 온라인 경험을 제공하기 위해 ',
                linkText: '쿠키',
                last: ' 정보를 이용합니다. 쿠키 수집에 동의하십니까?',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: '네, 동의합니다',
            reject: '아니요, 설정 화면으로 이동합니다',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: '사용 기기에서 미디어 재생이 지원되지 않습니다',
        contentExpired: '더 이상 이용할 수 없는 콘텐츠입니다.',
        contentNotYetAvailable: '아직 재생할 수 없는 프로그램입니다.',
        audio: '오디오',
        photogallery: '사진 갤러리',
        video: '비디오',
        listen: '듣기',
        watch: '보기',
        listenNext: '다음에피소드듣기',
        liveLabel: 'LIVE',
        nextLabel: '다음',
        previousRadioShow: '이전 라디오 방송',
        nextRadioShow: '다음 라디오 방송',
        duration: '방송 길이',
        recentEpisodes: '이전',
        closeVideo: '나가기',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: '동영상 설명, ',
          text: '경고: 타사 콘텐츠에는 광고가 포함될 수 있습니다',
          articleText:
            '경고: BBC는 외부 사이트의 콘텐츠에 대한 책임을 지지 않습니다. ',
          articleAdditionalText: '%provider_name%는 광고를 포함할 수 있습니다.',
        },
        fallback: {
          text: '콘텐츠를 불러올 수 없습니다',
          linkText: '더보기 %provider_name%',
          linkTextSuffixVisuallyHidden: ', 외부 사이트',
          warningText:
            'BBC는 외부 사이트 및 타사 콘텐츠에 대한 책임을 지지 않습니다',
        },
        skipLink: {
          text: '%provider_name% 포스트 건너뛰기',
          endTextVisuallyHidden: '%provider_name% 포스트 마침',
        },
        consentBanner: {
          heading: `[social_media_site] 콘텐츠 보기를 허용하시겠습니까?`,
          body: `이 기사는 [social_media_site]에서 제공한 콘텐츠를 포함하고 있습니다. 해당 콘텐츠는 쿠키나 다른 기술을 사용할 수 있어 기사를 보기 전 허용 여부를 묻고 있습니다. 허용을 하기 전에 [social_media_site]의 [link]쿠키 정책[/link]과 [link]개인정보 보호 정책[/link]을 참고하시길 바랍니다. 기사를 계속해서 보시려면 ‘허용하고 계속 보기’ 버튼을 누르십시오. `,
          button: '허용하고 계속 보기',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: '주요 뉴스',
      featuresAnalysisTitle: '이 시간 이슈',
      latestMediaTitle: '최신 뉴스',
    },
    mostRead: {
      header: 'TOP 뉴스',
      lastUpdated: '마지막 업데이트일',
      numberOfItems: 10,
      hasMostRead: true,
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
          href: 'https://www.bbc.com/ws/languages',
          text: '다른 언어로 보기',
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
