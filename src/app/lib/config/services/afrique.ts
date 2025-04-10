import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/fr';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `fr`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Mise à jour',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-afrique',
    atiAnalyticsProducerId: '3',
    atiAnalyticsProducerName: 'AFRIQUE',
    useReverb: true,
    chartbeatDomain: 'afrique.bbc.co.uk',
    brandName: 'BBC News Afrique',
    product: 'BBC News',
    serviceLocalizedName: 'Afrique',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/afrique.png',
    defaultImageAltText: 'BBC News Afrique',
    dir: `ltr`,
    externalLinkText: ', externe',
    imageCaptionOffscreenText: 'Légende image, ',
    videoCaptionOffscreenText: 'Légende vidéo, ',
    audioCaptionOffscreenText: 'Légende audio, ',
    defaultCaptionOffscreenText: 'Légende, ',
    imageCopyrightOffscreenText: 'Crédit photo, ',
    locale: `fr`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'fr',
    datetimeLocale: `fr`,
    service: 'afrique',
    serviceName: 'Afrique',
    languageName: 'French',
    twitterCreator: '@bbcafrique',
    twitterSite: '@bbcafrique',
    noBylinesPolicy:
      'https://www.bbc.com/afrique/institutionelles-49283281#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/afrique/institutionelles-49283281',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/afrique/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Accueil',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Page',
        previousPage: 'Page précédente',
        nextPage: 'Page suivante',
        pageXOfY: 'Page {x} de {y}',
      },
      ads: {
        advertisementLabel: 'Publicités',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: 'Tout voir',
      home: 'Accueil',
      currentPage: 'Page en cours',
      skipLinkText: 'Aller au contenu',
      relatedContent: 'Lire plus',
      relatedTopics: 'Sujets associés',
      navMenuText: 'Rubriques',
      mediaAssetPage: {
        mediaPlayer: 'Lecteur média',
        audioPlayer: 'Lecteur audio',
        videoPlayer: 'Lecteur vidéo',
      },
      liveExperiencePage: {
        liveLabel: 'En direct',
        liveCoverage: 'En direct',
        breaking: 'Urgent',
        postedAt: 'Posté à',
        summary: 'Points clés',
        shareButtonText: 'Partager',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Points clés',
      error: {
        404: {
          statusCode: '404',
          title: 'La page ne peut pas être trouvée',
          message:
            "Désolé, nous ne pouvons pas afficher la page que vous cherchez. Essayez s'il vous plaît:",
          solutions: [
            "Double vérification de l'url",
            "Cliquez sur le bouton d'actualisation de votre navigateur",
            "Recherche de cette page à l'aide de la barre de recherche de la BBC",
          ],
          callToActionFirst:
            "Vous pouvez également consulter le page d'accueil du site ",
          callToActionLinkText: 'BBC News Afrique',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/afrique',
        },
        500: {
          statusCode: '500',
          title: 'Erreur interne du serveur',
          message:
            "Désolé, nous sommes actuellement dans l'impossibilité d'afficher la page que vous recherchez. Essayez s'il vous plaît:",
          solutions: [
            "Cliquez sur le bouton d'actualisation de votre navigateur",
            'Revenir plus tard',
          ],
          callToActionFirst:
            "Vous pouvez également consulter le page d'accueil du site ",
          callToActionLinkText: 'BBC News Afrique',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/afrique',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Nous avons mis à jour nos politiques de confidentialité et de cookies',
          description: {
            uk: {
              first:
                "Nous avons apporté d'importants changements à notre politique de confidentialité et de cookies et nous voulons que vous sachiez ce que cela signifie pour vous et vos données.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Nous avons apporté d'importants changements à notre politique de confidentialité et de cookies et nous voulons que vous sachiez ce que cela signifie pour vous et vos données.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Découvrez ce qui a changé',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Accepter la collecte de données et continuer.',
            reject: 'Rejeter la collecte de données et continuer.',
            initial: {
              title:
                "Faites nous savoir que vous êtes d'accord pour la collecte de données  sur cette page (AMP)",
              description: {
                first:
                  'Nous et nos partenaires utilisons des technologies, comme ',
                linkText: 'cookies',
                last: ", et collectons des données de navigation pour vous offrir la meilleure expérience en ligne et pour personnaliser le contenu et la publicité qui vous sont présentés. Veuillez nous faire savoir si vous êtes d'accord.",
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Gérer mes paramêtres',
            },
            manage: {
              title: 'Gérer les paramêtres de consentement sur les pages AMP',
              description: {
                para1:
                  "Ces paramêtres s'appliquent aux pages AMP seulement. On peut vous demander de définir ces préférences encore quand vous visitez une page non AMP de la BBC.",
                para2:
                  'La page mobile légère que vous avez visitée a été construite en utilisant la technologie AMP de Google.',
                heading2: 'Une collecte de données strictement nécessaire',
                para3:
                  'Pour que nos pages web fonctionnent, nous stockons certaines informations limitées sur votre appareil sans votre consentement.',
                para4: {
                  text: 'En savoir plus sur les informations essentielles que nous stockons sur votre appareil pour faire fonctionner nos pages web.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Nous utilisons le stockage local pour enregistrer vos préférences de consentement sur votre appareil.',
                heading3: 'Collecte de données optionnelles',
                para6:
                  'Lorsque vous consentez à la collecte de données sur les pages AMP, vous nous autorisez à afficher des publicités personnalisées qui vous concernent lorsque vous êtes en dehors du Royaume-Uni.',
                para7: {
                  text: 'En savoir plus sur la façon dont nous personnalisons les publicités à la BBC et chez nos partenaires publicitaires.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Vous pouvez choisir de ne pas recevoir d\'annonces personnalisées en cliquant sur "Refuser la collecte de données et continuer" ci-dessous. Veuillez noter que vous verrez toujours des annonces, mais qu\'elles ne seront pas personnalisées pour vous.',
                para9:
                  'Vous pouvez à tout moment modifier ces paramètres en cliquant sur "Choix de la publicité / Ne pas vendre mes informations" dans le pied de page.',
              },
            },
          },
          canonical: {
            title: 'Faites-nous savoir que vous acceptez les cookies',
            description: {
              uk: {
                first: 'Nous utilisons ',
                linkText: 'cookies',
                last: ' pour vous offrir la meilleur expérience en ligne. Veuillez nous faire savoir si vous acceptez tous ces cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Nous utilisons ',
                linkText: 'cookies',
                last: ' pour vous offrir la meilleur expérience en ligne. Veuillez nous faire savoir si vous acceptez tous ces cookies.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: "Oui, j'accepte",
            reject: 'Non, dirigez-moi vers les réglages',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Pour regarder ce contenu, veuillez activer JavaScript ou essayer un autre navigateur.',
        contentExpired: "Ce contenu n'est pas disponible",
        contentNotYetAvailable: 'Ce programme ne peut être joué maintenant.',
        audio: 'Audio',
        photogallery: 'Galerie de photos',
        video: 'Vidéo',
        bbc_afrique_radio: {
          title: 'BBC Afrique Radio',
          subtitle: 'Infos, musique et sports',
        },
        bbc_afrique_tv: {
          title: 'Cash Éco',
          subtitle:
            'Cash éco vous propose chaque jour un résumé de l’actualité économique et financière.',
        },
        listen: 'Ecoutez',
        watch: 'Suivez',
        listenLive: 'Suivre le direct',
        liveLabel: 'EN DIRECT',
        nextLabel: 'SUIVANT',
        previousRadioShow: 'Emission de radio précédente',
        nextRadioShow: 'Emission de radio suivante',
        duration: 'Durée',
        recentEpisodes: 'Editions Précédentes',
        closeVideo: 'Sortir',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Légende vidéo, ',
          text: 'Attention: le contenu externe peut contenir des messages publicitaires',
          articleText:
            "Attention: La BBC n'est pas responsable du contenu des sites externes.",
          articleAdditionalText:
            'Le contenu du site %provider_name% peut contenir des publicités.',
        },
        fallback: {
          text: "Ce contenu n'est pas disponible",
          linkText: 'Voir plus sur %provider_name%',
          linkTextSuffixVisuallyHidden: ', lien externe',
          warningText:
            "La BBC n'est pas responsable du contenu des sites externes.",
        },
        skipLink: {
          text: 'Ignorer %provider_name% publication',
          endTextVisuallyHidden: 'Fin de %provider_name% publication',
        },
        consentBanner: {
          heading: 'Autoriser le contenu de [social_media_site]?',
          body: `This article contains content provided by [social_media_site].  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read the [social_media_site] [link] cookie policy [/link] and [link] privacy policy [/link] before accepting. To view this content choose 'accept and continue'.`,
        },
      },
      include: {
        errorMessage: `Désolé, nous ne pouvons pas afficher cette partie de l'article sur cette page mobile légère.`,
        linkText:
          'Consultez la version complète de la page pour voir tout le contenu.',
      },
      topStoriesTitle: 'À la une',
      featuresAnalysisTitle: 'Le choix de la rédaction',
    },
    mostRead: {
      header: 'Les plus lus',
      lastUpdated: 'Dernière mise à jour:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Journaux et Magazines',
      durationLabel: 'Durée %duration%',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/afrique/institutionelles-49283281',
        text: 'Pourquoi vous pouvez faire confiance à BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Découvrez notre approche en matière de liens externes.',
      },
      links: [
        {
          href: 'https://www.bbc.com/afrique/institutionelles-36826639',
          text: "Conditions d'utilisation",
        },
        {
          href: 'https://www.bbc.com/afrique/institutionelles-36826641',
          text: 'A propos de la BBC',
        },
        {
          href: 'https://www.bbc.com/afrique/institutionelles-36826642',
          text: 'Politique de confidentialité',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/afrique/send/u50853159',
          text: 'Contactez la BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Autres langues',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. La BBC n'est pas responsable du contenu des sites externes.",
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Accueil',
        url: '/afrique',
      },
      {
        title: 'Conflit en RDC',
        url: '/afrique/topics/cge72ry253jt',
      },
      {
        title: 'Ecoutez en direct',
        url: '/afrique/bbc_afrique_radio/liveradio',
      },
      {
        title: 'Afrique',
        url: '/afrique/topics/cvqxn2k7kv7t',
      },
      {
        title: 'Monde',
        url: '/afrique/topics/cvqxn21vx11t',
      },
      {
        title: 'Santé',
        url: '/afrique/topics/c06gq9jxz3rt',
      },
      {
        title: 'Science et technologie',
        url: '/afrique/topics/crezq2zk0q4t',
      },
      {
        title: 'Economie',
        url: '/afrique/topics/cnq687nr9v1t',
      },
      {
        title: 'Culture',
        url: '/afrique/topics/cnq687nrrw8t',
      },
      {
        title: 'Vidéos',
        url: '/afrique/topics/cz4vn9gyd6rt',
      },
      {
        title: 'Nos émissions',
        url: '/afrique/topics/c88nzggm8gxt',
      },
    ],
  },
};

export default withContext(service);
