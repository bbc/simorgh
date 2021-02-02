import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '@bbc/psammead-styles/colours';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import {
  F_REITH_SANS_BOLD,
  F_REITH_SANS_BOLD_ITALIC,
  F_REITH_SANS_ITALIC,
  F_REITH_SANS_REGULAR,
  F_REITH_SERIF_MEDIUM,
  F_REITH_SERIF_MEDIUM_ITALIC,
  F_REITH_SERIF_LIGHT,
} from '@bbc/psammead-styles/fonts';
import { mundo as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/es';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `es`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Actualizado',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-mundo',
    atiAnalyticsProducerId: '62',
    chartbeatDomain: 'mundo.bbc.co.uk',
    brandName: 'BBC News Mundo',
    product: 'BBC News',
    serviceLocalizedName: 'Mundo',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
    defaultImageAltText: 'BBC News Mundo',
    dir: `ltr`,
    externalLinkText: ', externo',
    imageCaptionOffscreenText: 'Pie de foto, ',
    videoCaptionOffscreenText: 'Título del video, ',
    audioCaptionOffscreenText: 'Título del audio',
    defaultCaptionOffscreenText: 'Título, ',
    imageCopyrightOffscreenText: 'Fuente de la imagen, ',
    locale: `es-005`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'es',
    datetimeLocale: `es`,
    service: 'mundo',
    serviceName: 'News Mundo',
    languageName: 'Spanish',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcmundo',
    twitterSite: '@bbcmundo',
    noBylinesPolicy:
      'https://www.bbc.com/mundo/institucional-51359666#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/mundo/institucional-51359666',
    isTrustProjectParticipant: true,
    script: latinDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Noticias',
    iTunesAppId: 515255747,
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    translations: {
      ads: {
        advertisementLabel: 'Publicidad',
      },
      recommendationTitle: 'Quizás también te interese',
      seeAll: 'Ver todo',
      home: 'Página de inicio',
      currentPage: 'Página actual',
      skipLinkText: 'Ir al contenido',
      relatedContent: 'Contenido relacionado',
      navMenuText: 'Secciones',
      mediaAssetPage: {
        mediaPlayer: 'Reproductor multimedia',
        audioPlayer: 'Reproductor de audio',
        videoPlayer: 'Reproductor de video',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Página no encontrada',
          message:
            'Lo sentimos, no podemos llevarte a la página que buscas. Por favor, intenta lo siguiente:',
          solutions: [
            'Revisa la dirección URL',
            'Presiona el botón de actualizar en tu navegador',
            'Busca esta página a través de la barra de búsqueda de la BBC',
          ],
          callToActionFirst: 'Como alternativa, por favor visita la ',
          callToActionLinkText: 'portada de BBC News Mundo',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/mundo',
        },
        500: {
          statusCode: '500',
          title: 'Error interno del servidor',
          message:
            'Lo sentimos, actualmente no podemos llevarte a la página que buscas. Por favor, intenta:',
          solutions: [
            'Presiona el botón de actualizar en tu navegador',
            'Inténtalo más tarde',
          ],
          callToActionFirst: 'Como alternativa, por favor visita la ',
          callToActionLinkText: 'portada de BBC News Mundo',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/mundo',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'Accept data collection and continue',
            reject: 'Reject data collection and continue',
            initial: {
              title: 'Let us know you agree to data collection on AMP',
              description: {
                first: 'We and our partners use technologies, such as ',
                linkText: 'cookies',
                last:
                  ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Manage my settings',
            },
            manage: {
              title: 'Manage consent settings on AMP pages',
              description: {
                para1:
                  'These settings apply to AMP pages only. You may be asked to set these preferences again when you visit non-AMP BBC pages.',
                para2:
                  'The lightweight mobile page you have visited has been built using Google AMP technology.',
                heading2: 'Strictly necessary data collection',
                para3:
                  'To make our web pages work, we store some limited information on your device without your consent.',
                para4: {
                  text:
                    'Read more about the essential information we store on your device to make our web pages work.',
                  url:
                    'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'We use local storage to store your consent preferences on your device.',
                heading3: 'Optional data collection',
                para6:
                  'When you consent to data collection on AMP pages you are consenting to allow us to display personalised ads that are relevant to you when you are outside of the UK.',
                para7: {
                  text:
                    'Read more about how we personalise ads in the BBC and our advertising partners.',
                  url:
                    'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'You can choose not to receive personalised ads by clicking “Reject data collection and continue” below. Please note that you will still see advertising, but it will not be personalised to you.',
                para9:
                  'You can change these settings by clicking “Ad Choices / Do not sell my info” in the footer at any time.',
              },
            },
          },
          canonical: {
            title: 'Let us know you agree to cookies',
            description: {
              uk: {
                first: 'We use ',
                linkText: 'cookies',
                last:
                  ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'We and our partners use technologies, such as ',
                linkText: 'cookies',
                last:
                  ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Yes, I agree',
            reject: 'No, take me to settings',
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs:
          'Para ver este contenido, favor activar JavaScript, o intentar con otro navegador',
        contentExpired: 'Este contenido ya no está disponible.',
        contentNotYetAvailable: 'Este programa todavía no está disponible.',
        audio: 'Audio',
        photogallery: 'Galería de fotos',
        video: 'Video',
        listen: 'Escuchar',
        watch: 'Ver',
        liveLabel: 'EN VIVO',
        nextLabel: 'NEXT',
        previousRadioShow: 'Programa anterior',
        nextRadioShow: 'Próximo programa',
        duration: 'Duración',
        recentEpisodes: 'Más',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Título del video, ',
          text:
            'Advertencia: El contenido de sitios externos y terceras partes puede contener publicidad',
        },
        fallback: {
          text: 'Contenido no disponible',
          linkText: 'Ver más en %provider_name%',
          linkTextSuffixVisuallyHidden: ', externo',
          warningText:
            'La BBC no se hace responsable del contenido de sitios externos.',
        },
        skipLink: {
          text: 'Saltar contenido de %provider_name%',
          endTextVisuallyHidden: 'Fin del contenido de %provider_name%',
        },
      },
      include: {
        errorMessage:
          'Lo sentimos, no podemos mostrar esta parte de la historia en esta página adaptada para los dispositivos móviles.',
        linkText:
          'Ver la versión completa de la página para visualizar todo el contenido.',
      },
      topStoriesTitle: 'Principales noticias',
      featuresAnalysisTitle: 'No te lo pierdas',
    },
    brandSVG,
    mostRead: {
      header: 'Más leídas',
      lastUpdated: 'Última actualización:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Más vistos',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Saltar %title% y continuar leyendo',
        endTextVisuallyHidden: 'Final de %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/mundo/institucional-51359666',
        text: 'Por qué puedes confiar en la BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Lee sobre nuestra postura acerca de enlaces externos.',
      },
      links: [
        {
          href: 'https://www.bbc.com/mundo/institucional-36400005',
          text: 'Términos de uso',
        },
        {
          href: 'https://www.bbc.com/mundo/institucional-36400007',
          text: 'Sobre la BBC',
        },
        {
          href: 'https://www.bbc.com/mundo/institucional-36400009',
          text: 'Política de privacidad',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/send/u50853489',
          text: 'Contacta a la BBC',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. La BBC no se hace responsable del contenido de sitios externos.',
    },
    fonts: [
      F_REITH_SANS_BOLD,
      F_REITH_SANS_BOLD_ITALIC,
      F_REITH_SANS_ITALIC,
      F_REITH_SANS_REGULAR,
      F_REITH_SERIF_MEDIUM,
      F_REITH_SERIF_MEDIUM_ITALIC,
      F_REITH_SERIF_LIGHT,
    ],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Noticias',
        url: '/mundo',
      },
      {
        title: 'América Latina',
        url: '/mundo/america_latina',
      },
      {
        title: 'Internacional',
        url: '/mundo/internacional',
      },
      {
        title: 'EE.UU. 2020',
        url: '/mundo/noticias-internacional-53826365',
      },
      {
        title: 'Hay Festival',
        url: '/mundo/noticias-36795069',
      },
      {
        title: 'Economía',
        url: '/mundo/topics/ca170ae3-99c1-48db-9b67-2866f85e7342',
      },
      {
        title: 'Ciencia',
        url: '/mundo/topics/0f469e6a-d4a6-46f2-b727-2bd039cb6b53',
      },
      {
        title: 'Salud',
        url: '/mundo/topics/c4794229-7f87-43ce-ac0a-6cfcd6d3cef2',
      },
      {
        title: 'Cultura',
        url: '/mundo/topics/6a73afa3-ea6b-45c1-80bb-49060b99f864',
      },
      {
        title: 'Tecnología',
        url: '/mundo/topics/31684f19-84d6-41f6-b033-7ae08098572a',
      },
      {
        title: 'Video',
        url: '/mundo/media/video',
      },
      {
        title: 'Centroamérica Cuenta',
        url: '/mundo/noticias-43826245',
      },
    ],
  },
};

export default withContext(service);
