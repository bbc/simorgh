import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Frissítve',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-magyarul',
    atiAnalyticsProducerId: '134',
    atiAnalyticsProducerName: 'HUNGARIAN',
    useReverb: true,
    chartbeatDomain: 'magyarul.bbc.co.uk',
    brandName: 'BBC News Magyarul',
    product: 'BBC News',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/magyarul/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News Magyarul',
    dir: 'ltr',
    externalLinkText: ', Külső',
    imageCaptionOffscreenText: 'Képaláírás, ',
    videoCaptionOffscreenText: 'Videófelirat, ',
    audioCaptionOffscreenText: 'Hangfelirat',
    defaultCaptionOffscreenText: 'Felirat, ',
    imageCopyrightOffscreenText: 'Kép forrás, ',
    locale: 'en_GB',
    isoLang: 'en',
    datetimeLocale: 'en-gb',
    service: 'magyarul',
    serviceName: 'Magyarul',
    serviceLocalizedName: 'Magyarul',
    languageName: 'Angol',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/magyarul/articles/c8xr72zw50xo',
    publishingPrinciples: 'https://www.bbc.com/magyarul/articles/c8xr72zw50xo',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/magyarul/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Főoldal',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Lap',
        previousPage: 'Előző oldal',
        nextPage: 'Következő oldal',
        pageXOfY: '{x}/{y} oldal',
      },
      ads: {
        advertisementLabel: 'Hirdetés',
      },
      byline: {
        articleInformation: 'Cikk',
        author: 'Szerző',
        listItemImage: 'Szerzői kép',
        published: 'Publikálva',
        reportingFrom: '',
        role: 'Pozíció',
      },
      seeAll: 'Összes megtekintése',
      home: 'Főoldal',
      currentPage: 'Jelenlegi oldal',
      skipLinkText: 'Ugrás a tartalomra',
      relatedContent: 'Kapcsolódó tartalom',
      relatedTopics: 'Kapcsolódó téma',
      navMenuText: 'Menü',
      liteSite: {
        onboardingMessage:
          'Jelenleg a weboldal szöveges, adatkímélő változatát tekinti meg. A weboldal teljes, képeket és videókat is tartalmazó verziója itt érhető el.',
        toMainSite: 'Ugrás a főoldalra',
        informationPage: 'Tudjon meg többet az adatkímélő verzióról',
        informationPageLink: '#',
        dataSaving: 'Adatkímélő verzió',
        articleDataSavingLinkText: 'Adatkímélő verzió',
      },
      mediaAssetPage: {
        mediaPlayer: 'Médialejátszó',
        audioPlayer: 'Hanglejátszó',
        videoPlayer: 'Videolejátszó',
      },
      liveExperiencePage: {
        liveLabel: 'Élő',
        liveCoverage: 'Élő közvetítés',
        breaking: 'Breaking',
        postedAt: 'Publikálva',
        summary: 'Összefoglaló',
        shareButtonText: 'Megosztás',
      },
      downloads: {
        instructions: 'Töltse le és tekintse meg a mai híreket.',
        title: 'Letöltés',
      },
      gist: 'Lényeg',
      error: {
        404: {
          statusCode: '404',
          title: 'A keresett oldal nem található.',
          message:
            'Elnézését kérjük, de a keresett oldal jelenleg nem elérhető. Kérjük, próbálja meg:',
          solutions: ['ellenőrizni az URL-t', 'újratölteni a böngészőt'],
          callToActionFirst: 'Vagy látogassa meg a',
          callToActionLinkText: 'BBC Magyarul',
          callToActionLast: 'weboldalát. ',
          callToActionLinkUrl: 'https://www.bbc.com/magyarul',
        },
        500: {
          statusCode: '500',
          title: 'Belső szerverhiba',
          message:
            'Elnézését kérjük, de a keresett oldal jelenleg nem elérhető. Kérjük, próbálja meg:',
          solutions: ['újratölteni a böngészőt', 'később újra '],
          callToActionFirst: 'Vagy látogassa meg a ',
          callToActionLinkText: 'BBC News Magyarul',
          callToActionLast: 'weboldalát. ',
          callToActionLinkUrl: 'https://www.bbc.com/magyarul',
        },
        home: 'Kezdőlap',
        currentPage: 'Jelenlegi oldal',
        skipLinkText: 'Ugrás a tartalomra',
      },
      consentBanner: {
        privacy: {
          title: 'Frissítettük az Adatvédelmi és Süti Szabályzatunkat',
          description: {
            uk: {
              first:
                'Végrehajtottunk néhány fontos változtatást az Adatvédelmi és Süti Szabályzatunkban, és szeretnénk, ha tudná, mit jelentenek ezek az ön számára.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Végrehajtottunk néhány fontos változtatást az Adatvédelmi és Süti Szabályzatunkban, és szeretnénk, ha tudná, mit jelentenek ezek az ön es az adatai számára.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Rendben',
          reject: 'Tekintse meg, mi változott',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Elfogadom és folytatom',
            reject: 'Elutasítom és folytatom',
            initial: {
              title:
                'Kérjük, jelezze, hogy hozzájárul az adatok gyűjtéséhez a gyorsított mobiloldalakon (AMP)',
              description: {
                first:
                  'A partnereinkkel közösen olyan technológiákat használunk, mint például',
                linkText: 'a sütik',
                last: ',és böngészési adatokat gyűjtünk annak érdekében, hogy a lehető legjobb online élményt nyújtsuk, valamint személyre szabjuk az önnek megjelenített tartalmakat és hirdetéseket. Kérjük, jelezze, hogy egyetért-e ezzel.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Beállításaim',
            },
            manage: {
              title: 'Hozzájárulási beállítások kezelése AMP-oldalakon',
              description: {
                para1:
                  'Ezek a beállítások csak az AMP-oldalakra vonatkoznak. Előfordulhat, hogy ezeket a beállításokat újra meg kell adnia, amikor nem AMP formátumú BBC-oldalakat látogat meg.',
                para2:
                  'Az erőforrás-takarékos mobiloldal, amelyet meglátogatott, Google AMP technológiával épült.',
                heading2: 'A szigorúan szükséges adatok gyűjtése.',
                para3:
                  'Hogy működtetni tudjuk a weboldalunkat, felhatalmazás nélkül, limitált mennyiségű adatot tárolunk az eszközön.',
                para4: {
                  text: 'További információ arról, hogy milyen alapvető adatokat tárolunk az eszközén, hogy weboldalaink megfelelően működjenek',
                  url: 'https://www.bbc.com/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'Helyi tárolót használunk arra, hogy a hozzájárulási beállításait az eszközén tárolhassuk.',
                heading3: 'Opcionális adatgyűjtés',
                para6:
                  'Amikor hozzájárul az adatgyűjtéshez az AMP-oldalakon, ahhoz is hozzájárul, hogy az Egyesült Királyságon kívül személyre szabott, önre szabott hirdetéseket jelenítsünk meg.',
                para7: {
                  text: 'Tudjon meg többet arról, hogyan szabja önre hirdetéseit a BBC és partnerei..',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Az alábbi „Adatgyűjtés elutasítása és folytatás” gombra kattintva kiválaszthatja, hogy nem szeretne személyre szabott hirdetéseket kapni. Ugyanakkor, kérjük, vegye figyelembe, hogy továbbra is látni fog hirdetéseket, de azok nem lesznek az ön számára személyre szabva.”',
                para9:
                  'Ezeket a beállításokat bármikor módosíthatja az oldal láblécében található „Hirdetési beállítások / Ne adja el az adataimat” gombra kattintva.',
              },
            },
          },
          canonical: {
            title: 'Kérjük jelezze, hogy elfogadja-e a sütiket.',
            description: {
              uk: {
                first: 'Mi',
                linkText: 'sütiket használunk',
                last: 'annak érdekében, hogy a lehető legjobb online élményt nyújthassuk. Kérjük, döntse el, hogy egyetért-e a sütik engedélyezésével.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Mi',
                linkText: 'sütiket használunk',
                last: ' annak érdekében, hogy a lehető legjobb online élményt nyújthassuk. Kérjük, döntse el, hogy egyetért-e a sütik engedélyezésével.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Egyetértek',
            reject: 'Nem értek egyet, vigyen a beállításokhoz.',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Annak érdekében, hogy a tartalmat lejátszhassa, kérjük, engedélyezze a JavaScriptet, vagy próbáljon meg egy másik böngészőt.',
        contentExpired: 'Ez a tartalom már nem elérhető.',
        audio: 'Hang',
        photogallery: 'Fotógaléria',
        video: 'Videó',
        listen: 'Meghallgat',
        watch: 'Megnéz',
        liveLabel: 'ÉLŐ',
        nextLabel: 'KÖVETKEZŐ',
        previousRadioShow: 'Előző rádióadás',
        nextRadioShow: 'Következő rádióadás',
        duration: 'Időtartam',
        contentNotYetAvailable: 'Ez a tartalom még nem érhető el.',
        listenLive: 'Élő',
        listenNext: 'Következő',
        recentEpisodes: 'Legutóbbi epizódok',
        podcastExternalLinks: 'Ez a podcast elérhető',
        download: 'Letöltés',
        closeVideo: 'Bezárás',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Videófelirat, ',
          text: 'Figyelem: A harmadik fél tartalma hirdetéseket is tartalmazhat',
          articleText: 'A BBC nem felelős külső honlapok tartalmáért.',
          articleAdditionalText:
            '%provider_name% tartalma hirdetéseket is tartalmazhat',
        },
        fallback: {
          text: 'A tartalom nem elérhető.',
          linkText: 'Tekintse meg a tartalmat a(z) %provider_name% felületén',
          linkTextSuffixVisuallyHidden: ', external',
          warningText: 'A BBC nem felelős külső honlapok tartalmáért.',
        },
        skipLink: {
          text: 'A(z) %provider_name% tartalmának átugrása',
          endTextVisuallyHidden: 'A(z) %provider_name% tartalmának vége',
        },
        consentBanner: {
          heading: 'A(z) [social_media_site] tartalmának engedélyezése?',
          body: "Ebben a cikkben a(z) [közösségimédia-oldal] tartalmai is megtalálhatók. Engedélyt kérünk, mielőtt bármi betöltenénk, mivel sütiket és egyéb technológiákat is használhatnak. Olvassa el a(z) [social_media_site]'s [link] sütikre [/link] és [link] adatvédelemre vonsatkozó rendelkezéseit [/link] mielőtt elfogadja. Ha szeretné megtekinteni a tartalmat, kérjük, válassza az 'Elfogadás és Folytatás' opciót.",
          button: 'Elfogadás és folytatás',
        },
      },
      include: {
        errorMessage:
          'Sajnáljuk, de ez a tartalom az energiatakarékos üzemmódban nem elérhető.',
        linkText:
          'Válassza a teljes verziót, hogy megtekinthesse az összes tartalmat.',
      },
      topStoriesTitle: 'Aktuális hírek',
      latestMediaTitle: 'Legújabb videók',
      featuresAnalysisTitle: 'Továbbiak',
      ugc: {
        noJsHeading: 'Sajnáljuk, de a keresett oldalt nem tudjuk betölteni.',
        noJsDescription:
          'Annak érdekében, hogy a tartalmat lejátszhassa, kérjük, engedélyezze a JavaScriptet, vagy próbáljon meg egy másik böngészőt.',
        optional: 'optional',
        fileUploadLiveRegionText: 'Ez az, amit küld: ',
        fileUploadLiveRegionUpdateText: 'Eltávolít ',
        fileUploadButton: 'Válassza ki a fájlt',
        fileUploadListHeading: 'Ez az, amit küld:',
        fileUploadRemoveButton: 'Eltávolít',
        submitButton: 'Beküld',
        errorSummary: 'Egy hiba lépett fel, kérjük ellenőrizze, hogy:',
        validationRequired: 'hiányzik-e valami.',
        validationInvalidEmail:
          'Hiba történt. Kérjük, adjon meg egy létező email címet.',
        validationInvalidTelephone:
          'Hiba történt. Kérjük, adjon meg egy létező telefonszámot.',
        validationFilesNotEnough:
          'Nincs elég fájl. Kérjük, adjon meg legalább {{minFiles}}',
        validationFilesTooMany: 'Túl sok fájl. Még megadhat {{maxFiles}}.',
        validationFilesInvalidType:
          'Elnézést, de ezt a fájltípust nem tudjuk betölteni. Kérem adja meg {{fileTypes}}.',
        validationFilesTooSmall: 'Ez a fájl hibás. Próbáljon meg egy másikat.',
        validationFilesSizeExceeded:
          'Elnézést, de ezek a fájlok túl nagyméretűek. Csak 1.2 gigabájtnyit tölthet fel egyszerre.',
        validationWordLimit: 'Maximum {{wordLimit}} szó',
        referenceNumber: 'Azonosító',
        submissionInfoSignedOutMessage:
          'Érdemes lehet feljegyeznie ezeket a részleteket, hogy később hivatkozhasson rájuk.',
        retentionPeriodDays:
          'Az ön által beküldött adatokat {{days}} napig tartjuk meg - ha nem használjuk fel, kitöröljük őket.',
        privacyInfoHtml:
          'Ne aggódjon, megvédjük adatait - olvassa el a{{privacyInfoLink}}, ha további információra van szüksége.',
        emailToHtml:
          'Ha meggondolta magát és nem szeretné, ha felhasználnánk az adatokat, lépjen kapcsolatba velünk a(z) {{emailLink}} címen. Ne felejtse megadni az azonosítóját.',
        removalGuidelineText:
          'Ha valamit beküldött egy programhoz vagy online, azt már nem tudjuk eltávolítani, miután felhasználtuk',
        dataPolicyHeading: 'Adatkezelési szabályzatunk',
        uploadingHeading: 'Feltöltés',
        uploadingDescription: 'Kérem várjon, amíg végez.',
        successHeading: 'Üzenet elküldve',
        successDescription: 'Köszönjük a megkeresését',
        privacyPolicyLinkHref: 'https://www.bbc.com/privacy/',
        privacyPolicyLinkText: 'Adatkezelési szabályzat',
        errorHeading: 'Sajnáljuk, de az üzenet nem lehet elküldeni.',
        errorDescription: 'Kérjük, próbálja meg később.',
        closedHeading: 'Ez most bezárt',
        closedDescription: 'Bezárt {{date}}.',
      },
    },
    mostRead: {
      header: 'Legolvasottabb',
      lastUpdated: 'Legutóbb frissített:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
      frequenciesPageUrl: '',
      frequenciesPageLabel: 'Frekvenciáink és hírműsoraink',
      header: 'Rádióadás',
      durationLabel: 'Időtartam %duration%',
    },
    recommendations: {
      skipLink: {
        text: 'Ugrás %title%-ra és az olvasás folyatatása',
        endTextVisuallyHidden: '%title% vége',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/magyarul/articles/c8xr72zw50xo',
        text: 'Miért bízhat a BBC-ben',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/links-and-feeds',
        text: 'Tudjon meg többet a külső linkek használatáról szóló irányelveinkről.',
      },
      links: [
        {
          href: 'https://www.bbc.com/magyarul/articles/c8jmk241e89o',
          text: 'Felhasználási feltételek',
        },
        {
          href: 'https://www.bbc.com/magyarul/articles/cwywderkzy2o',
          text: 'A BBC-ről',
        },
        {
          href: 'https://www.bbc.com/magyarul/articles/cpw1je42j5xo',
          text: 'Adatvédelmi irányelvek',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Sütik',
        },
        // {
        //   href: 'https://www.bbc.com/magyarul/send/u217104736',
        //   text: 'Lépjen kapcsolatba a BBC-vel',
        // },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'A BBC News más nyelveken',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Ne ossza meg vagy adja el adatát',
        },
      ],
      copyrightText:
        'A BBC. A BBC-t nem terheli felelősség a külső oldalak tartalmáért.',
    },
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Hírek',
        url: 'https://www.bbc.com/magyarul',
        hideOnLiteSite: false,
      },
    ],
  },
};

export default withContext(service);
