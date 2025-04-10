import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Asia/Ho_Chi_Minh';
import 'moment/locale/vi';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `vi`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Cập nhật',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-vietnamese',
    atiAnalyticsProducerId: '97',
    atiAnalyticsProducerName: 'VIETNAMESE',
    useReverb: true,
    chartbeatDomain: 'vietnamese.bbc.co.uk',
    brandName: 'BBC News Tiếng Việt',
    product: 'BBC News',
    serviceLocalizedName: 'Tiếng Việt',
    defaultImage:
      'https://news.files.bbci.co.uk/ws/img/logos/og/vietnamese.png',
    defaultImageAltText: 'BBC News Tiếng Việt',
    dir: `ltr`,
    externalLinkText: ', bên ngoài',
    imageCaptionOffscreenText: 'Chụp lại hình ảnh, ',
    videoCaptionOffscreenText: 'Chụp lại video, ',
    audioCaptionOffscreenText: 'Lưu lại audio, ',
    defaultCaptionOffscreenText: 'Chụp lại, ',
    imageCopyrightOffscreenText: 'Nguồn hình ảnh, ',
    locale: `vi-VN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'vi',
    datetimeLocale: `vi`,
    service: 'vietnamese',
    serviceName: 'Tiếng Việt',
    languageName: 'Vietnamese',
    twitterCreator: '@bbcvietnamese',
    twitterSite: '@bbcvietnamese',
    noBylinesPolicy:
      'https://www.bbc.com/vietnamese/institutional-49283563#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/vietnamese/institutional-49283563',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/vietnamese/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Tin chính',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'Quay Lại',
        nextPage: 'Xem Tiếp',
        pageXOfY: 'Page {x} của {y}',
      },
      ads: {
        advertisementLabel: 'Quảng cáo',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: 'Xem tất cả',
      home: 'Tin chính',
      currentPage: 'Trang hiện nay',
      skipLinkText: 'Bỏ qua để xem nội dung',
      relatedContent: 'Tin liên quan',
      relatedTopics: 'Chủ đề liên quan',
      navMenuText: 'Mục',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Trực tiếp',
        liveCoverage: 'Trực tiếp',
        breaking: 'Tin mới nhất',
        postedAt: 'Đăng ở',
        summary: 'Tóm tắt',
        shareButtonText: 'Chia sẻ',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Tóm tắt',
      error: {
        404: {
          statusCode: '404',
          title: 'Không tìm thấy trang',
          message:
            'Chúng tôi không thể đưa bạn tới trang bạn tìm. Xin hãy thử:',
          solutions: [
            'Kiểm tra lại url',
            'Bấm nút refresh trong trình duyệt',
            'Tìm trang này qua thanh tìm kiếm của BBC',
          ],
          callToActionFirst: 'Vui lòng thăm ',
          callToActionLinkText: 'BBC News Tiếng Việt',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/vietnamese',
        },
        500: {
          statusCode: '500',
          title: 'Lỗi mạng nội bộ',
          message:
            'Xin lỗi, chúng tôi không thể đưa bạn tới trang bạn đang tìm. Vui lòng thử:',
          solutions: ['Bấm nút refresh trong trình duyệt', 'Quay lại sau'],
          callToActionFirst: 'Vui lòng thăm ',
          callToActionLinkText: 'BBC News Tiếng Việt',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/vietnamese',
        },
      },
      byline: {
        articleInformation: '',
        author: 'Tác giả',
        listItemImage: 'Danh sách mục, hình ảnh',
        published: 'Được đăng',
        reportingFrom: '',
        role: 'Vai trò',
      },
      consentBanner: {
        privacy: {
          title: 'Chúng tôi đã cập nhật Chính sách về Riêng tư và Cookie',
          description: {
            uk: {
              first:
                'Chúng tôi có một số thay đổi quan trọng về Chính sách Riêng tư và Cookie, và muống bạn biết ý nghĩa của nó đối với bạn và dữ liệu của bạn.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Chúng tôi có một số thay đổi quan trọng về Chính sách Riêng tư và Cookie, và muống bạn biết ý nghĩa của nó đối với bạn và dữ liệu của bạn.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Tìm hiểu các thay đổi',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Chấp nhận thu thập dữ liệu và tiếp tục',
            reject: 'Từ chối thu thập dữ liệu và tiếp tục',
            initial: {
              title:
                'Hãy cho chúng tôi biết bạn đồng ý với việc thu thập dữ liệu trên AMP',
              description: {
                first: 'Chúng tôi và các đối tác dùng công nghệ, như ',
                linkText: 'cookie',
                last: ', và thu thập dữ liệu browsing để cho bạn trải nghiệm online tốt nhất và cá nhân hóa nội dung và quảng cáo cho bạn. Xin cho chúng tôi biết bạn có đồng ý không.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Quản lý cài đặt của tôi',
            },
            manage: {
              title: 'Quản lý cài đặt sự đồng ý trên các trang AMP',
              description: {
                para1:
                  'Các cài đặt này chỉ áp dụng cho các trang AMP. Bạn có thể được yêu cầu đặt lại các tùy chọn này khi truy cập các trang BBC không phải AMP.',
                para2:
                  'Trang dành cho thiết bị di động nhẹ mà bạn đã truy cập đã được xây dựng bằng công nghệ AMP của Google.',
                heading2: 'Thu thập dữ liệu cần thiết nghiêm ngặt',
                para3:
                  'Để làm cho các trang web của chúng tôi hoạt động, chúng tôi lưu trữ một số thông tin hạn chế trên thiết bị của bạn mà không có sự đồng ý của bạn.',
                para4: {
                  text: 'Đọc thêm về thông tin cần thiết mà chúng tôi lưu trữ trên thiết bị của bạn để làm cho các trang web của chúng tôi hoạt động.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Chúng tôi sử dụng bộ nhớ cục bộ để lưu trữ các tùy chọn đồng ý của bạn trên thiết bị của bạn.',
                heading3: 'Thu thập dữ liệu tùy chọn',
                para6:
                  'Khi bạn đồng ý thu thập dữ liệu trên các trang AMP, bạn đồng ý cho phép chúng tôi hiển thị quảng cáo được cá nhân hóa có liên quan đến bạn khi bạn ở bên ngoài Vương quốc Anh.',
                para7: {
                  text: 'Đọc thêm về cách chúng tôi cá nhân hóa quảng cáo trên BBC và các đối tác quảng cáo của chúng tôi.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Bạn có thể chọn không nhận quảng cáo được cá nhân hóa bằng cách nhấp vào Từ chối thu thập dữ liệu và tiếp tục "bên dưới. Xin lưu ý rằng bạn sẽ vẫn thấy quảng cáo, nhưng nó sẽ không được cá nhân hóa cho bạn.',
                para9:
                  'Bạn có thể thay đổi các cài đặt này bằng cách nhấp vào “Lựa chọn quảng cáo / Không bán thông tin của tôi” ở chân trang bất kỳ lúc nào.',
              },
            },
          },
          canonical: {
            title: 'Cho chúng tôi biết bạn đồng ý về cookie',
            description: {
              uk: {
                first: 'Chúng tôi dùng ',
                linkText: 'cookie',
                last: ' để cho bạn trải nghiệm online tốt nhất. Cho chúng tôi biết bạn đồng ý về mọi cookie này.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Chúng tôi dùng ',
                linkText: 'cookie',
                last: ' để cho bạn trải nghiệm online tốt nhất. Cho chúng tôi biết bạn đồng ý về mọi cookie này.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Vâng, tôi đồng ý',
            reject: 'Không, đưa tôi xem phần Settings',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Máy của bạn không hỗ trợ nghe xem',
        contentExpired: 'Chương trình không còn nữa.',
        contentNotYetAvailable: 'Chương trình này chưa sẵn sàng.',
        audio: 'Audio',
        photogallery: 'Gallery hình ảnh',
        video: 'Video',
        listen: 'Nghe',
        watch: 'Xem',
        listenLive: 'Nghe trực tiếp',
        liveLabel: 'TRỰC TIẾP',
        nextLabel: 'TỚI',
        previousRadioShow: 'Show radio trước',
        nextRadioShow: 'Show radio sau',
        duration: 'Thời lượng',
        recentEpisodes: 'Xem thêm',
        closeVideo: 'Thoát',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Chụp lại video, ',
          text: 'Cảnh báo: Nội dung bên thứ ba có thể có quảng cáo',
          articleText:
            'Cảnh báo: BBC không chịu trách nhiệm về nội dung các trang bên ngoài.',
          articleAdditionalText:
            'Nội dung trên %provider_name% có thể kèm quảng cáo.',
        },
        fallback: {
          text: 'Nội dung không có',
          linkText: 'Xem thêm ở %provider_name%',
          linkTextSuffixVisuallyHidden: ', bên ngoài',
          warningText: 'BBC không chịu trách nhiệm nội dung các trang ngoài.',
        },
        skipLink: {
          text: 'Bỏ qua %provider_name% tin',
          endTextVisuallyHidden: 'Cuối %provider_name% tin',
        },
        consentBanner: {
          heading: `Cho phép hiện nội dung từ [social_media_site]?`,
          body: `[social_media_site]. Chúng tôi cần sự đồng ý của quý vị trước khi bất kỳ nội dung nào được tải xuống, bởi việc này có thể đi kèm việc sử dụng cookies và các công nghệ khác. Quý vị có thể đọc chính sách cookie [link] của [social_media_site] [/link] trước khi đồng ý. Để xem nội dung này, hãy chọn 'chấp nhận và tiếp tục'.`,
          button: 'Đồng ý và tiếp tục',
        },
      },
      include: {
        errorMessage: 'Xin lỗi, không thể hiện thị phần này ở trang mobile.',
        linkText: 'Xin xem bản đầy đủ.',
      },
      topStoriesTitle: 'Tin chính',
      featuresAnalysisTitle: 'BBC giới thiệu',
      latestMediaTitle: 'Mới nhất',
    },
    mostRead: {
      header: 'Đọc nhiều nhất',
      lastUpdated: 'Cập nhật gần nhất:',
      numberOfItems: 10,
      hasMostRead: true,
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
        href: 'https://www.bbc.com/vietnamese/institutional-49283563',
        text: 'Tại sao bạn có thể tin tưởng BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Tìm hiểu cách chúng tôi tiếp cận việc dẫn tới trang ngoài',
      },
      links: [
        {
          href: 'https://www.bbc.com/vietnamese/institutional-37622991',
          text: 'Điều khoản sử dụng',
        },
        {
          href: 'https://www.bbc.com/vietnamese/institutional-37623840',
          text: 'Về BBC',
        },
        {
          href: 'https://www.bbc.com/vietnamese/institutional-37623841',
          text: 'Chính sách riêng tư',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookie',
        },
        {
          href: 'https://www.bbc.co.uk/vietnamese/send/u50853951',
          text: 'Liên hệ BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News các ngôn ngữ khác',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC không chịu trách nhiệm nội dung các trang ngoài.',
    },
    timezone: 'Asia/Ho_Chi_Minh',
    navigation: [
      {
        title: 'Tin chính',
        url: '/vietnamese',
      },
      {
        title: 'Việt Nam',
        url: '/vietnamese/topics/ckdxnx1x5rnt',
      },
      {
        title: 'Thế giới',
        url: '/vietnamese/topics/cnlv9j1ekq0t',
      },
      {
        title: 'Kinh tế',
        url: '/vietnamese/topics/cez1ey7nzj3t',
      },
      {
        title: 'Thể thao',
        url: '/vietnamese/topics/ckdxnx1k7zxt',
      },
      {
        title: 'Video',
        url: '/vietnamese/topics/cl29j0ekkvdt',
      },
    ],
  },
};

export default withContext(service);
