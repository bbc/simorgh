import thai from '../../../components/ThemeProvider/fontScripts/thai';
import '#psammead/moment-timezone-include/tz/Asia/Bangkok';
import '#psammead/psammead-locales/moment/th';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `th`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: `th`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ปรับปรุงแล้ว',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-thai',
    atiAnalyticsProducerId: '90',
    atiAnalyticsProducerName: 'THAI',
    useReverb: true,
    chartbeatDomain: 'thai.bbc.co.uk',
    brandName: 'BBC News ไทย',
    product: 'BBC News',
    serviceLocalizedName: 'ไทย',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/thai.png',
    defaultImageAltText: 'BBC News ไทย',
    dir: `ltr`,
    externalLinkText: ', จากภายนอก',
    imageCaptionOffscreenText: 'คำบรรยายภาพ, ',
    videoCaptionOffscreenText: 'คำบรรยายวิดีโอ, ',
    audioCaptionOffscreenText: 'คำบรรยายเสียง, ',
    defaultCaptionOffscreenText: 'คำบรรยาย, ',
    imageCopyrightOffscreenText: 'ที่มาของภาพ, ',
    locale: `th-TH`,
    datetimeLocale: 'th',
    service: 'thai',
    serviceName: 'Thai',
    languageName: 'Thai',
    twitterCreator: '@bbc_thailand',
    twitterSite: '@bbc_thailand',
    noBylinesPolicy:
      'https://www.bbc.com/thai/institutional-49281839#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/thai/institutional-49281839',
    isTrustProjectParticipant: true,
    script: thai,
    manifestPath: '/thai/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'ข่าว ข่าววันนี้ ข่าวล่าสุด วีดีโอ',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'ก่อนหน้านี้',
        nextPage: 'ถัดไป',
        pageXOfY: 'Page {x} ของ {y}',
      },
      ads: {
        advertisementLabel: 'โฆษณา',
      },
      recommendationTitle: 'เรื่องแนะนำ',
      splitRecommendationTitle: 'เรื่่องแนะนำอื่น ๆ',
      seeAll: 'ดูทั้งหมด',
      home: 'หน้าแรก',
      currentPage: 'หน้าปัจจุบัน',
      skipLinkText: 'ข้ามไปยังเนื้อหา',
      relatedContent: 'อ่านเรื่องที่เกี่ยวข้อง',
      relatedTopics: 'ข่าวที่เกี่ยวข้อง',
      navMenuText: 'หมวดข่าว',
      mediaAssetPage: {
        mediaPlayer: 'มีเดีย เพลเยอร์',
        audioPlayer: 'ออดิโอ เพลเยอร์',
        videoPlayer: 'วิดีโอ เพลเยอร์',
      },
      liveExperiencePage: {
        liveLabel: 'สด',
        liveCoverage: 'รายงานสด',
        breaking: 'ด่วน',
        postedAt: 'โพสต์ทาง',
        summary: 'สรุป',
        shareButtonText: 'แชร์"',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'สรุป',
      error: {
        404: {
          statusCode: '404',
          title: 'ไม่พบเนื้อหา',
          message:
            'ขออภัย เราไม่สามารถแสดงเนื้อหาที่คุณกำลังค้นหาได้ กรุณาลอง:',
          solutions: [
            'ตรวจสอบชื่อเว็บไซต์ ',
            'กดปุ่มรีเฟรชในบราวเซอร์ของคุณ',
            'ค้นหาหน้านี้โดยใช้แถบค้นหาของ บีบีซี',
          ],
          callToActionFirst: 'กรุณาเข้าไปที่โฮมเพจของ ',
          callToActionLinkText: 'BBC News ไทย',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/thai',
        },
        500: {
          statusCode: '500',
          title: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ ',
          message:
            'ขออภัย เราไม่สามารถแสดงเนื้อหาที่คุณกำลังค้นหาได้ กรุณาลอง:',
          solutions: [
            'กดปุ่มรีเฟรชในบราวเซอร์ของคุณ',
            'กลับเข้ามาใหม่ในภายหลัง',
          ],
          callToActionFirst: 'กรุณาเข้าไปที่โฮมเพจของ ',
          callToActionLinkText: 'บีบีซีไทย',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/thai',
        },
      },
      consentBanner: {
        privacy: {
          title: 'เราได้ปรับปรุงนโยบายเกี่ยวกับความเป็นส่วนตัวและคุกกีส์แล้ว',
          description: {
            uk: {
              first:
                'เราได้แก้ไขข้อมูลที่สำคัญของนโยบายเกี่ยวกับความเป็นส่วนตัวและคุกกีส์ และเราต้องการให้คุณทราบถึง ผลกระทบต่อตัวคุณและข้อมูลของคุณ',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'เราได้แก้ไขข้อมูลที่สำคัญของนโยบายเกี่ยวกับความเป็นส่วนตัวและคุกกีส์ และเราต้องการให้คุณทราบถึง ผลกระทบต่อตัวคุณและข้อมูลของคุณ',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ตกลง',
          reject: 'ดูว่ามีอะไรเปลี่ยนแปลงไปบ้าง',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'ยอมรับการเก็บข้อมูลและดูเว็บต่อ',
            reject: 'ปฏิเสธการเก็บข้อมูลและดูเว็บต่อ',
            initial: {
              title:
                'กรุณาแจ้งให้เราทราบว่า คุณยอมรับการเก็บข้อมูลบนหน้าเว็บ AMP',
              description: {
                first: 'เราและพันธมิตรใช้เทคโนโลยี อย่างเช่น ',
                linkText: 'คุกกีส์',
                last: ' และข้อมูลการเข้าเว็บไซต์ต่าง ๆ ที่ถูกจัดเก็บไว้ เพื่อทำให้คุณได้รับประสบการณ์ที่ดีที่สุดในโลกออนไลน์ และทำให้เนื้อหาและโฆษณาที่คุณได้รับตรงกับความสนใจของคุณ กรุณาแจ้งให้เราทราบว่าคุณยอมรับหรือไม่',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'จัดการการตั้งค่าของฉัน',
            },
            manage: {
              title: 'จัดการการตั้งค่าความยินยอมบนหน้าเว็บ AMP',
              description: {
                para1:
                  'การตั้งค่าเหล่านี้ใช้กับหน้าเว็บ AMP เท่านั้น คุณอาจถูกขอให้ตั้งค่าตัวเลือกเหล่านี้ใหม่อีกครั้ง หากเข้าชมหน้าเว็บอื่นของบีบีซีที่ไม่ใช่แบบ AMP',
                para2:
                  'หน้าเว็บน้ำหนักเบาสำหรับอุปกรณ์เคลื่อนที่ซึ่งคุณเพิ่งเข้าชมนั้น ถูกสร้างขึ้นโดยใช้เทคโนโลยี AMP ของกูเกิล',
                heading2: 'จำเป็นต้องเก็บข้อมูลโดยเคร่งครัด',
                para3:
                  'เพื่อให้หน้าเว็บของเราทำงานได้ดี เราจึงต้องเก็บสารสนเทศบางอย่างในวงจำกัดไว้บนอุปกรณ์ของคุณ โดยไม่ได้ขอความยินยอมเสียก่อน',
                para4: {
                  text: 'อ่านเพิ่มเติมเกี่ยวกับสารสนเทศที่จำเป็นต่อการทำงานของหน้าเว็บ ซึ่งเราเก็บไว้บนอุปกรณ์ของคุณ',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'เราใช้ local storage เก็บรักษาข้อมูลตัวเลือกความยินยอมของคุณ บนอุปกรณ์ของคุณเอง',
                heading3: 'ไม่บังคับเก็บข้อมูล',
                para6:
                  'เมื่อคุณยินยอมให้เก็บข้อมูลบนหน้าเว็บ AMP นั่นเท่ากับยินยอมให้เราแสดงโฆษณาที่คัดเลือกแล้วว่าเหมาะสมเฉพาะบุคคลและเกี่ยวข้องกับคุณ แม้ในเวลาที่คุณอยู่นอกสหราชอาณาจักร',
                para7: {
                  text: 'อ่านเพิ่มเติมว่าเราคัดเลือกโฆษณาที่เหมาะสมเฉพาะบุคคลอย่างไรในเว็บไซต์ของบีบีซี รวมทั้งพันธมิตรด้านการโฆษณาของเรา',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'คุณสามารถเลือกไม่รับข้อมูลโฆษณาเฉพาะบุคคลได้ โดยคลิกที่ “ปฏิเสธการเก็บข้อมูลและดูเว็บต่อ” ตรงด้านล่าง โปรดทราบว่าคุณจะยังคงเห็นโฆษณาอยู่ แต่จะไม่ใช่โฆษณาที่ถูกคัดเลือกว่าเหมาะสมเฉพาะกับคุณเท่านั้น',
                para9:
                  'คุณสามารถเปลี่ยนการตั้งค่าเหล่านี้ได้โดยคลิกที่ "ตัวเลือกโฆษณา / ห้ามขายข้อมูลของฉัน" ที่ด้านล่างได้ทุกเวลา',
              },
            },
          },
          canonical: {
            title: 'กรุณาแจ้งให้เราทราบว่า คุณยอมรับคุกกีส์',
            description: {
              uk: {
                first: 'เราใช้ ',
                linkText: 'คุกกีส์',
                last: ' เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุดในโลกออนไลน์ กรุณาแจ้งให้เราทราบว่า คุณยอมรับคุกกีส์ทั้งหมดนี้',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'เราใช้ ',
                linkText: 'คุกกีส์',
                last: ' เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุดในโลกออนไลน์ กรุณาแจ้งให้เราทราบว่า คุณยอมรับคุกกีส์ทั้งหมดนี้',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'ยอมรับ',
            reject: 'ไม่ยอมรับ ไปที่การตั้งค่า',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'โปรดเปิดการใช้งาน JavaScript หรือบราวเซอร์ต่างออกไป เพื่ดูเนื้อหานี้',
        contentExpired: 'เนื้อหานี้ไม่เป็นที่ปรากฏแล้ว',
        contentNotYetAvailable: 'เนื้อหานี้ยังไม่พร้อมแสดง',
        audio: 'เสียง',
        photogallery: 'แกลเลอรีภาพ',
        video: 'วิดีโอ',
        listen: 'ฟัง',
        watch: 'ดูู',
        listenLive: 'ฟัง สด',
        liveLabel: 'สด',
        nextLabel: 'ถัดไป',
        previousRadioShow: 'รายการวิทยุก่อนหน้า',
        nextRadioShow: 'รายการวิทยุถัดไป',
        duration: 'ความยาว',
        closeVideo: 'ออก',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'คำบรรยายวิดีโอ, ',
          text: 'คำเตือน:เนื้อหาภายนอกอาจมีโฆษณา',
          articleText:
            'คำเตือน: บีบีซีไม่มีส่วนรับผิดชอบต่อเนื้อหาที่มาจากภายนอก',
          articleAdditionalText: 'เนื้อหาจาก %provider_name% อาจมีโฆษณา ',
        },
        fallback: {
          text: 'ไม่มีเนื้อหานี้',
          linkText: 'ดูเพิ่มเติมที่ %provider_name%',
          linkTextSuffixVisuallyHidden: ', ลิงก์จากภายนอก',
          warningText:
            'บีบีซี. บีบีซีไม่มีส่วนรับผิดชอบต่อเนื้อหาของเว็บไซต์ภายนอก. นโยบายของเราเรื่องการเชื่อมต่อไปยังลิงก์ภายนอก.',
        },
        skipLink: {
          text: 'ข้าม %provider_name% โพสต์ ',
          endTextVisuallyHidden: 'สิ้นสุด %provider_name% โพสต์',
        },
        consentBanner: {
          heading: `ยินยอมรับเนื้อหาจาก [social_media_site]`,
          body: `บทความนี้ประกอบด้วยเนื้อหาจาก [social_media_site] เราขอความยินยอมจากคุณก่อนใช้คุกกี้ หรือเทคโนโลยีอื่น ๆ บันทึกอะไรลงไป คุณอาจต้องอ่านนโยบายคุกกี้ของ  [social_media_site] [link]  และนโยบายความเป็นส่วนตัวของ [/link]  [social_media_site] [link] ก่อนให้ความยินยอม [/link] หากต้องการอ่านเนื้อหานี้ โปรดเลือก "ยินยอมและไปต่อ"`,
        },
      },
      include: {
        errorMessage:
          'ขออภัย เราไม่สามารถแสดงส่วนนี้ของเรื่องได้บนหน้าโทรศัพท์ที่ใช้แอปอย่างง่าย',
        linkText: 'ดูแบบเต็มเพื่อดูเนื้อหาทั้งหมด',
      },
      topStoriesTitle: 'ข่าวเด่น',
      featuresAnalysisTitle: 'เรื่องน่าสนใจ',
    },
    mostRead: {
      header: 'ได้รับความนิยมสูงสุด',
      lastUpdated: 'อัพเดทล่าสุดเมื่อเวลา',
      numberOfItems: 5,
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
    navigation: [
      {
        title: 'หน้าแรก',
        url: '/thai',
      },
      {
        title: 'ประเทศไทย',
        url: '/thai/topics/cjgn73g98rqt',
      },
      {
        title: 'ต่างประเทศ',
        url: '/thai/topics/c5v124k8lj7t',
      },
      {
        title: 'วิทยาศาสตร์',
        url: '/thai/topics/c5qvp1q33p0t',
      },
      {
        title: 'สุขภาพ',
        url: '/thai/topics/cyx5kz25zxdt',
      },
      {
        title: 'วิดีโอ',
        url: '/thai/topics/c5ljd3jng4nt',
      },
      {
        title: 'ยอดนิยม',
        url: '/thai/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/thai/institutional-49281839',
        text: 'ทำไมคุณจึงไว้วางใจ บีบีซี ได้',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'อ่านเกี่ยวกับแนวทางของเราในการติดต่อกับลิงก์ภายนอก',
      },
      links: [
        {
          href: 'https://www.bbc.com/thai/institutional-38403477',
          text: 'เงื่อนไขการใช้งานของ บีบีซี',
        },
        {
          href: 'https://www.bbc.com/thai/institutional-38403476',
          text: 'เกี่ยวกับบีบีซี',
        },
        {
          href: 'https://www.bbc.com/thai/institutional-38497681',
          text: 'นโยบายความเป็นส่วนตัว',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'คุกกีส์',
        },
        {
          href: 'https://www.bbc.co.uk/thai/send/u50853797',
          text: 'ติดต่อบีบีซี',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'บีบีซีนิวส์ภาษาอื่น ๆ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'บีบีซี. บีบีซีไม่มีส่วนรับผิดชอบต่อเนื้อหาของเว็บไซต์ภายนอก. นโยบายของเราเรื่องการเชื่อมต่อไปยังลิงก์ภายนอก.',
    },
    timezone: 'Asia/Bangkok',
  },
};

export default withContext(service);
