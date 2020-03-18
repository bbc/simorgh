import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import {
  latinDiacritics,
  cyrillicAndLatin,
} from '@bbc/gel-foundations/scripts';
import { serbian as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/sr-cyrl';
import '@bbc/psammead-locales/moment/sr';
import withContext from '../../../contexts/utils/withContext';

const baseServiceConfig = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  atiAnalyticsAppName: 'news-serbian',
  atiAnalyticsProducerId: '81',
  chartbeatDomain: 'serbian.bbc.co.uk',
  product: 'BBC News',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/serbian.png',
  dir: `ltr`,
  service: 'serbian',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcnasrpskom',
  twitterSite: '@bbcnasrpskom',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  isTrustProjectParticipant: true,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  radioSchedule: {
    hasRadioSchedule: false,
  },
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
  brandSVG,
  fonts: [],
  timezone: 'GMT',
};

export const service = {
  lat: {
    ...baseServiceConfig,
    ads: {
      hasAds: false,
    },
    articleTimestampPrefix: 'Ažurirano',
    brandName: 'BBC News na srpskom',
    datetimeLocale: `sr`,
    externalLinkText: ', spoljna stranica',
    frontPageTitle: 'Glavna stranica',
    lang: `sr-latn`,
    locale: `sr-latn`,
    script: latinDiacritics,
    serviceLocalizedName: 'na srpskom',
    serviceName: 'News na srpskom',
    defaultImageAltText: 'BBC News na srpskom',
    defaultCaptionOffscreenText: 'Potpis ',
    audioCaptionOffscreenText: 'Potpis ispod audio zapisa ',
    videoCaptionOffscreenText: 'Potpis ispod videa ',
    imageCaptionOffscreenText: 'Potpis ispod fotografije ',
    imageCopyrightOffscreenText: 'Autor fotografije, ',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/serbian/lat/institutional-50173730',
        text: 'Zašto BBC zaslužuje vaše poverenje',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Pročitajte naša pravila o linkovanju drugih sajtova.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Pravila korišćenja',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc/',
          text: 'O BBC-ju',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Pravila privatnosti',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Kolačići',
        },
        {
          href: 'https://www.bbc.com/serbian/lat/institutional-43543431',
          text: 'Kontaktirajte BBC',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC nije odgovoran za sadržaj drugih sajtova.',
    },
    mostRead: {
      header: 'Najčitanije',
      lastUpdated: 'Poslednji put ažurirano ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    navigation: [
      {
        title: 'Početna strana',
        url: '/serbian/lat',
      },
      {
        title: 'Srbija',
        url: '/serbian/lat/topics/1791445f-977a-4e6d-b490-51f84bb4fc52',
      },
      {
        title: 'Balkan',
        url: '/serbian/lat/balkan',
      },
      {
        title: 'Svet',
        url: '/serbian/lat/svet',
      },
      {
        title: 'Video',
        url: '/serbian/lat/media/video',
      },
      {
        title: 'Najpopularnije',
        url: '/serbian/lat/popular/read',
      },
    ],
    scriptLink: {
      text: 'Ћир',
      offscreenText: 'Cyrillic',
      variant: 'cyr',
    },
    translations: {
      seeAll: 'Pogledajte sve',
      home: 'Glavna stranica',
      currentPage: 'Otvorena stranica',
      skipLinkText: 'Pređite na sadržaj',
      relatedContent: 'Povezano',
      navMenuText: 'Odeljci',
      mediaAssetPage: {
        mediaPlayer: 'Media plejer',
        audioPlayer: 'Audio plejer',
        videoPlayer: 'Video plejer',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Stranica nije pronađena',
          message:
            'Izvinite, stranica koju ste tražili nije nađena. Molimo vas da pokušate:',
          solutions: [
            'Proverite još jednom internet adresu',
            'Pritisnite taster za osvežavanje u vašem pretraživaču',
            'Potražite ovu stranicu koristeći BBC polje za pretragu',
          ],
          callToActionFirst: 'Molimo vas da posetite glavnu stranicu ',
          callToActionLinkText: 'BBC News na srpskom',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/serbian/lat',
        },
        500: {
          statusCode: '500',
          title: 'Greška internog servera',
          message:
            'Izvinite, stranica koju ste tražili nije nađena. Molimo vas da pokušate:',
          solutions: [
            'Pritisnite taster za osvežavanje u vašem pretraživaču',
            'Posetite kasnije stranicu',
          ],
          callToActionFirst: 'Molimo vas da posetite glavnu stranicu ',
          callToActionLinkText: 'BBC News na srpskom',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/serbian/lat',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Osvežili smo našu politiku privatnosti i kolačića',
          description: {
            uk: {
              first:
                'Uveli smo važne promene u našu politiku privatnosti i kolačića i želimo da znate šta to znači za vas i vaše podatke',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Uveli smo važne promene u našu politiku privatnosti i kolačića i želimo da znate šta to znači za vas i vaše podatke',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'U redu',
          reject: 'Saznajte šta se promenilo',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Obavestite nas da li se slažete sa korišćenjem kolačića',
          description: {
            uk: {
              first: 'Koristimo ',
              linkText: 'kolačiće',
              last:
                ' da bismo vam pružili najbolje iskustvo na internetu. Molimo vas da nas obavestite da li se slažete sa upotrebom svih kolačića.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Mi i naši partneri koristimo tehnologije poput ',
              linkText: 'kolačića',
              last:
                ' i prikupljamo podatke pretraživača da bismo vam ponudili najkvalitetnije iskustvo na internetu i personalizovali sadržaj i oglase koji vam se prikazuju. Molimo vas da nas obavestite da li se slažete.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Da, slažem se',
          reject: 'Ne, vratite me na podešavanja',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs:
          'Reprodukovanje multimedijskog sadržaja na vašem uređaju nije podržano',
        contentExpired: 'Ovaj sadržaj više nije dostupan.',
        audio: 'Audio',
        photogallery: 'Foto galerija',
        video: 'Video',
        listen: 'Slušajte',
        watch: 'Gledajte',
        liveLabel: 'UŽIVO',
        previousRadioShow: 'Prethodna radio emisija',
        nextRadioShow: 'Sledeća radio emisija',
        duration: 'Trajanje',
      },
    },
  },
  cyr: {
    ...baseServiceConfig,
    ads: {
      hasAds: false,
    },
    articleTimestampPrefix: 'Ажурирано',
    brandName: 'BBC News на српском',
    datetimeLocale: `sr-cyrl`,
    externalLinkText: ', спољна страница',
    frontPageTitle: 'Главна страница',
    lang: `sr-cyrl`,
    locale: `sr-cyrl`,
    script: cyrillicAndLatin,
    serviceLocalizedName: 'на српском',
    serviceName: 'News на српском',
    defaultImageAltText: 'ББЦ News на српском',
    defaultCaptionOffscreenText: 'Потпис, ',
    audioCaptionOffscreenText: 'Потпис испод аудио записа, ',
    videoCaptionOffscreenText: 'Потпис испод видеа, ',
    imageCaptionOffscreenText: 'Потпис испод фотографије, ',
    imageCopyrightOffscreenText: 'Аутор фотографије, ',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/serbian/cyr/institutional-50173730',
        text: 'Зашто ББЦ заслужује ваше поверење',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Прочитајте наша правила о линковању других сајтова.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Правила коришћења',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc/',
          text: 'О ББЦ-ју',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Правила приватности',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Колачићи',
        },
        {
          href: 'https://www.bbc.com/serbian/cyr/institutional-43543431',
          text: 'Контактирајте ББЦ',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ББЦ није одговоран за садржај других сајтова.',
    },
    mostRead: {
      header: 'Најчитаније',
      lastUpdated: 'Последњи пут ажурирано:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    navigation: [
      {
        title: 'Почетна страна',
        url: '/serbian/cyr',
      },
      {
        title: 'Србија',
        url: '/serbian/cyr/topics/1791445f-977a-4e6d-b490-51f84bb4fc52',
      },
      {
        title: 'Балкан',
        url: '/serbian/cyr/balkan',
      },
      {
        title: 'Свет',
        url: '/serbian/cyr/svet',
      },
      {
        title: 'Видео',
        url: '/serbian/cyr/media/video',
      },
      {
        title: 'Најпопуларније',
        url: '/serbian/cyr/popular/read',
      },
    ],
    scriptLink: {
      text: 'Lat',
      offscreenText: 'Latin',
      variant: 'lat',
    },
    translations: {
      seeAll: 'Погледајте све',
      home: 'Главна страница',
      currentPage: 'Отворена страница',
      skipLinkText: 'Пређите на садржај',
      relatedContent: 'Повезано',
      navMenuText: 'Одељци',
      mediaAssetPage: {
        mediaPlayer: 'Медиа плејер',
        audioPlayer: 'Аудио плејер',
        videoPlayer: 'Видео плејер',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Страница није пронађена',
          message:
            'Извините, страница коју сте тражили није нађена. Молимо вас да покушате:',
          solutions: [
            'Проверите још једном интернет адресу',
            'Притисните тастер за освежавање у вашем претраживачу',
            'Потражите ову страницу користећи ББЦ поље за претрагу',
          ],
          callToActionFirst: 'Молимо вас да посетите главну страницу ',
          callToActionLinkText: 'BBC News на српском',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/serbian/cyr',
        },
        500: {
          statusCode: '500',
          title: 'Грешка интерног сервера',
          message:
            'Извините, страница коју сте тражили није нађена. Молимо вас да покушате:',
          solutions: [
            'Притисните тастер за освежавање у вашем претраживачу',
            'Посетите касније страницу',
          ],
          callToActionFirst: 'Молимо вас да посетите главну страницу ',
          callToActionLinkText: 'BBC News на српском',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/serbian/cyr',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Освежили смо нашу политику приватности и колачића',
          description: {
            uk: {
              first:
                'Увели смо важне промене у нашу политику приватности и колачића и желимо да знате шта то значи за вас и ваше податке',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Увели смо важне промене у нашу политику приватности и колачића и желимо да знате шта то значи за вас и ваше податке',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'У реду',
          reject: 'Сазнајте шта се променило',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Обавестите нас да ли се слажете са коришћењем колачића',
          description: {
            uk: {
              first: 'Користимо ',
              linkText: 'колачиће',
              last:
                ' да бисмо вам пружили најбоље искуство на интернету. Молимо вас да нас обавестите да ли се слажете са употребом свих колачића.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Ми и наши партнери користимо технологије попут ',
              linkText: 'колачиће',
              last:
                ' и прикупљамо податке претраживача да бисмо вам понудили најквалитетније искуство на интернету и персонализовали садржај и огласе који вам се приказују. Молимо вас да нас обавестите да ли се слажете.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Да, слажем се',
          reject: 'Не, вратите ме на подешавања',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs:
          'Репродуковање мултимедијског садржаја на вашем уређају није подржано',
        contentExpired: 'Овај садржај више није доступан.',
        audio: 'Аудио',
        photogallery: 'Фото галерија',
        video: 'Видео',
        listen: 'Слушајте',
        watch: 'Гледајте',
        liveLabel: 'УЖИВО',
        previousRadioShow: 'Претходна радио емисија',
        nextRadioShow: 'Следећа радио емисија',
        duration: 'Трајање',
      },
    },
  },
};

export default withContext(service);
