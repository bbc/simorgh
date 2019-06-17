import { yoruba as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';

const yoruba = {
  product: 'BBC News',
  brandName: 'BBC News Yorùbá',
  locale: 'yo',
  service: 'yoruba',
  serviceName: 'Yoruba',
  serviceLocalizedName: 'Yorùbá',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/yoruba.png',
  defaultImageAltText: 'BBC News Yorùbá',
  brandSVG,
  script: latin,
  fonts: [],
  frontpageUrl: '/yoruba',
  translations: {
    home: 'Ìròyìn',
    error: {
      404: {
        statusCode: '404',
        title: 'Page cannot be found',
        message:
          "Sorry, we're unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC News homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/news',
      },
      500: {
        statusCode: '500',
        title: 'Internal server error',
        message:
          "Sorry, we're currently unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC News homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/news',
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
  },
};

export default yoruba;
