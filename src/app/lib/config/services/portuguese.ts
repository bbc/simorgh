import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/America/Sao_Paulo';
import '#psammead/psammead-locales/moment/pt-br';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `pt-BR`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Atualizado',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-portuguese',
    atiAnalyticsProducerId: '33',
    chartbeatDomain: 'brasil.bbc.co.uk', // this is meant to be different to the service name
    brandName: 'BBC News Brasil',
    product: 'BBC News',
    serviceLocalizedName: 'Brasil',
    defaultImage:
      'https://news.files.bbci.co.uk/include/articles/public/portuguese/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News Brasil',
    dir: `ltr`,
    externalLinkText: ', externo',
    imageCaptionOffscreenText: 'Legenda da foto, ',
    videoCaptionOffscreenText: 'Legenda do vídeo, ',
    audioCaptionOffscreenText: 'Legenda do áudio, ',
    defaultCaptionOffscreenText: 'Legenda, ',
    imageCopyrightOffscreenText: 'Crédito, ',
    locale: `pt-BR`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'pt',
    datetimeLocale: `pt-br`,
    service: 'portuguese',
    serviceName: 'News Brasil',
    languageName: 'Portuguese',
    twitterCreator: '@bbcbrasil',
    twitterSite: '@bbcbrasil',
    noBylinesPolicy:
      'https://www.bbc.com/portuguese/institutional-50054434#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/portuguese/institutional-50054434',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Notícias, vídeos, análise e contexto em português',
    passportHomes: ['brasil'],
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'Que História!',
      brandTitle: 'Que História!',
      brandDescription: 'A 3ª temporada com histórias reais incríveis',
      image: {
        src: 'https://ichef.bbc.co.uk/images/ic/$recipe/p0jfptnr.png',
        alt: 'Logo: Que História!',
      },
      linkLabel: {
        text: 'Episódios',
        href: 'https://www.bbc.com/portuguese/podcasts/p07r3r3t',
      },
      skipLink: {
        text: 'Pule %title% e continue lendo',
        endTextVisuallyHidden: 'Fim do %title%',
      },
    },
    translations: {
      pagination: {
        page: 'Página',
        previousPage: 'Anterior',
        nextPage: 'Próxima',
        pageXOfY: 'Página {x} de {y}',
      },
      ads: {
        advertisementLabel: 'Publicidade',
      },
      recommendationTitle: 'Matérias recomendadas',
      splitRecommendationTitle: 'Mais matérias recomendadas',
      seeAll: 'Ver todos',
      home: 'Início',
      currentPage: 'Página atual',
      skipLinkText: 'Vá para o conteúdo',
      relatedContent: 'Histórias relacionadas',
      relatedTopics: 'Tópicos relacionados',
      navMenuText: 'Seções',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Ao Vivo',
        liveCoverage: 'Cobertura ao Vivo',
        breaking: 'Urgente',
        postedAt: 'Publicado às',
        summary: 'Pontos-chave',
        shareButtonText: 'Compartilhar',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Pontos-chave',
      error: {
        404: {
          statusCode: '404',
          title: 'Página não encontrada',
          message:
            'Desculpe, mas não foi possível reproduzir a página solicitada. Tente:',
          solutions: [
            'Verificar a url',
            'Clicar no botão de atualização de página do seu navegador',
            'Buscar pela página solicitada utilizando a barra de busca da BBC',
          ],
          callToActionFirst: 'Ou, tente abrir a ',
          callToActionLinkText: 'página de início da BBC News Brasil',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/portuguese',
        },
        500: {
          statusCode: '500',
          title: 'Erro no servidor interno',
          message:
            'No momento não é possível reproduzir a página solicitada. Tente:',
          solutions: [
            'Clicar no botão de atualização de página do seu navegador',
            'Voltar mais tarde',
          ],
          callToActionFirst: 'Ou, tente abrir a ',
          callToActionLinkText: 'página de início da BBC News Brasil',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/portuguese',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Nós atualizamos nossa Política de Privacidade e Cookies',
          description: {
            uk: {
              first:
                'Nós fizemos importantes modificações nos termos de nossa Política de Privacidade e Cookies e gostaríamos que soubesse o que elas significam para você e para os dados pessoais que você nos forneceu.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Nós fizemos importantes modificações nos termos de nossa Política de Privacidade e Cookies e gostaríamos que soubesse o que elas significam para você e para os dados pessoais que você nos forneceu.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Saiba o que foi alterado',
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'Aceitar a coleta de dados e continuar',
            reject: 'Rejeitar a coleta de dados e continuar',
            initial: {
              title:
                'Diga-nos se concorda em ter seus dados coletados ao utilizar o AMP',
              description: {
                first: 'Nós e nossos parceiros utilizamos tecnologia do tipo ',
                linkText: 'cookies',
                last: ' e coletamos dados durante a navegação para lhe proporcionar a melhor experiência online e para personalizar o conteúdo e os anúncios publicitários que são exibidos para você. Diga-nos se concorda com o uso de todos estes tipos de cookies.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Administre minhas configurações',
            },
            manage: {
              title:
                'Administre as configurações de consentimento nas páginas AMP',
              description: {
                para1:
                  'Estas configurações se aplicam apenas às páginas AMP. Você poderá ter que configurar novamente suas preferências ao visitar páginas que não sejam do tipo AMP.',
                para2:
                  'A página móvel mais leve que você visitou foi criada com uso da tecnoclogia Google AMP.',
                heading2: 'Coleta de dados necessária',
                para3:
                  'Para que nossas páginas possam funcionar, nós armazenamos em seu dispositivo uma pequena quantidade de informação sem o seu consentimento.',
                para4: {
                  text: 'Leia mais sobre a informação essencial que foi armazenada no seu dispositivo para que nossas páginas possam funcionar.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Nós utilizamos capacidade local de armazenamento para guardar no seu dispositivo as preferências de seu consentimento.',
                heading3: 'Coleta de dados opcional',
                para6:
                  'Ao dar seu consentimento para a coleta de dados em páginas AMP você concorda que sejam exibidos anúncios comerciais personalizados relevantes a você ao acessar essas páginas fora do Reino Unido.',
                para7: {
                  text: 'Leia mais sobre como a BBC e seus parceiros comerciais personalisam anúncios comerciais.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Você pode escolher não receber anúncios comerciais personalizados ao clicar abaixo em "Rejeitar coleta de daos e continuar". Os anúncios comerciais ainda serão exibidos mas eles não serão personalizados.',
                para9:
                  'Você pode mudar essas configurações a qualquer momento clicando abaixo em "Escolha de Anúncios / Não venda minha informação".',
              },
            },
          },
          canonical: {
            title: 'Diga-nos se concorda com o uso de cookies',
            description: {
              uk: {
                first: 'Nós usamos ',
                linkText: 'cookies',
                last: ' para lhe proporcionar a melhor experiência online. Diga-nos se concorda com o uso de todos estes tipos de cookies.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Nós usamos ',
                linkText: 'cookies',
                last: ' para lhe proporcionar a melhor experiência online. Diga-nos se concorda com o uso de todos estes tipos de cookies.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Sim, concordo',
            reject: 'Não concordo, volte para Configurações',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'A reprodução deste formato de vídeo não é compatível com seu dispositivo',
        contentExpired: 'Este conteúdo não está mais disponível.',
        contentNotYetAvailable:
          'Este conteúdo ainda não está disponível para ser tocado.',
        audio: 'Áudio',
        photogallery: 'Galeria de fotos',
        video: 'Vídeo',
        listen: 'Listen',
        watch: 'Assista',
        listenLive: 'Ouça ao vivo',
        listenNext: 'Ouça o próximo',
        liveLabel: 'AO VIVO',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        recentEpisodes: 'Mais',
        podcastExternalLinks: 'O podcast está disponível em',
        download: 'Baixar episódio',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Legenda do vídeo, ',
          text: 'Alerta: Conteúdo de terceiros pode conter publicidade',
          articleText:
            'Alerta: A BBC não se responsabiliza pelo conteúdo de sites externos',
          articleAdditionalText:
            '%provider_name% conteúdo pode conter propaganda.',
        },
        fallback: {
          text: 'Conteúdo não disponível',
          linkText: 'Veja mais em %provider_name%',
          linkTextSuffixVisuallyHidden: ', externo',
          warningText:
            'A BBC não se responsabiliza pelo conteúdo de sites externos.',
        },
        skipLink: {
          text: 'Pule %provider_name% post',
          endTextVisuallyHidden: 'Final de %provider_name% post',
        },
        consentBanner: {
          heading: `Aceita conteúdo do [social_media_site]?`,
          body: `Este item inclui conteúdo extraído do [social_media_site]. Pedimos sua autorização antes que algo seja carregado, pois eles podem estar utilizando cookies e outras tecnologias. Você pode consultar a [link] política de uso de cookies [/link] e [link] os termos de privacidade [/link] do [social_media_site] antes de concordar. Para acessar o conteúdo clique em "aceitar e continuar".`,
          button: 'Aceite e continue',
        },
      },
      include: {
        errorMessage:
          'Desculpe, mas não é possível exibir esta parte da história nesta página de acesso resumido de celular.',
        linkText:
          'Acesse a visão integral da página para visualizar todo o conteúdo.',
      },
      topStoriesTitle: 'Principais notícias',
      featuresAnalysisTitle: 'Leia mais',
      latestMediaTitle: 'Mais recentes',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'opcional',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'O que você está uploading:',
        fileUploadButton: 'Selecione um arquivo',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'Enviar',

        // Validation
        validationRequired: 'Falta alguma coisa.',
        validationInvalidEmail:
          'Algo não está correto. Digite um endereço de email válido.',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'O número de arquivos não é suficiente. Adicione pelo menos {{minFiles}} arquivos.',
        validationFilesTooMany:
          'Existem muitos arquivos. Você pode adicionar até {{maxFiles}} arquivos.',
        validationFilesInvalidType:
          'Esse tipo de arquivo não pode ser utilizado. Adicionar {{fileTypes}}.',
        validationFilesTooSmall:
          'Este arquivo está corrompido. Tente escolher outro arquivo.',
        validationFilesSizeExceeded:
          'Estes arquivos são muito grandes. Você só pode fazer upload de até 1,2GB de cada vez.',
        validationWordLimit: 'Máximo de {{wordLimit}} palavras',

        // Messaging
        retentionPeriodDays: undefined,
        referenceNumber: 'Número de referência',
        submissionInfoSignedOutMessage:
          'Você deve anotar esses detalhes para sua referência.',
        privacyInfoHtml:
          'Não se preocupe, nós protegemos seus dados pessoais — para maiores detalhes, leia {{privacyInfoLink}}.',
        emailToHtml:
          'Envie email para {{emailLink}} caso você mude de ideia. Mencione o número de referência e diga apenas que você não quer que o material seja utilizado.',
        removalGuidelineText: undefined,

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'Uploading seus arquivos...',
        uploadingDescription: 'Aguarde até finalizar.',

        // Success Screen
        successHeading: 'Mensagem enviada',
        successDescription: 'Obrigado por entrar em contato.',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'Sua mensagem não foi enviada',
        errorDescription: 'Tente enviar novamente.',

        // Closed Screen
        closedHeading: 'Está encerrado',
        closedDescription: 'Foi encerrado em {{date}}.',
      },
    },
    mostRead: {
      header: 'Mais lidas',
      lastUpdated: 'Última atualização:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Pule %title% e continue lendo',
        endTextVisuallyHidden: 'Fim do %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/portuguese/institutional-50054434',
        text: 'Por que você pode confiar na BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Leia sobre nossa política em relação a links externos.',
      },
      links: [
        {
          href: 'https://www.bbc.com/portuguese/institutional-36202448',
          text: 'Termos de Uso',
        },
        {
          href: 'https://www.bbc.com/portuguese/institutional-36202452',
          text: 'Sobre a BBC',
        },
        {
          href: 'https://www.bbc.com/portuguese/institutional-36202454',
          text: 'Política de privacidade',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/portuguese/send/u50853599',
          text: 'Contate a BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. A BBC não se responsabiliza pelo conteúdo de sites externos.',
    },
    timezone: 'America/Sao_Paulo',
    navigation: [
      {
        title: 'Notícias',
        url: '/portuguese',
      },
      {
        title: 'Brasil',
        url: '/portuguese/topics/cz74k717pw5t',
      },
      {
        title: 'Eleições EUA',
        url: '/portuguese/topics/c30gn378n6kt',
      },
      {
        title: 'Internacional',
        url: '/portuguese/topics/cmdm4ynm24kt',
      },
      {
        title: 'Economia',
        url: '/portuguese/topics/cvjp2jr0k9rt',
      },
      {
        title: 'Saúde',
        url: '/portuguese/topics/c340q430z4vt',
      },
      {
        title: 'Ciência',
        url: '/portuguese/topics/cr50y580rjxt',
      },
      {
        title: 'Tecnologia',
        url: '/portuguese/topics/c404v027pd4t',
      },
      {
        title: 'Vídeos',
        url: '/portuguese/topics/c9y2j35dn2zt',
      },
      {
        title: 'BBC Lê',
        url: '/portuguese/topics/cxndrr1qgllt',
      },
    ],
  },
};

export default withContext(service);
