import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { vietnamese as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Ho_Chi_Minh';

const service = {
  default: {
    lang: `vi`,
    articleAuthor: `https://www.facebook.com/pages/BBC-Vietnamese/228458913833525?ref=ts&sk=wall`,
    articleTimestampPrefix: 'Cập nhật',
    atiAnalyticsAppName: 'news-vietnamese',
    atiAnalyticsProducerId: '97',
    brandName: 'BBC News Tiếng Việt',
    product: 'BBC News Tiếng Việt',
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
    datetimeLocale: `vi-vn`,
    service: 'vietnamese',
    serviceName: 'BBC News Tiếng Việt',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcvietnamese',
    twitterSite: '@bbcvietnamese',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Tin chính',
    translations: {
      seeAll: 'Xem tất cả',
      home: 'Tin chính',
      currentPage: 'Trang hiện nay',
      skipLinkText: 'Bỏ qua để xem nội dung',
      relatedContent: 'Tin liên quan',
      error: {
        404: {
          statusCode: '404',
          title: '404 - Không tìm thấy trang này',
          message:
            'Lỗi có thể do địa chỉ trang web không đúng. Hãy kiểm tra địa chỉ và chính tả.',
          solutions: [
            'Kiểm tra lại url',
            'Bấm nút refresh trong trình duyệt',
            'Tìm trang này qua thanh tìm kiếm của BBC',
          ],
          callToActionFirst: 'Vui lòng thăm ',
          callToActionLinkText: 'Trang tin chính BBC',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/vietnamese',
        },
        500: {
          statusCode: '500',
          title: 'Lỗi 500',
          message: 'Vừa bị lỗi. Hãy tải lại.',
          solutions: ['Bấm nút refresh trong trình duyệt', 'Quay lại sau'],
          callToActionFirst: 'Vui lòng thăm ',
          callToActionLinkText: 'Trang tin chính BBC',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/vietnamese',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
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
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know you agree to cookies',
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
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last:
                ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, take me to settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'Âm thanh',
        photogallery: 'Ảnh',
        video: 'Video',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Đọc nhiều nhất',
      lastUpdated: 'Cập nhật gần nhất: ',
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Tìm hiểu cách chúng tôi tiếp cận việc dẫn tới trang ngoài',
      },
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Tại sao bạn có thể tin tưởng BBC News',
        },
        {
          href: 'https://www.bbc.com/terms',
          text: 'Điều khoản sử dụng',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Chính sách riêng tư',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookie',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Liên hệ BBC',
        },
      ],
      copyrightText:
        '© 2019 BBC. BBC không chịu trách nhiệm nội dung các trang ngoài.',
    },
    fonts: [],
    timezone: 'Asia/Ho_Chi_Minh',
    navigation: [
      {
        title: 'Tin chính',
        url: '/vietnamese',
      },
      {
        title: 'Việt Nam',
        url: '/vietnamese/vietnam',
      },
      {
        title: 'Thế giới',
        url: '/vietnamese/world',
      },
      {
        title: 'Diễn đàn',
        url: '/vietnamese/forum',
      },
      {
        title: 'Kinh tế',
        url: '/vietnamese/business',
      },
      {
        title: 'Nhịp sống mới',
        url: '/vietnamese/magazine',
      },
      {
        title: 'Thể thao',
        url: '/vietnamese/sport',
      },
      {
        title: 'Học tiếng Anh',
        url: '/vietnamese/english',
      },
      {
        title: 'Hình ảnh',
        url: '/vietnamese/media/photogalleries',
      },
      {
        title: 'Audio',
        url: '/vietnamese/media/audio',
      },
      {
        title: 'Video',
        url: '/vietnamese/media/video',
      },
    ],
  },
};

export default service;
