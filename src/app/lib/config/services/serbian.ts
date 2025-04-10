import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import cyrillic from '../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/sr-cyrl';
import '#psammead/psammead-locales/moment/sr';
import withContext from '../../../contexts/utils/withContext';
import { SerbianConfig } from '../../../models/types/serviceConfig';
import { Direction, Services } from '../../../models/types/global';

const baseServiceConfig = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  atiAnalyticsAppName: 'news-serbian',
  atiAnalyticsProducerId: '81',
  atiAnalyticsProducerName: 'SERBIAN',
  useReverb: true,
  chartbeatDomain: 'serbian.bbc.co.uk',
  product: 'BBC News',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/serbian.png',
  dir: 'ltr' as Direction,
  service: 'serbian' as Services,
  languageName: 'Serbian',
  twitterCreator: '@bbcnasrpskom',
  twitterSite: '@bbcnasrpskom',
  isTrustProjectParticipant: true,
  manifestPath: '/serbian/manifest.json',
  swPath: '/sw.js',
  radioSchedule: {
    hasRadioSchedule: false,
  },
  recommendations: {
    hasStoryRecommendations: false,
  },
  showAdPlaceholder: false,
  showRelatedTopics: true,
  timezone: 'GMT',
};

export const service: SerbianConfig = {
  lat: {
    ...baseServiceConfig,

    articleTimestampPrefix: 'Ažurirano',
    articleTimestampSuffix: '',
    brandName: 'BBC News na srpskom',
    datetimeLocale: `sr`,
    externalLinkText: ', spoljna',
    homePageTitle: 'Glavna stranica',
    lang: `sr-latn`,
    locale: `sr-latn`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'sr-Latn',
    noBylinesPolicy:
      'https://www.bbc.com/serbian/lat/institutional-50173730#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/serbian/lat/institutional-50173730',
    script: latinWithDiacritics,
    serviceLocalizedName: 'na srpskom',
    serviceName: 'News na srpskom',
    defaultImageAltText: 'BBC News na srpskom',
    defaultCaptionOffscreenText: 'Potpis, ',
    audioCaptionOffscreenText: 'Potpis ispod audio zapisa, ',
    videoCaptionOffscreenText: 'Potpis ispod videa, ',
    imageCaptionOffscreenText: 'Potpis ispod fotografije, ',
    imageCopyrightOffscreenText: 'Autor fotografije, ',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/serbian/lat/institutional-50173730',
        text: 'Zašto BBC zaslužuje vaše poverenje',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.co.uk/serbian/send/u50853665',
          text: 'Kontaktirajte BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News na drugim jezicima',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
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
        title: 'Studentske blokade',
        url: '/serbian/topics/cly9dd4w09wt/lat',
      },
      {
        title: 'Srbija',
        url: '/serbian/topics/cr50vdy9q6wt/lat',
      },
      {
        title: 'Balkan',
        url: '/serbian/topics/c06g87137jgt/lat',
      },
      {
        title: 'Svet',
        url: '/serbian/topics/c2lej05e1eqt/lat',
      },
      {
        title: 'Video',
        url: '/serbian/topics/c44vyp5g049t/lat',
      },
      {
        title: 'Najpopularnije',
        url: '/serbian/lat/popular/read',
      },
    ],
    scriptLink: {
      text: 'Ћир',
      variant: 'cyr',
    },
    translations: {
      pagination: {
        page: 'Stranica',
        previousPage: 'Prethodno',
        nextPage: 'Sledeće',
        pageXOfY: 'Stranica {x} od {y}',
      },
      ads: {
        advertisementLabel: 'Advertisement',
      },
      seeAll: 'Pogledajte sve',
      home: 'Glavna stranica',
      currentPage: 'Otvorena stranica',
      skipLinkText: 'Pređite na sadržaj',
      relatedContent: 'Povezano',
      relatedTopics: 'Povezane teme',
      navMenuText: 'Odeljci',
      mediaAssetPage: {
        mediaPlayer: 'Media plejer',
        audioPlayer: 'Audio plejer',
        videoPlayer: 'Video plejer',
      },
      liveExperiencePage: {
        liveLabel: 'Uživo',
        liveCoverage: 'Pokrivenost uživo',
        breaking: 'Vanredne',
        postedAt: 'Objavljeno u',
        summary: 'Sažetak',
        shareButtonText: 'Deli',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Sažetak',
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
      byline: {
        articleInformation: 'Podaci o članku',
        author: 'Autor',
        listItemImage: 'Prikazane fotografije',
        published: 'Objavljeno',
        reportingFrom: 'Izveštava iz',
        role: 'Funkcija',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Prihvatite prikupljanje podataka i nastavite',
            reject: 'Odbijate prikupljanje podataka i nastavite',
            initial: {
              title:
                'Obavestite nas da li se slažete sa prikupljanjem podataka na AMP stranicama',
              description: {
                first: 'Mi i naši partneri koristimo tehnologije poput ',
                linkText: 'kolačića',
                last: ' i prikupljamo podatke pretraživača da bismo vam ponudili najkvalitetnije iskustvo na internetu i personalizovali sadržaj i oglase koji vam se prikazuju. Molimo vas da nas obavestite da li se slažete.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Promenite moja podešavanja',
            },
            manage: {
              title: 'Promenite moja podešavanja na AMP stranicama',
              description: {
                para1:
                  'Ova podešavanja se koriste samo na AMP stranicama. Možda će vam biti traženo da ponovo izvršite podešavanja kada posećujete ne-AMP BBC stranice.',
                para2:
                  'Manje opterećena mobilna stranica koju ste posetili napravljena je korišćenjem Gugl AMP tehnologije.',
                heading2: 'Samo neophodno prikupljanje podataka',
                para3:
                  'Da bi naše internet stranice funkcionisale, čuvamo određenu i ograničenu količinu podataka na vašem uređaju bez vaše saglasnosti.',
                para4: {
                  text: 'Pročitajte više o neophodnim podacima koje čuvamo na vašem uređaju da bi naše stranice funkcionisale. (na engleskom jeziku)',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Koristimo lokalne servere da bismo sačuvali vaše podatke o saglasnosti na vašem uređaju.',
                heading3: 'Opciono prikupljanje podataka',
                para6:
                  'Kada pristanete na prikupljanje podataka na AMP stranicama, pristajete da nam dozvolite da vam prikažemo personalizovane oglase koji su važni za vas kada ste van Velike Britanije.',
                para7: {
                  text: 'Pročitajte više o načinu na koji personalizujemo oglase na BBC-ju i kod naših partnerskih oglašivača.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Možete da odaberete da ne dobijate personalizovane oglase ako kliknete na "Odbiti prikupljanje podataka i nastaviti" ispod. Molimo vas da uzmete u obzir da ćete i dalje videti oglase, ali neće biti personalizovani za vas.',
                para9:
                  'Možete da promenite ova podešavanja ako kliknete na "Izbor oglasa / Ne možete prodavati moje podatke" u dnu stranice u svakom trenutku.',
              },
            },
          },
          canonical: {
            title: 'Obavestite nas da li se slažete sa korišćenjem kolačića',
            description: {
              uk: {
                first: 'Koristimo ',
                linkText: 'kolačiće',
                last: ' da bismo vam pružili najbolje iskustvo na internetu. Molimo vas da nas obavestite da li se slažete sa upotrebom svih kolačića.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Koristimo ',
                linkText: 'kolačiće',
                last: ' da bismo vam pružili najbolje iskustvo na internetu. Molimo vas da nas obavestite da li se slažete sa upotrebom svih kolačića.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Da, slažem se',
            reject: 'Ne, vratite me na podešavanja',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Reprodukovanje multimedijskog sadržaja na vašem uređaju nije podržano',
        contentExpired: 'Ovaj sadržaj više nije dostupan.',
        contentNotYetAvailable:
          'Ovaj sadržaj još uvek nije dostupan za reprodukciju.',
        audio: 'Audio',
        photogallery: 'Foto galerija',
        video: 'Video',
        listen: 'Slušajte',
        watch: 'Gledajte',
        listenLive: 'Slušajte uživo',
        liveLabel: 'UŽIVO',
        nextLabel: 'NEXT',
        previousRadioShow: 'Prethodna radio emisija',
        nextRadioShow: 'Sledeća radio emisija',
        duration: 'Trajanje',
        closeVideo: 'Izađi',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Potpis ispod videa, ',
          text: 'Upozorenje: Sadržaj drugih sajtova može da sadrži i reklame',
          articleText:
            'Upozorenje: BBC nije odgovoran za sadržaj drugih sajtova.',
          articleAdditionalText:
            'Sadržaj %provider_name% može da sadrži reklame.',
        },
        fallback: {
          text: 'Sadržaj nije dostupan',
          linkText: 'Pogledajte više na %provider_name%',
          linkTextSuffixVisuallyHidden: ', spoljna stranica',
          warningText: 'BBC nije odgovoran za sadržaj drugih sajtova.',
        },
        skipLink: {
          text: 'Preskočite sadržaj sa %provider_name%',
          endTextVisuallyHidden: 'Kraj sadržaja sa %provider_name%',
        },
        consentBanner: {
          heading: `Dozvoliti sadržaj [social_media_site]?`,
          body: `U ovom članku se pojavljuje sadržaj [social_media_site]. Molimo vas da date dozvolu pre nego što se sadržaj učita, pošto može da koristi kolačiće i druge tehnologije. Možda biste želeli da pročitate [social_media_site] [link] politiku kolačića [/link] i [link] politiku privatnosti [/link] pre nego što date pristanak. Da biste videli ovaj sadržaj, odaberite "Prihvatite i nastavite".`,
          button: 'Prihvatite i nastavite',
        },
      },
      include: {
        errorMessage:
          'Izvinite, ovaj deo teksta ne može da bude prikazan na mobilnom telefonu.',
        linkText:
          'Pogledajte punu verziju stranice da biste videli čitav sadržaj.',
      },
      topStoriesTitle: 'Najvažnije',
      featuresAnalysisTitle: 'Reportaže',
      latestMediaTitle: 'Najnovije',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'opciono',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'Pogledajte šta postavljate',
        fileUploadButton: 'Odaberite fajl',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'Pošaljite',

        // Validation
        validationRequired: 'Nešto nedostaje.',
        validationInvalidEmail:
          'Nešto nije u redu. Molimo, unesite odgovarajuću imejl adresu.',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'Nema dovoljno fajlovsa. Molimo, dodajte najmanje {{minFiles}}',
        validationFilesTooMany:
          'Previše je fajlova. Možete dodati najviše {{maxFiles}}.',
        validationFilesInvalidType:
          'Izvinite, ne možemo da koristimo ovu vrstu fajlova. Molimo, dodajte {{fileTypes}}',
        validationFilesTooSmall: 'Ovaj fajl je loš. Pokušajte sa drugim.',
        validationFilesSizeExceeded:
          'Izvinite, fajlovi su preveliki. Možete dodati do 1.2 GB u jednom pokušaju.',
        validationWordLimit: 'Najviše {{wordLimit}} reči',

        // Messaging
        retentionPeriodDays: undefined,
        referenceNumber: 'Referentni broj',
        submissionInfoSignedOutMessage:
          'Možda biste želeli da zapišete ove detalje za vaše potrebe.',
        privacyInfoHtml:
          'Ne brinite, mi štitimo vaše podatke - pročitajte {{privacyInfoLink}} za više detalja.',
        emailToHtml:
          'Pošaljite imejl na {{emailLink}} ako se predomislite. Samo navedite referentni broj i napišite da ne želite da koristimo materijal.',
        removalGuidelineText:
          'Ako ste poslali materijal za korišćenje u programu ili onlajn, nećemo biti u mogućnosti da ga uklonimo ako ga upotrebimo po prijemu.',

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'Vaši fajlovi se šalju...',
        uploadingDescription:
          'Molimo, sačekajte da se završi slanje u potpunosti',

        // Success Screen
        successHeading: 'Poruka poslata',
        successDescription: 'Hvala vam što ste nam se javili',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'Vaša poruka nije otišla',
        errorDescription: 'Pokušajte da pošaljete ponovo.',

        // Closed Screen
        closedHeading: 'Unos je sada zatvoren',
        closedDescription: 'Unos je zatvoren {{date}}',
      },
    },
  },
  cyr: {
    ...baseServiceConfig,
    articleTimestampPrefix: 'Ажурирано',
    articleTimestampSuffix: '',
    brandName: 'BBC News на српском',
    datetimeLocale: `sr-cyrl`,
    externalLinkText: ', спољна',
    homePageTitle: 'Главна страница',
    lang: `sr-cyrl`,
    locale: `sr-cyrl`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'sr-Cyrl',
    noBylinesPolicy:
      'https://www.bbc.com/serbian/cyr/institutional-50173730#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/serbian/cyr/institutional-50173730',
    script: cyrillic,
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
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.co.uk/serbian/send/u50853665',
          text: 'Контактирајте ББЦ',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News на другим језицима',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
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
        title: 'Студентске блокаде',
        url: '/serbian/topics/cly9dd4w09wt/cyr',
      },
      {
        title: 'Србија',
        url: '/serbian/topics/cr50vdy9q6wt/cyr',
      },
      {
        title: 'Балкан',
        url: '/serbian/topics/c06g87137jgt/cyr',
      },
      {
        title: 'Свет',
        url: '/serbian/topics/c2lej05e1eqt/cyr',
      },
      {
        title: 'Видео',
        url: '/serbian/topics/c44vyp5g049t/cyr',
      },
      {
        title: 'Најпопуларније',
        url: '/serbian/cyr/popular/read',
      },
    ],
    scriptLink: {
      text: 'Lat',
      variant: 'lat',
    },
    translations: {
      pagination: {
        page: 'Страница',
        previousPage: 'Претходно',
        nextPage: 'Следеће',
        pageXOfY: 'Страница {x} од {y}',
      },
      ads: {
        advertisementLabel: 'Advertisement',
      },
      seeAll: 'Погледајте све',
      home: 'Главна страница',
      currentPage: 'Отворена страница',
      skipLinkText: 'Пређите на садржај',
      relatedContent: 'Повезано',
      relatedTopics: 'Повезане теме',
      navMenuText: 'Одељци',
      mediaAssetPage: {
        mediaPlayer: 'Медиа плејер',
        audioPlayer: 'Аудио плејер',
        videoPlayer: 'Видео плејер',
      },
      liveExperiencePage: {
        liveLabel: 'Уживо',
        liveCoverage: 'Покривеност уживо',
        breaking: 'Ванредне',
        postedAt: 'Објављено у',
        summary: 'Сажетак',
        shareButtonText: 'Дели',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Сажетак',
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
      byline: {
        articleInformation: 'Подаци о чланку',
        author: 'Аутор',
        listItemImage: 'Приказане фотографије',
        published: 'Објављено',
        reportingFrom: 'Извештава из',
        role: 'Функција',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Прихватите прикупљање података и наставите',
            reject: 'Одбијате прикупљање података и наставите',
            initial: {
              title:
                'Обавестите нас да ли се слажете са прикупљањем података на АМП страницама',
              description: {
                first: 'Ми и наши партнери користимо технологије попут ',
                linkText: 'колачиће',
                last: ' и прикупљамо податке претраживача да бисмо вам понудили најквалитетније искуство на интернету и персонализовали садржај и огласе који вам се приказују. Молимо вас да нас обавестите да ли се слажете.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Промените моја подешавања',
            },
            manage: {
              title: 'Промените моја подешавања на АМП страницама',
              description: {
                para1:
                  'Ова подешавања се користе само на АМП страницама. Можда ће вам бити тражено да поново извршите подешавања када посећујете не-АМП ББЦ странице.',
                para2:
                  'Мање оптерећена мобилна страница коју сте посетили направљена је коришћењем Гугл АМП технологије.',
                heading2: 'Само неопходно прикупљање података',
                para3:
                  'Да би наше интернет странице функционисале, чувамо одређену и ограничену количину података на вашем уређају без ваше сагласности.',
                para4: {
                  text: 'Прочитајте више о неопходним подацима које чувамо на вашем уређају да би наше странице функционисале. (на енглеском језику)',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Користимо локалне сервере да бисмо сачували ваше податке о сагласности на вашем уређају.',
                heading3: 'Опционо прикупљање података',
                para6:
                  'Када пристанете на прикупљање података на АМП страницама, пристајете да нам дозволите да вам прикажемо персонализоване огласе који су важни за вас када сте ван Велике Британије.',
                para7: {
                  text: 'Прочитајте више о начину на који персонализујемо огласе на ББЦ-ју и код наших партнерских оглашавача.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Можете да одаберете да не добијате персонализоване огласе ако кликнете на ”Одбити прикупљање података и наставити” испод. Молимо вас да узмете у обзир да ћете и даље видети огласе, али неће бити персонализовани за вас.',
                para9:
                  'Можете да промените ова подешавања ако кликнете на ”Избор огласа / Не можете продавати моје податке” у дну странице у сваком тренутку.',
              },
            },
          },
          canonical: {
            title: 'Обавестите нас да ли се слажете са коришћењем колачића',
            description: {
              uk: {
                first: 'Користимо ',
                linkText: 'колачиће',
                last: ' да бисмо вам пружили најбоље искуство на интернету. Молимо вас да нас обавестите да ли се слажете са употребом свих колачића.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Ми и наши партнери користимо технологије попут ',
                linkText: 'колачиће',
                last: ' и прикупљамо податке претраживача да бисмо вам понудили најквалитетније искуство на интернету и персонализовали садржај и огласе који вам се приказују. Молимо вас да нас обавестите да ли се слажете.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Да, слажем се',
            reject: 'Не, вратите ме на подешавања',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Репродуковање мултимедијског садржаја на вашем уређају није подржано',
        contentExpired: 'Овај садржај више није доступан.',
        contentNotYetAvailable:
          'Овај садржај још увек није доступан за репродукцију.',
        audio: 'Аудио',
        photogallery: 'Фото галерија',
        video: 'Видео',
        listen: 'Слушајте',
        listenLive: 'Слушајте уживо',
        watch: 'Гледајте',
        liveLabel: 'УЖИВО',
        nextLabel: 'NEXT',
        previousRadioShow: 'Претходна радио емисија',
        nextRadioShow: 'Следећа радио емисија',
        duration: 'Трајање',
        recentEpisodes: 'Претходне епизоде',
        closeVideo: 'Изађи',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Video caption, ',
          text: 'Warning: Third party content may contain adverts',
          articleText: 'Warning: ББЦ није одговоран за садржај других сајтова.',
          articleAdditionalText:
            'Садржај %provider_name% може да садржи рекламе.',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          warningText: 'ББЦ није одговоран за садржај других сајтова.',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
        consentBanner: {
          heading: `Дозволити садржај [social_media_site]?`,
          body: `У овом чланку се појављује садржај [social_media_site]. Молимо вас да дате дозволу пре него што се садржај учита, пошто може да користи колачиће и друге технологије. Можда бисте желели да прочитате [social_media_site] [link] политику колачића [/link] и [link] политику приватности [/link] пре него што дате пристанак. Да бисте видели овај садржај, одаберите "Прихватите и наставите”.`,
          button: 'Прихватите и наставите',
        },
      },
      include: {
        errorMessage:
          'Извините, овај део текста не може да буде приказан на мобилном телефону.',
        linkText:
          'Погледајте пуну верзију странице да бисте видели читав садржај.',
      },
      topStoriesTitle: 'Најважније',
      featuresAnalysisTitle: 'Репортаже',
      latestMediaTitle: 'Најновије',
    },
  },
};

export default withContext(service);
