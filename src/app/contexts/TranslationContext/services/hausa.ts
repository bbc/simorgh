import withContext from '../../utils/withContext';
import { Translations } from '../../../models/types/translations';

const hausa: Translations = {
  default: {
    pagination: {
      previousPage: 'Koma baya',
      nextPage: 'Na gaba',
      pageXOfY: 'Page {x} of {y}',
    },
    ads: {
      advertisementLabel: 'Talla',
    },
    seeAll: 'Duba su baki daya',
    home: 'Labaran Duniya',
    currentPage: 'Shafin da ake ciki',
    skipLinkText: 'Tsallaka zuwa abubuwan da ke ciki',
    relatedContent: 'Karin bayani',
    relatedTopics: 'Labarai masu alaka',
    navMenuText: 'Sassa',
    mediaAssetPage: {
      mediaPlayer: 'Media player',
      audioPlayer: 'Audio player',
      videoPlayer: 'Video player',
    },
    gist: 'Takaitacce',
    error: {
      404: {
        statusCode: '404',
        title: 'Ba za a samu wannan shafin ba',
        message:
          'Afuwa, ba za mu iya kawo maku wannan shafin da kuke nema ba. Sake gwadawa:',
        solutions: [
          'Sake duba adireshin',
          'Sabunta shafin',
          'Bincika shafin ta hanyar amfani da gurbin binciken BBC',
        ],
        callToActionFirst: 'Maimakon haka, ziyarci shafin sashen ',
        callToActionLinkText: 'BBC News Hausa',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/hausa',
      },
      500: {
        statusCode: '500',
        title: "Matsalar na'ura",
        message:
          'Afuwa, ba za mu iya kawo maku wannan shafin da kuke nema ba. Sake gwadawa:',
        solutions: ['Sabunta shafin', 'Ziyarci shafin daga baya'],
        callToActionFirst: 'Maimakon haka, ziyarci shafin sashen ',
        callToActionLinkText: 'BBC News Hausa',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/hausa',
      },
    },
    byline: {
      articleInformation: 'Bayani kan maƙala',
      author: 'Marubuci',
      listItemImage: 'Jerin abubuwa, hoto',
      published: 'An wallafa',
      reportingFrom: 'Aiko rahoto daga',
      role: 'Sanya sunan wanda ya rubuta labari',
    },
    consentBanner: {
      privacy: {
        title: "Mun sabunta Ka'idojinmu na Tsare Sirri",
        description: {
          uk: {
            first:
              "Mun yi wasu sauye-sauye kan muhimman Ka'idojinmu na Tsare Sirri, muna so ku san ta yadda hakan zai shafe ku da kuma bayananku.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              "Mun yi wasu sauye-sauye kan muhimman Ka'idojinmu na Tsare Sirri, muna so ku san ta yadda hakan zai shafe ku da kuma bayananku.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'Madalla',
        reject: 'Duba abin da ya sauya',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        amp: {
          accept: 'Ku amince da tattara bayananku sannan ku ci gaba',
          reject: 'Ƙin amincewa da tattara bayananku sannan ku ci gaba',
          initial: {
            title:
              'Masu ziyarar shafin AMP ku sanar da mu idan kun amince mu tattara bayananku',
            description: {
              first:
                'Mu da sauran abokan hulda muna amfani da fasaha kamar adireshin waje, sannan mu ',
              linkText: 'tattara',
              last: ' wasu bayanai game da ku duka domin mu samar maku da abubuwa masu kayatarwa a Intanet',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            manage: 'Na ba da damar aiwatar da tsare-tsarena',
          },
          manage: {
            title: 'Na ba da izinin sarrafa tsare-tsarena na shafukan AMP',
            description: {
              para1:
                'Waɗannan tsare-tsaren sun shafi shafukan AMP ne kawai. Za a iya buƙatarku ku sake tura zaɓin naku idan kuka ziyarci shafukan BBC da ba na AMP ba.',
              para2:
                'An yi amfani da fasahar Google AMP wajen tsara shafin da kuka ziyarta marar nauyi a kan wayarku.',
              heading2: 'Dole ne a tattara bayananku idan kuka zo nan',
              para3:
                'Domin shafukanmu su gudana, mun tattara wasu ƴan bayanai kan wayarku ba tare da izininku ba.',
              para4: {
                text: 'Karanta muhimman bayanan da muka tattara kan wayarku domin inganta shafukanmu.',
                url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
              },
              para5: 'Muna adana bayanan da kuka amice mu ɗauka na wayarku.',
              heading3: 'Zaɓi kan tara bayanai',
              para6:
                'Idan kuka amince mu tattara bayanai a kanku a shafukan AMP, hakan na nufin kun amince mu nuna muku tallace-tallacen da suka dace da ku idan a wajen Burtaniya kuke.',
              para7: {
                text: "Karanta ƙarin bayani kan yadda muke tsara tallace-tallace da suke dacewa da ra'ayinku a shafukan BBC da na abokan hulɗarmu.",
                url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
              },
              para8:
                "Kuna da zaɓin ƙin turo muku da tallace-tallacen da suka dace da ra'ayinku ta hanyar latsa wajen da aka nemi amincewarku sannan ku ci gaba.",
              para9:
                'Kuna iya sauya waɗannan tsare-tsaren ta hanyar latsa wannan wurin “Ad Choices / Do not sell my info” da ke can ƙasa a ko yaushe.',
            },
          },
        },
        canonical: {
          title: "Bayyana mana idan ka amince da ka'idojin",
          description: {
            uk: {
              first: 'Muna amfani da ',
              linkText: "ka'idoji",
              last: " domin samar maku da abubuwa masu kayatarwa a Intanet. Muna rokonku da ku sanar da mu idan kun gamsu da duka wadannan ka'idoji.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Muna amfani da ',
              linkText: "ka'idoji",
              last: " domin samar maku da abubuwa masu kayatarwa a Intanet. Muna rokonku da ku sanar da mu idan kun gamsu da duka wadannan ka'idoji.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Eh, na gamsu',
          reject: "A'a, ku kai ni wurin zabar tsari",
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
    },
    media: {
      noJs: "Na'urarku na da matsalar sauraren sauti",
      contentExpired: 'Yanzu an daina samar da wannan shiri.',
      contentNotYetAvailable:
        'Wannan shiri bai shigo ba tukuna don haka ba za a iya kunna shi ba.',
      audio: 'Murya',
      photogallery: 'Rumbun hotuna',
      video: 'Bidiyo',
      bbc_hausa_radio: {
        title: 'BBC Hausa Rediyo',
        subtitle:
          "Labaran duniya da sharhi da kuma bayanai kan al'amuran yau da kullum daga sashin Hausa na BBC.",
      },
      bbc_hausa_tv: {
        title: 'Labaran Talabijin',
        subtitle:
          "Sashen Hausa na BBC ya fara gabatar da shirin talabijin a ranakun Litinin zuwa Juma'a na kowane mako.",
      },
      listen: 'Saurari',
      watch: 'Kalla',
      listenLive: 'Saurara Kai Tsaye',
      listenNext: 'Saurari na gaba',
      liveLabel: 'KAI TSAYE',
      nextLabel: 'NA GABA',
      previousRadioShow: 'Shirye-shiryen rediyo da suka gabata',
      nextRadioShow: 'Shirye-shiryen rediyo na gaba',
      duration: 'Tsawon lokaci',
      recentEpisodes: 'Kari',
      podcastExternalLinks: 'Za a iya samun wannan Podcast din a',
    },
    socialEmbed: {
      caption: {
        textPrefixVisuallyHidden: 'Bayanan bidiyo ',
        text: 'Gargadi: Ana iya samun talla wanda ba na BBC ba ne',
        articleText:
          'Gargadi: BBC ba za ta dauki alhakin bayanan da aka wallafa a shafukan da ba nata ne ba.',
        articleAdditionalText: 'Ana yi samun tallace-tallace %provider_name%',
      },
      fallback: {
        text: 'Babu karin bayanai',
        linkText: 'Ci gaba da duba %provider_name%',
        linkTextSuffixVisuallyHidden: ', adireshin waje',
        warningText:
          'BBC ba za ta dauki alhakin abubuwan da wasu shafukan daban suka wallafa ba.',
      },
      skipLink: {
        text: 'Kauce wa %provider_name%',
        endTextVisuallyHidden: 'Karshen labarin da aka sa a %provider_name%',
      },
      consentBanner: {
        heading: 'Ya kamata a bar bayanan [social_media_site]?',
        body: `Wannan labari ne na dauke da bayanai da [social_media_site] suka bayar.  Muna neman amincewarku kafin mu dora muka, saboda nuna iya dauke da  wasu bayanai da aka iya adanawa. Watakila kana za ka so ka karanta [social_media_site] [link] da tsarin bayanan da za a adana [/link] da [link] da tsarin sirri [/link] kafin ka amince. Idan kana son ganin wannan bayani ka zabi ‘amince sannan ka ci gaba’.`,
      },
    },
    include: {
      errorMessage:
        'Yi hakuri, ba zamu iya nuna wannan bangaren na labarin a irin wannan karamar wayar',
      linkText: 'Bude babban shafin domin kallon duka abubuwan da muka wallafa',
    },
    topStoriesTitle: 'Babban Labari',
    featuresAnalysisTitle: 'Minti Daya Da BBC',
  },
};

export default withContext(hausa);
