import '#psammead/moment-timezone-include/tz/Asia/Baku';
import '#psammead/psammead-locales/moment/az';
import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `az`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Yeniləndi',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-azeri',
    atiAnalyticsProducerId: '6',
    chartbeatDomain: 'azeri.bbc.co.uk',
    brandName: 'BBC News Azərbaycanca',
    product: 'BBC News',
    serviceLocalizedName: 'Azərbaycanca',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/azeri.png',
    defaultImageAltText: 'BBC News Azərbaycanca',
    dir: `ltr`,
    externalLinkText: ', BBC-dən kənar',
    imageCaptionOffscreenText: 'Şəklin alt yazısı, ',
    videoCaptionOffscreenText: 'Videonun alt yazısı, ',
    audioCaptionOffscreenText: 'Audionun alt yazısı, ',
    defaultCaptionOffscreenText: 'Altyazı, ',
    imageCopyrightOffscreenText: 'Şəklin mənbəyi, ',
    locale: `az-AZ`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'az',
    datetimeLocale: `az`,
    service: 'azeri',
    serviceName: 'Azərbaycanca',
    languageName: 'Azerbaijani',
    twitterCreator: '@bbcazeri',
    twitterSite: '@bbcazeri',
    noBylinesPolicy:
      'https://www.bbc.com/azeri/institutional-49283479#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/azeri/institutional-49283479',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Xəbərlər, Qaynar Xəbərlər, Analiz, Video',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'səhifə',
        previousPage: 'Geriyə',
        nextPage: 'Növbəti',
        pageXOfY: 'səhifə {x} haqqında {y}',
      },
      ads: {
        advertisementLabel: 'Reklam',
      },
      seeAll: 'Hamısına baxın',
      home: 'Xəbərlər',
      currentPage: 'Hazırda olduğunuz səhifə',
      skipLinkText: 'Mətnə keçid',
      relatedContent: 'Bu barədə daha geniş',
      relatedTopics: 'Əlaqəli mövzular',
      navMenuText: 'Bölümlər',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Canlı',
        liveCoverage: 'Canlı reportaj',
        breaking: 'Təcili xəbər',
        postedAt: 'Xəbərin vaxtı',
        summary: 'Xülasə',
        shareButtonText: 'Paylaş',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Xülasə',
      error: {
        404: {
          statusCode: '404',
          title: 'Səhifəni tapmaq mümkün deyil',
          message:
            'Bağışlayın, axtardığınız səhifəni sizə çatdırmaq imkanında deyilik. Lütfən, cəhd edin:',
          solutions: [
            'URL ünvanının təkrar yoxlanması',
            'Brauzerinizdə yeniləmə düyməsinin basılması',
            'BBC-nin axtarış alətindən istifadə edərək bu səhifənin axtarılması',
          ],
          callToActionFirst: 'Əks halda, lütfən, ',
          callToActionLinkText: 'BBC News Azərbaycanca baş səhifəsinə',
          callToActionLast: ' keçin',
          callToActionLinkUrl: 'https://www.bbc.com/azeri',
        },
        500: {
          statusCode: '500',
          title: 'Daxili server səhvi',
          message:
            'Bağışlayın, hazırda axtardığınız səhifəni sizə çatdırmaq imkanında deyilik. Lütfən, cəhd edin:',
          solutions: [
            'Brauzerinizdə yeniləmə düyməsinin basılması',
            'Sonra təkrar qayıtma',
          ],
          callToActionFirst: 'Əks halda, lütfən, ',
          callToActionLinkText: 'BBC News Azərbaycanca baş səhifəsinə',
          callToActionLast: ' keçin',
          callToActionLinkUrl: 'https://www.bbc.com/azeri',
        },
      },
      byline: {
        articleInformation: 'Məqalə barədə məlumat',
        author: 'Müəllif',
        listItemImage: 'Siyahı elementi, foto',
        published: 'Çap edildi',
        reportingFrom: 'Məkan',
        role: 'Vəzifə',
      },
      consentBanner: {
        privacy: {
          title: 'Biz Məxfilik və Kukilər (Cookies) Siyasətimizi yeniləmişik.',
          description: {
            uk: {
              first:
                'Biz Məxfilik və Kukilər Siyasətimizə bəzi mühüm dəyişiklər etmişik və bunun siz və sizə aid məlumatlar üçün nə demək olduğunu bilməyinizi istəyirik.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Biz Məxfilik və Kukilər Siyasətimizə bəzi mühüm dəyişiklər etmişik və bunun siz və sizə aid məlumatlar üçün nə demək olduğunu bilməyinizi istəyirik.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Nəyin dəyişdiyini öyrənin',
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'Məlumat toplanmasına razılaşın və davam edin',
            reject: 'Məlumat toplanmasını rədd edin və davam edin',
            initial: {
              title: 'AMP-də məlumat toplanmasına razı olduğunuzu bildirin',
              description: {
                first: 'Biz və partnyorlarımız ',
                linkText: 'kukilər',
                last: ' kimi texnologiyalardan istifadə edərək sizə ən yaxşı onlayn təcrübəni vermək, məzmunu və reklamları sizə uyğunlaşdırmaq üçün brauzerinizdən axtarış məlumatlarını toplayırıq. Buna razı olduğunuzu, lütfən, bizə bildirin.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Seçimlərimi idarə edin',
            },
            manage: {
              title: 'AMP səhifələrindəki razılıq seçimlərini idarə edin',
              description: {
                para1:
                  'Bu seçimlər yalnız AMP səhifələrə aiddir. BBC-nin qeyri-AMP səhifələrinə keçərkən bu seçimləri yenidən təyin etməyiniz xahiş oluna bilər.',
                para2:
                  'Açdığınız mobil səhifə Google AMP texnologiyası istifadə olunmaqla hazırlanıb.',
                heading2: 'Olduqca zəruri məlumatların toplanması',
                para3:
                  'Veb səhifələrimizin işləməsi üçün bəzi məhdud məlumatları razılığınız olmadan cihazınızda saxlayırıq.',
                para4: {
                  text: 'Veb səhifələrimizin işləməsi üçün cihazınızda saxladığımız lazımi məlumatlar haqqında daha ətraflı oxuyun.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Seçim üstünlüklərinizi cihazınızda saxlamaq üçün lokal yaddaşdan istifadə edirik.',
                heading3: 'Əlavə məlumat toplanması',
                para6:
                  'AMP səhifələrdə məlumatların toplanmasına razılıq verdiyinizdə Birləşmiş Krallığın xaricində olduğunuz vaxt sizə uyğun, fərdiləşdirilmiş reklamın göstərilməsinə icazə vermis olursunuz.',
                para7: {
                  text: 'BBC-də və reklam partnyorlarımızda reklamı necə fərdiləşdirdiyimiz barədə daha ətraflı oxuyun.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Aşağıdakı “Məlumat toplanmasını rədd edin və davam edin” düyməsinə basaraq fərdi reklam almamağı seçə bilərsiniz. Lütfən nəzərə alın ki, bu halda fərdiləşdirilməmiş reklam hələ də görünəcək.',
                para9:
                  'Səhifənin altında "Reklam Seçimləri / Məlumatımı satmayın" düyməsinə basaraq bu seçimləri istənilən vaxt dəyişə bilərsiniz.',
              },
            },
          },
          canonical: {
            title: 'Kukilərlə razı olduğunuzu bizə bildirin',
            description: {
              uk: {
                first: 'Biz ',
                linkText: 'kukilərdən',
                last: ' sizə ən yaxşı onlayn təcrübəni vermək üçün istifadə edirik. Lütfən, bütün bu kukilərlə razı olduğunuzu bizə bildirin.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Biz ',
                linkText: 'kukilərdən',
                last: ' sizə ən yaxşı onlayn təcrübəni vermək üçün istifadə edirik. Lütfən, bütün bu kukilərlə razı olduğunuzu bizə bildirin.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Bəli, razıyam',
            reject: 'Xeyr, kökləmələrə keçin',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Sizin qurğunuzda yenidən səsləndirmə mümkün deyil',
        contentExpired: 'Bu proqramı izləmək/dinləmək artıq mümkün deyil.',
        contentNotYetAvailable:
          'Bu proqramı izləmək/dinləmək hələlik mümkün deyil.',
        audio: 'Audio',
        photogallery: 'Foto-qalereya',
        video: 'Video',
        listen: 'Listen',
        watch: 'İzləyin',
        liveLabel: 'CANLI',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        recentEpisodes: 'Daha ətraflı',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Videonun alt yazısı, ',
          text: 'Xəbərdarlıq : Üçüncü tərəfin məzmununda reklam ola bilər',
          articleText:
            'Xəbərdarlıq : BBC kənar saytların məzmununa görə cavabdeh deyil.',
          articleAdditionalText: '%provider_name% məzmununda reklam ola bilər.',
        },
        fallback: {
          text: 'Məzmun mövcud deyil',
          linkText: 'Daha çoxu üçün %provider_name%',
          linkTextSuffixVisuallyHidden: ', BBC-dən kənar',
          warningText: 'BBC kənar saytların məzmununa məsul deyil.',
        },
        skipLink: {
          text: 'Paylaşımını ötürün %provider_name%',
          endTextVisuallyHidden: 'Paylaşımın sonu %provider_name%',
        },
        consentBanner: {
          heading: '[social_media_site] məzmununa icazə varmı?',
          body: `Bu məqalədə [social_media_site] məzmunu mövcuddur.  Nə isə yüklənməmişdən əvvəl icazənizi istəyirik, çünki onlar kukilərdən və digər texnologiyalardan istifadə edə bilərlər. Qəbul etməzdən əvvəl [social_media_site] [link] kuki siyasəti [/link] və [link] gizlilik siyasəti [/link] barədə oxumaq istəyə bilərsiniz. Bu məzmunu görmək üçün "qəbul edin və davam edin".`,
          button: 'Qəbul edin və davam edin',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Digər xəbərlər',
      featuresAnalysisTitle: 'Bunları da oxuyun',
    },
    mostRead: {
      header: 'Ən çox oxunan',
      lastUpdated: 'Ən son yeniləmə:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/azeri/institutional-49283479',
        text: 'BBC News-a niyə etibar etməlisiniz',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Bizim kənar keçidlərə dair yanaşmamız barədə oxuyun.',
      },
      links: [
        {
          href: 'https://www.bbc.com/azeri/institutional-37131047',
          text: 'İstifadə qaydaları',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131049',
          text: 'BBC haqqında',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131051',
          text: 'Məxfilik siyasəti',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/azeri/send/u50853225',
          text: 'BBC ilə Əlaqə',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC kənar saytların məzmununa məsul deyil.',
    },
    timezone: 'Asia/baku',
    navigation: [
      {
        title: 'Xəbərlər',
        url: '/azeri',
      },
      {
        title: 'Azərbaycan',
        url: '/azeri/topics/c7zp571g7y7t',
      },
      {
        title: 'Region',
        url: '/azeri/topics/czpveq9ll8pt',
      },
      {
        title: 'Beynəlxalq',
        url: '/azeri/topics/cde15l4vn02t',
      },
      {
        title: 'COP29',
        url: '/azeri/topics/cv2dz9j8ywyt',
      },
    ],
  },
};

export default withContext(service);
