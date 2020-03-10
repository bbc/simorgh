import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { yoruba as brandSVG } from '@bbc/psammead-assets/svgs';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import '@bbc/psammead-locales/moment/yo';
import '@bbc/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: 'yo',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Ìgbà tí a ṣe àfíkun gbẹ̀yìn',
    atiAnalyticsAppName: 'news-yoruba',
    atiAnalyticsProducerId: '107',
    chartbeatDomain: 'yoruba.bbc.co.uk',
    brandName: 'BBC News Yorùbá',
    product: 'BBC News',
    serviceLocalizedName: 'Yorùbá',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/yoruba.png',
    defaultImageAltText: 'BBC News Yorùbá',
    dir: 'ltr',
    externalLinkText: ', Láti ìta',
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
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Àbáwọlé',
    translations: {
      seeAll: 'Wo gbogbo ẹ̀',
      home: 'Ìròyìn',
      currentPage: 'Ojú ewé to wà yìí',
      skipLinkText: 'Fò kọjá sí nnkan tí ó wà nínú rẹ̀',
      relatedContent: 'Àwọn afíkun lórí ìròyìn yìí',
      navMenuText: 'Àwọn abala',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'A kò rí ojú ewé náà',
          message:
            'Ẹ má bínú, a kò le è mú ojú ewé tí ẹ̀ ń wá, wá fún yín. Ẹ tún tiraka lẹẹkan sí i.',
          solutions: [
            'Ẹ tún ṣe àyẹ̀wò ojú òpó URL yìí lẹ́ẹ̀kan sí i',
            'Ẹ tẹ bọ́tíní tí yóò tún ojú ewé yìí gbé wá (Refresh) lẹ́ẹ̀kan sí i',
            'Ẹ má a wá ojú ewé yìí nípa lílo bọ́tìnì BBC tó ń ṣe àwárí nǹkan (BBC Search bar).',
          ],
          callToActionFirst: 'Lọ́nà míràn, ẹ le è kàn sí ojú òpó ìròyìn ',
          callToActionLinkText: 'BBC News Yorùbá',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/yoruba',
        },
        500: {
          statusCode: '500',
          title: 'Àṣìṣe láti ojú ìtàkùn àgbáyé wa',
          message:
            'Ẹ má bínú, a kò le è mú ojú ewé tí ẹ̀ ń wá, wá fún yín. Ẹ tún tiraka lẹẹkan sí i.',
          solutions: [
            'Ẹ tẹ bọ́tíní tí yóò tún ojú ewé yìí gbé wá (Refresh) lẹ́ẹ̀kan sí i',
            'A tún ń padà bọ̀',
          ],
          callToActionFirst: 'Lọ́nà míràn, ẹ le è kàn sí ojú òpó ìròyìn ',
          callToActionLinkText: 'BBC News Yorùbá',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/yoruba',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Àgbéga ti bá ìlànà àgbékalẹ̀ ojú òpó ìdákọ́ńkọ́ àti ayélujára wa',
          description: {
            uk: {
              first:
                'A ṣe àwọn àyípadà pàtàkì sáwọn ìlànà àgbékalẹ̀ òpó ìdákọ́ńkọ́ àti ayélujára wa, a sì fẹ́ kẹ mọ̀ ipa tí èyí yóò ní lórí yín àti détà tẹ̀ ń lò.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'A ṣe àwọn àyípadà pàtàkì sáwọn ìlànà àgbékalẹ̀ òpó ìdákọ́ńkọ́ àti ayélujára wa, a sì fẹ́ kẹ mọ̀ ipa tí èyí yóò ní lórí yín àti détà tẹ̀ ń lò.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ó dára bẹ́ẹ̀',
          reject: 'Ẹ ṣe ìwádìí ohun tó yípadà',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Ẹ jẹ́ ká mọ̀ pé ẹ faramọ́ ìlànà òpó ìtàkún àgbáyé wa',
          description: {
            uk: {
              first: 'À ń lo ',
              linkText: 'fún ìlànà òpó ìtàkùn àgbáyé',
              last:
                ' láti jẹ́ kẹ ní ìrírí tó dára jùlọ lójú òpó ìtàkùn àgbáyé. Ẹ jọ̀wọ́, ẹ jẹ́ ká mọ tẹ bá faramọ gbogbo àwọn ìlàná òpó ìtàkùn àgbáyé wọnyí.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Àwa àti àwọn alábàáṣiṣẹ́pọ̀ wa ń lo àwọn ìmọ̀ ẹ̀rọ, bíi ',
              linkText: 'ìlànà òpó ìtàkùn àgbáyé',
              last:
                ', láti mọ détà tí ẹ̀ ń lò, ká le è fun yín ní ìrírí lílo ojú òpó yélujára tó dára jùlọ, ká sì tún ri dájú pé ẹyin ìkan ló ń rí àwọn ohun ta kọ àti ìpolówó ọjà tí á ń fi hàn yín.Ẹ jọ̀wọ́, ẹ jẹ́ ká mọ̀ tẹ bá fara mọ́ ọ.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Bẹ́ẹ̀ni, mo fara mọ́ ọ',
          reject: 'Rárá, ẹ gbé mi padà sí ojú òpó àtúntò (setting)',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'Àwọn àmúyẹ fun gbígbọ́ orin ko le ṣiṣẹ lori ẹ̀rọ rẹ',
        contentExpired: 'Nnkan yìí kò sí mọ́.',
        audio: 'Orin',
        photogallery: 'Àtẹ Àwòrán',
        video: 'Fídíò',
        bbc_yoruba_radio: {
          title: 'Placeholder title',
          subtitle: 'Placeholder subtitle',
        },
        listen: 'Gbọ́',
        watch: 'Wò',
        liveLabel: 'NÍ YÀJÓYÀJÓ',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Èyítí A Ń Kà Jùlọ',
      lastUpdated: 'Tí a mú dójú ìwọ̀n gbẹ̀yìn ní:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/yoruba/institutional-48528718',
        text: 'Ìdí tí ẹ fi le è nígbàagbọ́ nínú ìròyìn BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
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
          href: 'https://www.bbc.com/yoruba/institutional-43091540',
          text: 'Kàn sí BBC',
        },
      ],
      copyrightText:
        'BBC. BBC kò mọ̀ nípa àwọn ohun tí ó wà ní àwọn ojú òpó tí ó wà ní ìta.',
    },
    fonts: [],
    timezone: 'Africa/Lagos',
    navigation: [
      {
        title: 'Ìròyìn',
        url: '/yoruba',
      },
      {
        title: 'Eré ìdárayá',
        url: '/yoruba/topics/4063f80f-cccc-44c8-9449-5ca44e4c8592',
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
