import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Asia/Istanbul';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/tr';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `tr`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Güncelleme',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-turkce',
    atiAnalyticsProducerId: '92',
    atiAnalyticsProducerName: 'TURKISH',
    useReverb: true,
    chartbeatDomain: 'turkish.bbc.co.uk', // this is meant to be different to the service name
    brandName: 'BBC News Türkçe',
    product: 'BBC News',
    serviceLocalizedName: 'Türkçe',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/turkce.png',
    defaultImageAltText: 'BBC News Türkçe',
    dir: `ltr`,
    externalLinkText: ', dış',
    imageCaptionOffscreenText: 'Fotoğraf altı yazısı, ',
    videoCaptionOffscreenText: 'Video altyazısı, ',
    audioCaptionOffscreenText: 'Ses dosyası altyazısı, ',
    defaultCaptionOffscreenText: 'Altyazı, ',
    imageCopyrightOffscreenText: 'Kaynak, ',
    locale: `tr-TR`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'tr',
    datetimeLocale: `tr-tr`,
    service: 'turkce',
    serviceName: 'News Türkçe',
    languageName: 'Turkish',
    twitterCreator: '@bbcturkce',
    twitterSite: '@bbcturkce',
    noBylinesPolicy:
      'https://www.bbc.com/turkce/kurumsal-50221017#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/turkce/kurumsal-50221017',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/turkce/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Haberler',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'Önceki',
        nextPage: 'Sonraki',
        pageXOfY: 'Page {x} / {y}',
      },
      ads: {
        advertisementLabel: 'Reklam',
      },
      recommendationTitle: 'Önerilen haberler',
      splitRecommendationTitle: 'Daha fazla önerilen hikaye',
      seeAll: 'Hepsini görüntüle',
      home: 'Ana sayfa',
      currentPage: 'Bulunduğunuz sayfa',
      skipLinkText: 'İçeriğe götür',
      relatedContent: 'İlgili haberler',
      relatedTopics: 'İlgili Konular',
      navMenuText: 'Kategoriler',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Canlı',
        liveCoverage: 'Canlı yayın',
        breaking: 'Son dakika',
        postedAt: 'Basım saati',
        summary: 'Özet',
        shareButtonText: 'Paylaş',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Özet',
      error: {
        404: {
          statusCode: '404',
          title: 'Sayfa bulunamadı',
          message:
            'Üzgünüz aradığınız sayfayı görüntüleyemiyoruz. Lütfen şunları deneyin:',
          solutions: [
            'URL uzantısına çift tıklayın',
            'Tarayıcınızın yenile butonuna basın',
            'BBC arama çubuğunu kullanarak bu sayfayı arayın',
          ],
          callToActionFirst: 'Alternatif olarak ana sayfaya dönün ',
          callToActionLinkText: 'BBC News Türkçe',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/turkce',
        },
        500: {
          statusCode: '500',
          title: 'İç sunucu hatası',
          message:
            'Üzgünüz aradığınız sayfayı görüntüleyemiyoruz. Lütfen şunları deneyin:',
          solutions: [
            'Tarayıcınızın yenile butonuna basın',
            'Daha sonra tekrar deneyin',
          ],
          callToActionFirst: 'Alternatif olarak ana sayfaya dönün ',
          callToActionLinkText: 'BBC News Türkçe',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/turkce',
        },
      },
      byline: {
        articleInformation: 'Haber bilgisi',
        author: 'Yazan',
        listItemImage: 'Muhabir görseli',
        published: 'Yayın tarihi',
        reportingFrom: 'Bildirdiği yer',
        role: 'Unvan',
      },
      consentBanner: {
        privacy: {
          title: 'Gizlilik ve çerez politikamızı güncelledik',
          description: {
            uk: {
              first:
                'Gizlilik ve çerez politikalarımız konusunda bazı önemli değişiklikler yaptık. Bu değişikliklerin ne olduğunu ve sizin için ne anlama geldiğini bilmenizi istiyoruz.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Gizlilik ve çerez politikalarımız konusunda bazı önemli değişiklikler yaptık. Bu değişikliklerin ne olduğunu ve sizin için ne anlama geldiğini bilmenizi istiyoruz.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Tamam',
          reject: 'Neler değişti?',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Veri toplanmaya izin ver ve devam et',
            reject: 'Veri toplamayı reddet ve devam et',
            initial: {
              title:
                'AMP ile veri toplamaya onay verip vermediğinizi bize bildirin.',
              description: {
                first: 'Biz ve ortaklarımız ',
                linkText: 'çerezleri gibi',
                last: ' teknolojiler kullanıyoruz ve size en iyi çevrimiçi hizmeti sunabilmek adına internet tarama verilerini topluyoruz. Bu yolla içerik ve reklamları kişiselleştiriyoruz. Eğer kabul ediyorsanız lütfen bizi bilgilendirin.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Ayarlarımı yönet',
            },
            manage: {
              title: 'AMP ayarlarını yönet',
              description: {
                para1:
                  'Bu ayarlar sadece hızlandırılmış mobil sayfalar (AMP) için geçerli. Eğer AMP özelliği olmayan bir BBC sayfasını ziyaret ederseniz bu seçimleri yeniden yapmanız istenebilir.',
                para2:
                  'Ziyaret ettiğiniz mobil sayfa, Google AMP teknolojisi kullanılarak geliştirilmiştir.',
                heading2: 'Zorunlu veri toplama',
                para3:
                  'İnternet sayfalarımızın düzgün çalışabilmesi için sizin rıcanız olmadan sınırlı düzeyde veri toplamamız gerekiyor.',
                para4: {
                  text: 'Sayfalarımızın çalışması için gereken veri toplama süreci hakkında detaylı bilgi almak için tıklayın.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Lokal veri saklama yöntemi ile vermiş olduğunuz izinlerin bilgilerini telefonunuzda saklıyoruz.',
                heading3: 'Tercihe dayalı veri toplama',
                para6:
                  'AMP üzerinden veri toplamaya izin verdiğinizde kişiselleştirilmiş reklamların sunulmasına onay vermiş oluyorsunuz.',
                para7: {
                  text: "BBC'nin ve reklam ortaklarının kişiselleştirilmiş reklamları nasıl oluşturduğunu okumak için tıklayın.",
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  "Kişiselleştirilmiş reklamları görmek istemiyorsanız 'Veri toplamayı reddet ve devam et' seçeneğini tıklayabilirsiniz. Yine de reklamları görmeye devam edeceksiniz ancak bu reklamlar kişiselleştirilmemiş olacak.",
                para9:
                  "Ayarları 'Reklam seçenekleri/Verilerimi satma' seçeneği altında dilediğiniz zaman değiştirebilirsiniz.",
              },
            },
          },
          canonical: {
            title: 'Çerez politikasını onayladığınızı bize iletin',
            description: {
              uk: {
                first: 'Size en iyi çevrimiçi deneyimi sunabilmek için ',
                linkText: 'çerezler',
                last: ' ullanıyoruz. Çerezleri kabul ediyorsanız lütfen bizi bilgilendirin.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Size en iyi çevrimiçi deneyimi sunabilmek için ',
                linkText: 'çerezler',
                last: ' ullanıyoruz. Çerezleri kabul ediyorsanız lütfen bizi bilgilendirin.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Evet, kabul ediyorum',
            reject: 'Hayır, beni ayarlara götür',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Cihazınızda ses/video gösterim programı bulunamadı',
        contentExpired: 'Bu içerik artık oynatılabilir durumda değil.',
        contentNotYetAvailable: 'Bu program henüz oynatılmaya hazır değil.',
        audio: 'Ses dosyası',
        photogallery: 'Fotoğraf galerisi',
        video: 'Video',
        listen: 'Listen',
        watch: 'İzle',
        liveLabel: 'CANLI',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        recentEpisodes: 'Diğerleri',
        closeVideo: 'Çıkış',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Video altyazısı: ',
          text: 'Uyarı: Üçüncü tarafların sağladığı içerikte reklam bulunabilir.',
          articleText:
            'Uyarı: BBC üçüncü taraf sitelerin içeriğinden sorumlu değildir.',
          articleAdditionalText: '%provider_name% içerik reklam içerebilir',
        },
        fallback: {
          text: 'İçerik bulunamadı',
          linkText: 'Daha fazlası için %provider_name%',
          linkTextSuffixVisuallyHidden: ' Dış Link',
          warningText:
            'BBC, link verilen internet sitelerinin içeriğinden sorumlu değildir.',
        },
        skipLink: {
          text: '%provider_name% paylaşımını geçin',
          endTextVisuallyHidden: '%provider_name% paylaşımının sonu',
        },
        consentBanner: {
          heading: `[social_media_site] içeriğine izin veriyor musunuz?`,
          body: `Bu makalede [social_media_site] içeriği bulunmaktadır. Çerez ve diğer teknolojileri kullanıyor olabilirler, bilgisayarınıza herhangi bir şey yüklenmeden önce sizin rızanızı alırız. İzin vermeden önce çerez politikasını okumak ve gizlilik politikasına göz atmak isteyebilirsiniz. Bu içeriğe ulaşmak için lütfen "kabul et ve devam et" seçeneğine tıklayın.`,
          button: 'Kabul et ve devam et ',
        },
      },
      include: {
        errorMessage:
          'Maalesef haberin bu bölümünü mobil sayfada görüntüleyemiyoruz',
        linkText: 'Tüm içeriği görmek için sayfanın tüm sürümünü görüntüleyin ',
      },
      topStoriesTitle: 'Manşet haber',
      featuresAnalysisTitle: 'Seçtiklerimiz',
    },
    mostRead: {
      header: 'En çok okunanlar',
      lastUpdated: 'Son güncelleme:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Haberin başlığını atlayın ve okumaya devam edin',
        endTextVisuallyHidden: 'Haberin sonu',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/turkce/kurumsal-50221017',
        text: "Neden BBC'ye güvenebilirsiniz",
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Link verilen internet sitelerine yaklaşımımız.',
      },
      links: [
        {
          href: 'https://www.bbc.com/turkce/kurumsal-36765772',
          text: 'Kullanım koşulları',
        },
        {
          href: 'https://www.bbc.com/turkce/kurumsal-36765774',
          text: 'Gizlilik politikası',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Çerezler',
        },
        {
          href: 'https://www.bbc.co.uk/turkce/send/u50853841',
          text: "BBC'ye ulaş",
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Farklı dillerde BBC haberleri',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC, link verilen internet sitelerinin içeriğinden sorumlu değildir.',
    },
    timezone: 'Asia/Istanbul',
    navigation: [
      {
        title: 'Haberler',
        url: '/turkce',
      },
      {
        title: 'Türkiye',
        url: '/turkce/topics/ckdxn2xk95gt',
      },
      {
        title: 'Orta Doğu',
        url: '/turkce/topics/cg726y2qxg1t',
      },
      {
        title: 'Rusya-Ukrayna Savaşı',
        url: '/turkce/topics/cy0ryl4pvx6t',
      },
      {
        title: 'Ekonomi',
        url: '/turkce/topics/cg726y2k82dt',
      },
      {
        title: 'Sağlık',
        url: '/turkce/topics/cnq68n6wgzdt',
      },
      {
        title: 'Bilim',
        url: '/turkce/topics/c404v74nk56t',
      },
      {
        title: 'Teknoloji',
        url: '/turkce/topics/c2dwqnwkvnqt',
      },
    ],
  },
};

export default withContext(service);
