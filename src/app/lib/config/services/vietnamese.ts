import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
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
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcvietnamese',
    twitterSite: '@bbcvietnamese',
    noBylinesPolicy:
      'https://www.bbc.com/vietnamese/institutional-49283563#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/vietnamese/institutional-49283563',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Tin chính',
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
      header: 'Đọc nhiều nhất',
      lastUpdated: 'Cập nhật gần nhất:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Nghe/Xem nhiều nhất',
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
        href: 'https://www.bbc.com/vietnamese/institutional-49283563',
        text: 'Tại sao bạn có thể tin tưởng BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
          text: 'Cookie',
        },
        {
          href: 'https://www.bbc.co.uk/vietnamese/send/u50853951',
          text: 'Liên hệ BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
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
        title: 'Diễn đàn',
        url: '/vietnamese/forum-54540875',
      },
      {
        title: 'Kinh tế',
        url: '/vietnamese/topics/cez1ey7nzj3t',
      },
      {
        title: 'Nhịp sống mới',
        url: '/vietnamese/magazine-54029179',
      },
      {
        title: 'Thể thao',
        url: '/vietnamese/topics/ckdxnx1k7zxt',
      },
      {
        title: 'Video',
        url: '/vietnamese/media/video',
      },
    ],
  },
};

export default withContext(service);
