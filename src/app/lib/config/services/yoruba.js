import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { yoruba as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/yo';

const yoruba = {
  lang: 'yo',
  product: 'BBC News',
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-yoruba',
  brandName: 'BBC News Yorùbá',
  locale: 'yo',
  isoLang: 'yo',
  datetimeLocale: 'yo',
  service: 'yoruba',
  serviceName: 'Yoruba',
  serviceLocalizedName: 'Yorùbá',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/yoruba.png',
  defaultImageAltText: 'BBC News Yorùbá',
  dir: 'ltr',
  brandSVG,
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  fonts: [],
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCNews', // to be updated
  twitterSite: '@BBCNews', // to be updated
  translations: {
    home: 'Ìròyìn',
    currentPage: 'Ojú ewé to wà yìí',
    skipLinkText: 'Fò kọjá sí nnkan tí ó wà nínú rẹ̀',
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
        title: 'Àgbéga ti bá ìlànà àgbékalẹ̀ ojú òpó ìdákọ́ńkọ́ àti ayélujára wa',
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
      audio: 'Orin',
      photogallery: 'Àtẹ Àwòrán',
      video: 'Fidio',
      bbc_yoruba_radio: {
        title: 'Placeholder title',
        subtitle: 'Placeholder subtitle',
      },
    },
  },
  navigation: [
    {
      title: 'Ìròyìn',
      url: '/yoruba',
    },
    { title: 'Eré ìdárayá', url: '/yoruba/ere_idaraya' },
    {
      title: 'Fídíò',
      url: '/yoruba/media/video',
    },
    {
      title: 'Èyí to gbajúmọ̀ jù',
      url: '/yoruba/popular/read',
    },
  ],
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Ọwọ́ tí a fi mú ìbáṣepọ̀ ti ìta.',
    },
    links: [
      {
        href: 'https://www.bbc.com/yoruba/institutional-48528718',
        text: 'Ìdí tí ẹ fi le è nígbàagbọ́ nínú ìròyìn BBC',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/terms/',
        text: 'Ìlànà Lílò',
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
};

export default yoruba;
