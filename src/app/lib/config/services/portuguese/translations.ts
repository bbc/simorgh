export default {
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
          title: 'Administre as configurações de consentimento nas páginas AMP',
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
      articleAdditionalText: '%provider_name% conteúdo pode conter propaganda.',
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
};
