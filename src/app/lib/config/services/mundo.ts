import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/es';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
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
    twitterCreator: '@bbcmundo',
    twitterSite: '@bbcmundo',
    noBylinesPolicy:
      'https://www.bbc.com/mundo/institucional-51359666#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/mundo/institucional-51359666',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Noticias',
    iTunesAppId: 515255747,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Página',
        previousPage: 'Anterior',
        nextPage: 'Siguiente',
        pageXOfY: 'Página {x} de {y}',
      },
      ads: {
        advertisementLabel: 'Publicidad',
      },
      recommendationTitle: 'Recomendamos',
      splitRecommendationTitle: 'Más recomendaciones',
      seeAll: 'Ver todo',
      home: 'Página de inicio',
      currentPage: 'Página actual',
      skipLinkText: 'Ir al contenido',
      relatedContent: 'Contenido relacionado',
      relatedTopics: 'Temas relacionados',
      navMenuText: 'Secciones',
      mediaAssetPage: {
        mediaPlayer: 'Reproductor multimedia',
        audioPlayer: 'Reproductor de audio',
        videoPlayer: 'Reproductor de video',
      },
      liveExperiencePage: {
        liveLabel: 'En vivo',
        liveCoverage: 'Cobertura en vivo',
        breaking: 'Último momento',
        postedAt: 'Publicado',
        summary: 'Puntos clave',
        shareButtonText: 'Compartir',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Sumario',
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
      byline: {
        articleInformation: 'Información del artículo',
        author: 'Autor',
        listItemImage: 'Imagen del autor',
        published: 'Fecha de publicación',
        reportingFrom: 'Informa desde',
        role: 'Título del autor',
      },
      consentBanner: {
        privacy: {
          title: 'Hemos actualizado nuestra política de privacidad y cookies',
          description: {
            uk: {
              first:
                'Hemos realizado cambios importantes a nuestra política de privacidad y cookies y queremos que sepas lo que esto significa para ti y tus datos.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Hemos realizado cambios importantes a nuestra política de privacidad y cookies y queremos que sepas lo que esto significa para ti y tus datos.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ok',
          reject: 'Descubre lo que ha cambiado',
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'Aceptar la recopilación de datos y continuar.',
            reject: 'Rechazar la recopilación de datos y continuar.',
            initial: {
              title:
                'Déjanos saber que aceptas la recopilación de datos en AMP',
              description: {
                first:
                  'Nosotros y nuestros socios usamos tecnologías, como las ',
                linkText: 'cookies',
                last: ', y recogemos datos de búsqueda para ofrecerte la mejor experiencia online y personalizar el contenido y la publicidad que se te muestra. Por favor, déjanos saber si estás de acuerdo.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Administrar mi configuración',
            },
            manage: {
              title:
                'Administrar la configuración de consentimiento en las páginas AMP',
              description: {
                para1:
                  'Esta configuración se aplica solo a las páginas AMP. Es posible que se te solicitemos establecer estas preferencias nuevamente cuando visites páginas de la BBC que no sean AMP.',
                para2:
                  'La página móvil liviana que has visitado se creó con la tecnología AMP de Google.',
                heading2: 'Recopilación de datos estrictamente necesaria',
                para3:
                  'Para que nuestras páginas web funcionen, almacenamos cierta información limitada en tu dispositivo sin tu consentimiento.',
                para4: {
                  text: 'Lee más más sobre la información esencial que almacenamos en tu dispositivo para que nuestras páginas web funcionen (en inglés).',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Usamos almacenamiento local para guardar tus preferencias de consentimiento en tu dispositivo.',
                heading3: 'Recopilación de datos opcional',
                para6:
                  'Al dar tu consentimiento para la recopilación de datos en las páginas AMP, nos das tu consentimiento para mostrarte anuncios personalizados que sean relevantes para ti cuando te encuentras fuera de Reino Unido.',
                para7: {
                  text: 'Obtén más información sobre cómo personalizamos los anuncios en la BBC y sobre nuestros socios publicitarios (en inglés).',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Puedes optar por no recibir anuncios personalizados haciendo clic en "Rechazar la recopilación de datos y continuar". Ten en cuenta que seguirás viendo publicidad, pero no se personalizará para ti.',
                para9:
                  'Puedes cambiar esta configuración haciendo clic en "Ad Choices / Do not sell my info" ("Opciones de anuncios / No vender mi información") en la parte inferior de nuestra página en cualquier momento.',
              },
            },
          },
          canonical: {
            title: 'Déjanos saber si aceptas las cookies',
            description: {
              uk: {
                first: 'Usamos ',
                linkText: 'cookies',
                last: ' para ofrecerte la mejor experiencia online. Déjanos saber si aceptas todas estas cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Usamos ',
                linkText: 'cookies',
                last: ' para ofrecerte la mejor experiencia online. Déjanos saber si aceptas todas estas cookies.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Sí, estoy de acuerdo',
            reject: 'No, llévame a la configuración',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Para ver este contenido, favor activar JavaScript, o intentar con otro navegador',
        contentExpired: 'Este contenido ya no está disponible.',
        contentNotYetAvailable: 'Este programa todavía no está disponible.',
        audio: 'Audio',
        photogallery: 'Galería de fotos',
        video: 'Video',
        listen: 'Escuchar',
        watch: 'Ver',
        listenLive: 'Escuchar en vivo',
        listenNext: 'Escuchar el siguiente',
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
          text: 'Advertencia: El contenido de sitios externos y terceras partes puede contener publicidad',
          articleText:
            'Advertencia: La BBC no se hace responsable por el contenido de sitios externos.',
          articleAdditionalText:
            'Este contenido de %provider_name% puede contener publicidad.',
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
        consentBanner: {
          heading: '¿Permitir el contenido de [social_media_site]?',
          body: `Este artículo contiene contenido proporcionado por [social_media_site]. Solicitamos tu permiso antes de que algo  se cargue, ya que ese sitio  puede estar usando cookies y otras tecnologías. Es posible que quieras leer [link] política de cookies [/link] y [link] política de privacidad [/link] de [social_media_site] antes de aceptar. Para ver este contenido, selecciona 'aceptar y continuar'.`,
          button: 'Aceptar y continuar',
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
      latestMediaTitle: 'Más videos',
      ugc: {
        // No JavaScript
        noJsHeading: 'Disculpa, página no encontrada',
        noJsDescription:
          'Para cargar esta página, por favor habilita JavaScript o intenta con otro navegador',

        // Optional
        optional: 'opcional',

        // File upload
        fileUploadLiveRegionText: 'Esto es lo que estás enviando:',
        fileUploadLiveRegionUpdateText: 'Eliminado',
        fileUploadListHeading: 'Esto es lo que estás enviando:',
        fileUploadButton: 'Selecciona un archivo',
        fileUploadRemoveButton: 'Selecciona un archivo',

        // Submit button
        submitButton: 'Enviar',

        // Validation
        validationRequired: 'Algo está faltando.',
        validationInvalidEmail:
          'Algo no luce bien. Por favor, introduce una dirección de correo electrónico correcta.',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'No hay suficientes archivos. Por favor añade al menos {{minFiles}}.',
        validationFilesTooMany:
          'Hay demasiados archivos. Puedes añadir {{maxFiles}}. ',
        validationFilesInvalidType:
          'Disculpa, no podemos utilizar este tipo de archivo. Por favor, utiliza {{fileTypes}}.',
        validationFilesTooSmall:
          'Este archivo no es correcto. Intenta seleccionar otro.',
        validationFilesSizeExceeded:
          'Disculpa, estos archivos son muy pesados. Solo puedes cargar hasta 1,2 GB a la vez.',
        validationWordLimit: 'Máximo {{wordLimit}} palabras.',

        // Messaging
        removalGuidelineText:
          'Si has enviado algo para un programa o en línea, no podremos eliminarlo una vez que lo usemos.',
        retentionPeriodDays:
          'Mantendremos tu envío durante {{days}} días y si no lo usamos, lo eliminaremos junto con la demás información que nos enviaste.',
        referenceNumber: 'Número de referencia',
        submissionInfoSignedOutMessage:
          'Quizás quieres tomar nota de estos detalles para futura referencia.',
        privacyInfoHtml:
          'No te preocupes, tu información está protegida. Lee nuestra {{privacyInfoLink}} para más detalles.',
        emailToHtml:
          'Escribe a {{emailLink}} si cambiaste de opinión. Incluye el número de referencia y simplemente déjanos saber que ya no quieres que usemos tu contribución.',

        // Form Screen
        dataPolicyHeading: 'Nuestra política de manejo de datos',

        // Uploading Screen
        uploadingHeading: 'Subiendo tus archivos...',
        uploadingDescription: 'Por favor, espera hasta que haya finalizado.',
        // Success Screen
        successHeading: 'Mensaje enviado',
        successDescription: 'Gracias por contactarnos.',
        privacyPolicyLinkHref:
          'https://www.bbc.com/mundo/institucional-36400009',
        privacyPolicyLinkText: 'Política de privacidad',

        // Error Screen
        errorHeading: 'Disculpa, hubo un problema al subir esto.',
        errorDescription: 'Por favor, regresa e inténtalo más tarde.',

        // Closed Screen
        closedHeading: 'Esta convocatoria ya está cerrada.',
        closedDescription: 'Esto cierra el {{date}}.',
      },
    },
    mostRead: {
      header: 'Más leídas',
      lastUpdated: 'Última actualización:',
      numberOfItems: 10,
      hasMostRead: true,
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
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.co.uk/mundo/send/u50853489',
          text: 'Escribe a BBC Mundo',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. La BBC no se hace responsable del contenido de sitios externos.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Noticias',
        url: '/mundo',
      },
      {
        title: 'América Latina',
        url: '/mundo/topics/c7zp57yyz25t',
      },
      {
        title: 'Internacional',
        url: '/mundo/topics/c2lej05epw5t',
      },
      {
        title: 'Elecciones EE.UU. 2024',
        url: '/mundo/topics/c1v8en6r2qgt',
      },
      {
        title: 'Hay Festival',
        url: '/mundo/topics/cr50y7p7qyqt',
      },
      {
        title: 'Economía',
        url: '/mundo/topics/c06gq9v4xp3t',
      },
      {
        title: 'Ciencia',
        url: '/mundo/topics/ckdxnw959n7t',
      },
      {
        title: 'Salud',
        url: '/mundo/topics/cpzd498zkxgt',
      },
      {
        title: 'Cultura',
        url: '/mundo/topics/c2dwq9zyv4yt',
      },
      {
        title: 'Tecnología',
        url: '/mundo/topics/cyx5krnw38vt',
      },
      {
        title: 'Centroamérica Cuenta',
        url: '/mundo/topics/c404v5z1k8wt',
      },
    ],
  },
};

export default withContext(service);
