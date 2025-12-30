import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Europe/Warsaw';
import '#psammead/psammead-locales/moment/pl-pl';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'pl-PL',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Zaktualizowany',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-polska',
    atiAnalyticsProducerId: '135',
    atiAnalyticsProducerName: 'POLISH',
    chartbeatDomain: 'polska.bbc.co.uk',
    brandName: 'BBC News Polska',
    product: 'BBC News',
    serviceLocalizedName: 'Polish',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/polska/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News Polska',
    dir: 'ltr',
    externalLinkText: ', zewnętrzny',
    imageCaptionOffscreenText: 'Podpis zdjęcia, ',
    videoCaptionOffscreenText: 'Podpis wideo, ',
    audioCaptionOffscreenText: 'Podpis nagrania',
    defaultCaptionOffscreenText: 'Podpis, ',
    imageCopyrightOffscreenText: 'Źródło zdjęcia, ',
    locale: 'pl_PL',
    datetimeLocale: 'pl-pl',
    service: 'polska',
    serviceName: 'Polska',
    languageName: 'Polish',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/polska/articles/c0l0x321d1xo',
    publishingPrinciples: 'https://www.bbc.com/polska/articles/c0l0x321d1xo',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/polska/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Strona główna',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Strona',
        previousPage: 'Poprzednia',
        nextPage: 'Następna',
        pageXOfY: 'Strona {x} z {y}',
      },
      ads: {
        advertisementLabel: 'Reklama',
      },
      readTime: {
        readTimePrefix: 'Czas czytania',
        long: 'Długi format',
        minute: 'min',
      },
      byline: {
        articleInformation: 'Informacje o artykule',
        author: 'Autor',
        listItemImage: 'Zdjęcie autora',
        published: 'Data publikacji',
        reportingFrom: 'Relacja z',
        role: 'Stanowisko',
      },
      seeAll: 'Zobacz wszystkie',
      home: 'Strona główna',
      currentPage: 'Strona bieżąca',
      skipLinkText: 'Przejdź do treści',
      relatedContent: 'Powiązane treści',
      relatedTopics: 'Powiązane tematy',
      moreOnThis: '',
      navMenuText: 'Sekcje',
      liteSite: {
        onboardingMessage:
          'Oglądasz tekstową wersję strony, która zużywa mniej danych. Zobacz pełną wersję tej strony ze wszystkimi zdjęciami i wideo.',
        toMainSite: 'Przejdź do strony głównej',
        informationPage: 'Dowiedz się więcej o wersji oszczędzającej dane',
        dataSaving: 'Wersja oszczędzająca dane',
        articleDataSavingLinkText: 'Wersja oszczędzająca dane',
      },
      mediaAssetPage: {
        mediaPlayer: 'Odtwarzacz multimedialny',
        audioPlayer: 'Odtwarzacz audio',
        videoPlayer: 'Odtwarzacz wideo',
      },
      liveExperiencePage: {
        liveLabel: 'Na żywo',
        liveCoverage: 'Relacja na żywo',
        breaking: 'Pilne',
        postedAt: 'Opublikowano o',
        summary: 'Podsumowanie',
        shareButtonText: 'Udostępnij',
      },
      downloads: {
        instructions: 'Możesz pobrać i obejrzeć dzisiejsze wiadomości.',
        title: 'Pobieranie pliku',
      },
      gist: 'W skrócie',
      error: {
        404: {
          statusCode: '404',
          title: 'Nie znaleziono strony',
          message: 'Nie możemy znaleźć strony, której szukasz. Spróbuj:',
          solutions: [
            'Sprawdzić poprawność adresu URL',
            'Odświeżyć stronę w przeglądarce',
          ],
          callToActionFirst: 'Możesz również przejść do ',
          callToActionLinkText: 'BBC News',
          callToActionLast: ' strona główna. ',
          callToActionLinkUrl: 'https://www.bbc.com/polska',
        },
        500: {
          statusCode: '500',
          title: 'Błąd wewnętrzny serwera',
          message:
            'Nie możemy teraz wyświetlić strony, której szukasz. Spróbuj:',
          solutions: ['Odświeżyć stronę w przeglądarce', 'Wrócić później'],
          callToActionFirst: 'Możesz również przejść do ',
          callToActionLinkText: 'BBC',
          callToActionLast: ' strona główna. ',
          callToActionLinkUrl: 'https://www.bbc.com/polska',
        },
        home: 'Strona główna',
        currentPage: 'Strona bieżąca',
        skipLinkText: 'Przejdź do treści',
      },
      consentBanner: {
        privacy: {
          title: 'Zaktualizowaliśmy naszą Politykę Prywatności i Plików Cookie',
          description: {
            uk: {
              first:
                'Wprowadziliśmy kilka ważnych zmian w naszej Polityce Prywatności i Plików Cookie. Sprawdź, co to oznacza dla Ciebie i Twoich danych.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Wprowadziliśmy kilka ważnych zmian w naszej Polityce Prywatności i Plików Cookie. Sprawdź, co to oznacza dla Ciebie i Twoich danych.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Dowiedz się, co się zmieniło',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Zaakceptuj zbieranie danych i kontynuuj',
            reject: 'Odrzuć zbieranie danych i kontynuuj',
            initial: {
              title: 'Potwierdź, że zgadzasz się na zbieranie danych na AMP',
              description: {
                first: 'My i nasi partnerzy używamy technologii takich jak ',
                linkText: 'pliki cookie',
                last: ', i zbieramy dane dotyczące przeglądania, aby zapewnić Ci najlepsze możliwe doświadczenia online oraz personalizować wyświetlane treści i reklamy. Daj nam znać, czy się zgadzasz.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Zarządzaj ustawieniami',
            },
            manage: {
              title: 'Zarządzaj ustawieniami zgody na stronach AMP',
              description: {
                para1:
                  'Te ustawienia dotyczą wyłącznie stron AMP. Możesz zostać poproszony/a o ponowne ustawienie tych preferencji podczas odwiedzania stron BBC spoza AMP.',
                para2:
                  'Odwiedzana przez Ciebie lekka strona mobilna została stworzona z użyciem technologii Google AMP.',
                heading2: 'Ściśle niezbędne zbieranie danych',
                para3:
                  'Aby nasze strony działały poprawnie, przechowujemy niektóre niezbędne informacje na Twoim urządzeniu bez Twojej zgody.',
                para4: {
                  text: 'Dowiedz się więcej o niezbędnych informacjach, które przechowujemy na Twoim urządzeniu, by nasze strony działały poprawnie.',
                  url: 'https://www.bbc.com/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'Używamy pamięci lokalnej do przechowywania preferencji dotyczących zgody na Twoim urządzeniu.',
                heading3: 'Opcjonalne zbieranie danych',
                para6:
                  'Wyrażając zgodę na zbieranie danych na stronach AMP, pozwalasz nam na wyświetlanie spersonalizowanych, dostosowanych do Ciebie reklam, gdy przebywasz poza Wielką Brytanią.',
                para7: {
                  text: 'Przeczytaj więcej na temat personalizacji reklam na BBC oraz na stronach partnerskich.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Możesz zrezygnować z otrzymywania spersonalizowanych reklam klikając poniżej: “Odrzuć zbieranie danych i kontynuuj”. Nadal będą wyświetlane reklamy, ale nie będą one spersonalizowane.',
                para9:
                  'Możesz zmienić te ustawienia w dowolnym momencie, klikając „Opcje reklam / Nie sprzedawaj moich danych” w stopce strony.',
              },
            },
          },
          canonical: {
            title: 'Powiedz nam, czy zgadzasz się na pliki cookie',
            description: {
              uk: {
                first: 'Używamy ',
                linkText: 'plików cookie',
                last: 'aby zapewnić Ci najlepsze doświadczenia online. Prosimy o potwierdzenie, czy zgadzasz się na wszystkie te pliki cookie.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Używamy ',
                linkText: 'plików cookie',
                last: ' aby zapewnić Ci najlepsze doświadczenia online. Prosimy o potwierdzenie, czy zgadzasz się na wszystkie te pliki cookie.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Tak, zgadzam się',
            reject: 'Nie, przejdź do ustawień',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Aby odtworzyć tę treść, włącz obsługę JavaScript lub użyj innej przeglądarki',
        contentExpired: 'Ta treść nie jest już dostępna',
        audio: 'Audio',
        photogallery: 'Galeria zdjęć',
        video: 'Wideo',
        listen: 'Słuchaj',
        watch: 'Oglądaj',
        liveLabel: 'NA ŻYWO',
        nextLabel: 'WKRÓTCE',
        previousRadioShow: 'Poprzednia audycja radiowa',
        nextRadioShow: 'Następna audycja radiowa',
        duration: 'Czas trwania',
        contentNotYetAvailable: 'Ta treść nie jest jeszcze dostępna',
        watchMoments: 'Oglądaj momenty',
        listenLive: 'Słuchaj na żywo',
        listenNext: 'Słuchaj następnej',
        recentEpisodes: 'Ostatnie Odcinki',
        podcastExternalLinks: 'Ten podcast dostępny jest też na',
        download: 'Pobierz',
        closeVideo: 'Zamknij',
        endOfContentClose: 'Koniec tej treści. Zamknij',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Podpis wideo, ',
          text: 'Uwaga: Treści zewnętrzne mogą zawierać reklamy',
          articleText:
            'BBC nie ponosi odpowiedzialności za treści na stronach zewnętrznych.',
          articleAdditionalText:
            'Treści z %provider_name% mogą zawierać reklamy',
        },
        fallback: {
          text: 'Treść nie jest dostępna',
          linkText: 'Zobacz treść na %provider_name%',
          linkTextSuffixVisuallyHidden: ', zewnętrzny',
          warningText:
            'BBC nie ponosi odpowiedzialności za treści na stronach zewnętrznych.',
        },
        skipLink: {
          text: 'Pomiń treść z %provider_name%',
          endTextVisuallyHidden: 'Koniec treści z %provider_name%',
        },
        consentBanner: {
          heading: 'Zezwolić na treść z [social_media_site]?',
          body: 'Ten artykuł zawiera treści z serwisu [social_media_site]. Prosimy o zaznaczenie zgody przed załadowaniem, ponieważ w treści mogą być używane pliki cookie i inne technologie.  Przed zaznaczeniem zgody, możesz zapoznać się z [link] polityką plików cookie [/link]i [link] polityką prywatności [/link] serwisu [social_media_site]. Aby wyświetlić treść, wybierz „zaakceptuj i kontynuuj',
          button: 'Zaakceptuj i kontynuuj',
        },
      },
      include: {
        errorMessage:
          'Ta część artykułu nie może zostać wyświetlona w lekkiej wersji mobilnej.',
        linkText: 'Otwórz pełną wersję strony, aby wyświetlić całą treść.',
      },
      topStoriesTitle: 'Najważniejsze Wiadomości',
      latestMediaTitle: 'Najnowsze wideo',
      featuresAnalysisTitle: 'Polecane przez redakcję',
      ugc: {
        noJsHeading: 'Nie można załadować tej strony.',
        noJsDescription:
          'Aby załadować tę stronę, włącz obsługę JavaScript lub użyj innej przeglądarki.',
        optional: 'optional',
        fileUploadLiveRegionText: 'Aktualizacja, oto, co wysyłasz: ',
        fileUploadLiveRegionUpdateText: 'Aktualizacja, usunięto ',
        fileUploadButton: 'Wybierz plik',
        fileUploadListHeading: 'Oto, co wysyłasz:',
        fileUploadRemoveButton: 'Usuń',
        submitButton: 'Wyślij',
        errorSummary: 'Wystąpił problem, sprawdź:',
        validationRequired: 'Brakuje wymaganych danych.',
        validationInvalidEmail:
          'Adres e-mail wygląda nieprawidłowo. Podaj poprawny adres.',
        validationInvalidTelephone:
          'Numer telefonu wygląda nieprawidłowo. Podaj poprawny numer.',
        validationFilesNotEnough:
          'Za mało plików. Dodaj co najmniej {{minFiles}}',
        validationFilesTooMany:
          'Za dużo plików. Możesz dodać maksymalnie {{maxFiles}}.',
        validationFilesInvalidType:
          'Nie obsługujemy tego typu pliku. Dodaj pliki {{fileTypes}}.',
        validationFilesTooSmall: 'Plik jest uszkodzony. Spróbuj wybrać inny.',
        validationFilesSizeExceeded:
          'Pliki są za duże. Możesz przesłać jednorazowo maksymalnie 1.2 GB ',
        validationWordLimit: 'Maksymalnie {{wordLimit}} słów',
        referenceNumber: 'Numer referencyjny',
        submissionInfoSignedOutMessage: 'Zapisz te dane na przyszłość.',
        retentionPeriodDays:
          'Będziemy przechowywać Twoje dane do {{days}} dni –jeśli ich nie wykorzystamy, zostaną usunięte razem z innymi informacjami, które nam przesłałeś/aś.',
        privacyInfoHtml:
          'Chronimy Twoje dane. Szczegóły w {{privacyInfoLink}}.',
        emailToHtml:
          'Jeśli zmienisz zdanie, wyślij e-mail na adres {{emailLink}}. Pamiętaj, aby podać numer referencyjny.',
        removalGuidelineText:
          'Jeśli przesłane dane zostaną użyte w programie lub online, nie będziemy mogli ich usunąć.',
        dataPolicyHeading: 'Nasza polityka dotycząca danych',
        uploadingHeading: 'Wysyłanie',
        uploadingDescription: 'Poczekaj na zakończenie wysyłania.',
        successHeading: 'Wiadomość wysłana',
        successDescription: 'Dziękujemy za skontaktowanie się z nami.',
        privacyPolicyLinkHref: 'https://www.bbc.com/privacy/',
        privacyPolicyLinkText: 'Polityka Prywatności',
        errorHeading: 'Nie udało się wysłać wiadomości.',
        errorDescription: 'Spróbuj ponownie później.',
        closedHeading: 'Zakończone',
        closedDescription: 'Zamknięto dnia {{date}}.',
      },
    },
    mostRead: {
      header: 'Najczęściej czytane',
      lastUpdated: 'Ostatnio zaktualizowane:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
      frequenciesPageUrl: '',
      frequenciesPageLabel: 'Nasze częstotliwości i audycje',
      header: 'Audycje radiowe',
      durationLabel: 'Czas trwania %duration%',
    },
    recommendations: {
      header: 'Polecane artykuły',
      skipLink: {
        text: 'Pomiń %title% i czytaj dalej',
        endTextVisuallyHidden: 'Koniec %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/polska/articles/c0l0x321d1xo',
        text: 'Dlaczego ufamy BBC',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/links-and-feeds',
        text: 'Przeczytaj o naszych zasadach linkowania zewnętrznego.',
      },
      links: [
        {
          href: 'https://www.bbc.com/polska/articles/c9djv7vl647o',
          text: 'Warunki użytkowania',
        },
        {
          href: 'https://www.bbc.com/polska/articles/cwyn84e4n08o',
          text: 'O BBC',
        },
        {
          href: 'https://www.bbc.com/polska/articles/ce82e738g0do',
          text: 'Polityka prywatności',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Pliki cookie',
        },
        {
          href: 'https://www.bbc.com/polska/send/u203797512',
          text: 'Skontaktuj się z nami',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Inne języki',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Proszę nie udostępniać ani nie sprzedawać moich danych',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC nie ponosi odpowiedzialności za treści na stronach zewnętrznych.',
    },
    timezone: 'Europe/Warsaw',
    navigation: [
      {
        title: 'Strona główna',
        url: '/polska',
      },
      {
        title: 'Polska',
        url: '/polska/topics/cly1xdxypzet',
      },
      {
        title: 'Świat',
        url: '/polska/topics/cvg9w8yplg1t',
      },
      {
        title: 'Zdrowie',
        url: '/polska/topics/c15nxyq4pqnt',
      },
      {
        title: 'Wideo',
        url: '/polska/topics/c4gk270dy10t',
      },
    ],
  },
};
export default withContext(service);
