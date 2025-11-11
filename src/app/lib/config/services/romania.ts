import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/en-gb';
import '#psammead/moment-timezone-include/tz/Europe/London';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'en-GB',
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Actualizat',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-romanian',
    atiAnalyticsProducerId: '136',
    atiAnalyticsProducerName: 'ROMANIAN',
    useReverb: true,
    chartbeatDomain: 'romania.bbc.co.uk',
    brandName: 'BBC News România',
    product: 'BBC News',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News România',
    dir: 'ltr',
    externalLinkText: ', extern',
    imageCaptionOffscreenText: 'Legendă imagine, ',
    videoCaptionOffscreenText: 'Legendă video, ',
    audioCaptionOffscreenText: 'Legendă audio',
    defaultCaptionOffscreenText: 'Legendă, ',
    imageCopyrightOffscreenText: 'Sursă imagine, ',
    locale: 'en_GB',
    datetimeLocale: 'en-gb',
    service: 'romania',
    serviceName: 'Romanian',
    serviceLocalizedName: 'România',
    languageName: 'Rom',
    twitterCreator: '@BBCNewsRomania',
    twitterSite: '@BBCNewsRomania',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/romania/manifest.json',
    swPath: '/service/sw.js',
    homePageTitle: 'Ultimele știri',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Pagina',
        previousPage: 'Înapoi',
        nextPage: 'Înainte',
        pageXOfY: 'Pagina {x} din {y}',
      },
      ads: {
        advertisementLabel: 'Publicitate',
      },
      byline: {
        articleInformation: 'Informații despre articol',
        author: 'Autor',
        listItemImage: 'Fotografia autorului',
        published: 'Data publicării',
        reportingFrom: 'Relatează din',
        role: 'Rol',
      },
      seeAll: 'Vezi integral',
      home: 'Știri',
      currentPage: 'Pagina curentă',
      skipLinkText: 'Acces direct la conținut',
      relatedContent: 'Articole similare',
      relatedTopics: 'Subiecte similare',
      moreOnThis: '',
      navMenuText: 'Secțiuni',
      liteSite: {
        onboardingMessage:
          'Vizualizați o versiune text a acestui site, care utilizează mai puține date. Reveniți la versiunea principală a site-ului, care include toate imaginile și clipurile video.',
        toMainSite: 'Înapoi la site-ul principal',
        informationPage:
          'Află mai multe despre această versiune care economisește date',
        informationPageLink: '#',
        dataSaving: 'Versiune site cu minim trafic de date',
        articleDataSavingLinkText: 'Versiune site cu minim trafic de date',
      },
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Live',
        liveCoverage: 'Live',
        breaking: 'Ultima oră',
        postedAt: 'Postat la',
        summary: 'Sumar',
        shareButtonText: 'Trimite',
      },
      downloads: {
        instructions: 'Puteți descărca și vizualiza știrile de astăzi.',
        title: 'Descărcare fișier',
      },
      gist: 'Puncte principale',
      error: {
        404: {
          statusCode: '404',
          title: 'Pagina nu a fost găsită.',
          message:
            'Ne pare rău, nu îți putem oferi pagina pe care o cauți. Te rugăm să încerci următoarele soluții:',
          solutions: [
            'Verifică adresa paginii de internet',
            'Re-încărcă pagina de internet',
          ],
          callToActionFirst: 'Alternativ, te rugăm să revii la ',
          callToActionLinkText: 'BBC News România.',
          callToActionLast: 'pagina principală.',
          callToActionLinkUrl: 'https://www.bbc.com/romanian',
        },
        500: {
          statusCode: '500',
          title: 'Eroare internă de server',
          message:
            'Ne pare rău, nu îți putem oferi pagina pe care o cauți. Te rugăm să încerci următoarele soluții:',
          solutions: [
            'Verifică adresa paginii de internet',
            'Re-încărcă pagina de internet',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News România.',
          callToActionLast: ' pagina principală. ',
          callToActionLinkUrl: 'https://www.bbc.com/romanian',
        },
        home: 'Pagina principală',
        currentPage: 'Pagina curentă',
        skipLinkText: 'Acces direct la conținut',
      },
      consentBanner: {
        privacy: {
          title: 'Am actualizat Politica de confidențialitate și cookie-uri',
          description: {
            uk: {
              first:
                'Am adus câteva modificări importante Politicii de confidențialitate și cookie-uri și dorim să știi ce înseamnă acestea pentru datele tale.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Am adus câteva modificări importante Politicii de confidențialitate și cookie-uri și dorim să știi ce înseamnă acestea pentru datele tale.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Află ce s-a schimbat',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Acceptă colectarea datelor și continuă',
            reject: 'Respinge colectarea datelor și continuă',
            initial: {
              title:
                'Anunță=-ne dacă ești de acord cu colectarea datelor pe platforma AMP',
              description: {
                first: 'Noi și partenerii noștri folosim tehnologii precum ',
                linkText: 'cookies',
                last: ', și colectăm date privind navigarea pe internet a utilizatorilor pentru a oferi cea mai bună experiență online și pentru a personaliza conținutul și publicitatea afișate. Te rugăm să ne anunți dacă ești de acord.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Gestionează setările',
            },
            manage: {
              title: 'Gestionează setările de consimțământ pe paginile AMP',
              description: {
                para1:
                  'Aceste setări se aplică numai paginilor AMP. Este posibil să ți se solicite să setezi din nou aceste preferințe atunci când vizitezi pagini BBC non-AMP.',
                para2:
                  'Pagina mobilă pe care ai vizitat-o a fost construită folosind tehnologia Google AMP.',
                heading2: 'Colectarea datelor strict necesare',
                para3:
                  'Pentru ca paginile noastre web să funcționeze, stocăm anumite informații limitate pe dispozitivul tău fără a cere consimțământul.',
                para4: {
                  text: 'Citește mai multe despre informațiile esențiale pe care le stocăm pe dispozitivul tău pentru ca paginile noastre web să funcționeze.',
                  url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'Folosim spațiul de stocare local pentru a stoca preferințele de consimțământ pe dispozitivul tău',
                heading3: 'Colectarea datelor opționale',
                para6:
                  'Când îți dai consimțământul pentru colectarea datelor pe paginile de tip AMP, ne permiți să afișăm reclame personalizate relevante atunci când te afli în afara Marii Britanii.',
                para7: {
                  text: 'Află detalii despre cum personalizăm publicitatea, la BBC și pe site-urile partenere.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Poți alege să nu primești reclame personalizate făcând clic pe „Respingeți colectarea datelor și continuați”, mai jos. Reține că vei vedea în continuare reclame, dar acestea nu vor fi personalizate pentru tine.',
                para9:
                  'Poți modifica aceste setări oricând, făcând clic pe „Opțiuni anunțuri / Nu vindeți datele mele” în subsolul paginii.',
              },
            },
          },
          canonical: {
            title: 'Anunță-ne dacă ești de acord cu politica privind cookies',
            description: {
              uk: {
                first: 'Folosim',
                linkText: 'cookies',
                last: ' pentru a îți oferi cea mai bună experiență online. Spune-ne dacă ești de acord cu colectarea tuturor cookie-urilor.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Folosim ',
                linkText: 'cookies',
                last: ' pentru a îți oferi cea mai bună experiență online. Spune-ne dacă ești de acord cu colectarea tuturor cookie-urilor.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Da, sunt de acord',
            reject: 'Nu, merg la setări',
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Pentru a reda acest conținut, te rugăm să activezi JavaScript sau să încerci alt browser.',
        contentExpired: 'Acest conținut nu mai este disponibil',
        audio: 'Audio',
        photogallery: 'Galerie foto',
        video: 'Video',
        listen: 'Ascultă',
        watch: 'Urmărește',
        liveLabel: 'LIVE',
        nextLabel: 'URMEAZĂ',
        previousRadioShow: 'Emisiunea radio anterioară',
        nextRadioShow: 'Următoarea emisiune radio',
        duration: 'Durată',
        contentNotYetAvailable: 'Acest conținut nu este încă disponibil',
        watchMoments: 'Vizionează',
        listenLive: 'Ascultă Live',
        listenNext: 'Ascultă următorul episod',
        recentEpisodes: 'Episoade recente',
        podcastExternalLinks: 'Acest podcast este disponibil și pe plaforma ',
        download: 'Descarcă',
        closeVideo: 'Închide',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Legendă video, ',
          text: 'Atenție: Conținutul provenit de la terți poate conține reclame',
          articleText:
            'BBC nu este responsabil pentru conținutul altor site-uri.',
          articleAdditionalText:
            'Conținutul provenind de la %provider_name% poate conține reclame.',
        },
        fallback: {
          text: 'Acest conținut nu este disponibil',
          linkText: 'Vezi acest conținut pe %provider_name%',
          linkTextSuffixVisuallyHidden: ', extern',
          warningText:
            'BBC nu este responsabil pentru conținutul altor site-uri.',
        },
        skipLink: {
          text: 'Sari peste conținutul furnizat de %provider_name%',
          endTextVisuallyHidden:
            'Sfârșitul conținutului furnizat de %provider_name%',
        },
        consentBanner: {
          heading: 'Permite conținutul furnizat de [social_media_site] ?',
          body: "Acest articol conține conținut furnizat de [social_media_site]. Îți solicităm permisiunea înainte de a încărca acest element, deoarece este posibil să utilizeze cookie-uri și alte tipuri de tehnologii. Îți recomandăm să citești [link] politica privind cookie-urile [/link] și [link] politica de confidențialitate [/link] a [social_media_site] înainte de a accepta. Pentru a vizualiza acest conținut, alege 'Acceptă și continuă'.",
          button: 'Acceptă și continuă',
        },
      },
      include: {
        errorMessage:
          'Ne pare rău, nu putem afișa această parte a articolului pe această pagină mobilă de tip lite.',
        linkText:
          'Vizualizează versiunea completă a paginii pentru a vedea tot conținutul.',
      },
      topStoriesTitle: 'Știrile zilei',
      latestMediaTitle: 'Ultimele clipuri',
      featuresAnalysisTitle: 'Citește mai multe',
      ugc: {
        noJsHeading: 'Ne pare rău, această pagină nu poate fi încărcată.',
        noJsDescription:
          'Pentru a reda acest conținut, te rugăm să activezi JavaScript sau să încerci alt browser.',
        optional: 'opțional',
        fileUploadLiveRegionText: 'Actualizare, iată ce trimiți: ',
        fileUploadLiveRegionUpdateText: 'Actualizare, eliminată',
        fileUploadButton: 'Alege un fișier',
        fileUploadListHeading: 'Iată ce trimiți: ',
        fileUploadRemoveButton: 'Elimină',
        submitButton: 'Trimite',
        errorSummary: 'Există o problemă, te rog să verifici:',
        validationRequired: 'Lipsește ceva.',
        validationInvalidEmail:
          'Nu pare corect. Introdu o adresă corectă de e-mail.',
        validationInvalidTelephone:
          'Nu pare corect. Introdu un număr corect de telefon.',
        validationFilesNotEnough:
          'Nu sunt suficiente fișiere. Te rog să adaugi cel puțin {{minFiles}}',
        validationFilesTooMany:
          'Sunt prea multe fișiere. Poți adăuga {{maxFiles}}.',
        validationFilesInvalidType:
          'Din păcate nu putem folosi acest tip de fișier. Te rugăm să adaugi {{fileTypes}}.',
        validationFilesTooSmall:
          'Acest fișier este corupt. Încearcă să alegi altul.',
        validationFilesSizeExceeded:
          'Ne pare rău, aceste fișiere sunt prea mari. Poți încărca doar până la 1,2 GB odată.',
        validationWordLimit: 'Maximum {{wordLimit}} cuvinte',
        referenceNumber: 'Număr de referință',
        submissionInfoSignedOutMessage: 'Notează aceste detalii ca referință.',
        retentionPeriodDays:
          'Vom păstra informațiile trimise de tine timp de până la {{days}} zile – iar dacă nu le folosim, le vom șterge împreună cu orice alte informații pe care ni le-ai trimis.',
        privacyInfoHtml:
          'Nici o grijă, îți protejăm informațiile — citește {{privacyInfoLink}} pentru mai multe detalii.',
        emailToHtml:
          'Dacă te razgândești și nu dorești să le folosim, trimite-ne un e-mail la adresa {{emailLink}}. Nu uita numărul de referință.',
        removalGuidelineText:
          'Dacă ne-ai trimis o contribuție pentru un program radio/TV sau pentru site-ul online, nu vom putea elimina acel element odată ce îl folosim.',
        dataPolicyHeading: 'Politica noastră de protecție a datelor',
        uploadingHeading: 'În curs de încărcare',
        uploadingDescription:
          'Te rugăm să aștepți până la încheierea procesului.',
        successHeading: 'Mesajul a fost expediat.',
        successDescription: 'Mulțumesc că ne-ai contactat.',
        privacyPolicyLinkHref: 'https://www.bbc.com/privacy/',
        privacyPolicyLinkText: 'Politica de confidențialitate',
        errorHeading: 'Ne pare rău, mesajul tău nu a putut fi trimis.',
        errorDescription: 'Te rugăm să încerci din nou mai târziu.',
        closedHeading: 'Această campanie s-a încheiat.',
        closedDescription: 'Campania s-a încheiat la data {{date}}.',
      },
    },
    mostRead: {
      header: 'Cele mai populare',
      lastUpdated: 'Ultima actualizare:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
      frequenciesPageUrl: '',
      frequenciesPageLabel: 'Frecvențele și emisiunile noastre de știri',
      header: 'Emisiuni radio',
      durationLabel: 'Durată %duration%',
    },
    recommendations: {
      skipLink: {
        text: 'Sari %title% și continuă să citești',
        endTextVisuallyHidden: 'Sfârșitul %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'De ce poți avea încredere în BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Aflați mai multe despre politica noastră privind utilizarea link-urilor externe',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Termeni de utilizare',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc/',
          text: 'Despre BBC',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Politica de confidențialitate',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/accessibility/',
          text: 'Contactează BBC',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'BBC News în alte limbi',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Nu distribui și nu vinde informațiile mele',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC nu este responsabil de conținutul altor site-uri.',
    },
    timezone: 'Europe/Bucharest',
    navigation: [
      {
        title: 'Home',
        url: '/news',
      },
      {
        title: 'UK',
        url: '/news/uk',
      },
      {
        title: 'World',
        url: '/news/world',
      },
      {
        title: 'Business',
        url: '/news/business',
      },
      {
        title: 'Politics',
        url: '/news/politics',
      },
      {
        title: 'Tech',
        url: '/news/technology',
      },
      {
        title: 'Science',
        url: '/news/science_and_environment',
      },
      {
        title: 'Health',
        url: '/news/health',
      },
      {
        title: 'Family & Education',
        url: '/news/education',
      },
      {
        title: 'Entertainment & Arts',
        url: '/news/entertainment_and_arts',
      },
      {
        title: 'Stories',
        url: '/news/stories',
      },
    ],
  },
};

export default withContext(service);
