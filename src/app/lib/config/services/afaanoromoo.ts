import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Africa/Addis_Ababa';
import '#psammead/psammead-locales/moment/om';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `om`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Haaromsameera',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-afaanoromoo',
    atiAnalyticsProducerId: '2',
    atiAnalyticsProducerName: 'AFAAN_OROMOO',
    useReverb: true,
    chartbeatDomain: 'afaanoromoo.bbc.co.uk',
    brandName: 'BBC News Afaan Oromoo',
    product: 'BBC News',
    serviceLocalizedName: 'Afaan Oromoo',
    defaultImage:
      'https://news.files.bbci.co.uk/ws/img/logos/og/afaanoromoo.png',
    defaultImageAltText: 'BBC News Afaan Oromoo',
    dir: `ltr`,
    externalLinkText: ' alaan',
    imageCaptionOffscreenText: "Ibsa waa'ee suuraa, ",
    videoCaptionOffscreenText: "Ibsa waa'ee viidiyoo, ",
    audioCaptionOffscreenText: "Ibsa wa'ee raadiyoo, ",
    defaultCaptionOffscreenText: 'Ibsa suuraa/viidiyoo, ',
    imageCopyrightOffscreenText: 'Madda suuraa, ',
    locale: `om-ET`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'om',
    datetimeLocale: `om`,
    service: 'afaanoromoo',
    serviceName: 'Afaan Oromoo',
    languageName: 'Oromo',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy:
      'https://www.bbc.com/afaanoromoo/institutional-49281861#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/afaanoromoo/institutional-49281861',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/afaanoromoo/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Oduu',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'WhatsApp',
      brandTitle: 'Chaanaalii WhatsApp BBC Afaan Oromoo',
      brandDescription:
        'Oduu, xiinxalaafi odeessa adda addaa kallattiin argachuuf',
      image: {
        src: 'https://ichef.bbc.co.uk/images/ic/$recipe/p0kthbd3.png',
        alt: 'BBC News Afaan Oromo WhatsApp irrati argadhaa',
      },
      linkLabel: {
        text: 'Asiin seenaa',
        href: 'https://bit.ly/4hIe50g',
      },
    },
    translations: {
      pagination: {
        previousPage: 'Kan duraa',
        nextPage: 'Itti aanee',
        pageXOfY: 'Page {x} Keessaa {y}',
      },
      ads: {
        advertisementLabel: 'Beeksiisa',
      },
      seeAll: 'Hunda ilaali',
      home: 'Oduu',
      currentPage: 'Fuula kan ammaa',
      skipLinkText: 'Qabiyyeetti darbi',
      relatedContent: 'Odeessa kana irratti dabalata',
      relatedTopics: 'Mata dureewwan walitti dhiyaatan',
      navMenuText: 'Kutaawwan',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Tamsaasa Kallattii',
        liveCoverage: 'Haguuggii Tamsaasa Kallattii',
        breaking: 'Amma nu gahe',
        postedAt: '...tti maxxanfame',
        summary: 'Guduunfaa',
        shareButtonText: 'Qoodi',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Guduunfaa',
      error: {
        404: {
          statusCode: '404',
          title: 'Fuulli argamuu hin dandeenye',
          message:
            'Dhiifama, fuula ati barbaaddaa jirtu siif fiduu hin dandeenye. maaloo yaali.',
          solutions: [
            'url sna dabalii ilaali',
            'Barbaadduu kee keessaan furtuu haaromsituu cuqaasuu',
            "Bo'aa barbaacha kan BBC fayyadamuun fuula kana barbaaduu",
          ],
          callToActionFirst: 'Akka filannootti, maaloo fuula duraa ',
          callToActionLinkText: 'BBC News Afaan Oromoo',
          callToActionLast: ' daawwadhu',
          callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
        },
        500: {
          statusCode: '500',
          title: 'Dogogora keessoo haadhoo',
          message:
            'Dhiifama, fuula ati barbaaddaa jirtu siif fiduu hin dandeenye. maaloo yaali.',
          solutions: [
            'Barbaadduu kee keessaan furtuu haaromsituu cuqaasuu',
            'Ammas gara boodaarra ni deebiya',
          ],
          callToActionFirst: 'Akka filannootti, maaloo fuula duraa ',
          callToActionLinkText: 'BBC News Afaan Oromoo',
          callToActionLast: ' daawwadhu',
          callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
        },
      },
      byline: {
        author: 'Barreessaa',
        articleInformation: 'Odeeffannoo barreeffamichaa',
        listItemImage: 'Tarree, suuraa',
        published: 'Maxxanfame',
        reportingFrom: 'Gabaasni irraati',
        role: 'Gahee',
      },
      consentBanner: {
        privacy: {
          title: 'Imaammata mateenyaafi kuus-yadannoo keenyaa haaromsiineera.',
          description: {
            uk: {
              first:
                "Imaammata mateenyaafi kuus-yaadannoo keenyaarratti jijjirama barbaachisaa muraasa kan taasifne yoo ta'u, kunis siifi daataa keetiif maal jechu akka ta'e akka bartu barbaadna.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Imaammata mateenyaafi kuus-yaadannoo keenyaarratti jijjirama barbaachisaa muraasa kan taasifne yoo ta'u, kunis siifi daataa keetiif maal jechu akka ta'e akka bartu barbaadna.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'TOLE',
          reject: 'Maaltu akka jijjirame bari',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Odeeffannoo walitti qabamuuf tole jedhaatii itti fufaa',
            reject: 'Odeeffannoo walitti qabamuuf diduun itti fufaa',
            initial: {
              title:
                "Fuula keenya salphaatti akka argattan gochuuf fayyadama slaphaa mobaayilii (AMP) irratti ragaa walitti akka qabnu waliigaltu yoo ta'e nu beeksiisaa.",
              description: {
                first: 'Nutiifi michuuwwan keenya tekinikoota kan akka ',
                linkText: 'kuus-yaadannoo',
                last: ", akkasumas muuxannoo toora interneetaa hunda caaluufi qabiyyee isaa akka fedha dhuunfaatti ta'u gochuu akkasumallee beekssisni sitti akka mul'atuuf daataa  ittiin barbaadan walitti qaba. Yoo itti walii galta ta'e nu beeksisi maaloo.",
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: "Qindaa'inawwan filmaata fayyadamaa kiyyaa sirreessuuf",
            },
            manage: {
              title:
                "Fuulawwan salphaan banaman irratti qindaa'ina hayyamaa sirreessuuf",
              description: {
                para1:
                  "Qindaa'inniwwan kunneenis fuulawwan salphaatti mobaayiliin saaqaman (AMP) qofaaf hojjatu. Fuula BBC non-AMP ta'an yoo saaqxatan akka irra deebiin filattan gaafatamuu mala.",
                para2:
                  'Kan saaqxan fuula haala salphaan teknolooojii Google tiin saaqamuudha.',
                heading2: "Odeeffannoo walitti qabuun dirqama ta'e",
                para3:
                  "Marsariitiin keenya akka hojjatu taasisuuf, fedhii keessan malee odeeffannoo waa'ee meeshaa itti fayyadamtanii muraasa ni olkeenya.",
                para4: {
                  text: 'Marsariitiin keenyaa akka hojjatuuf odeeffannoo murteessoo meeshaa itti fayyadamtanii nuti olkeenyuu irratti caalaa dubbisaa.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  "Filannoo fedhii keessaanii meeshaa keessan irratti olkaa'uuf kuusaa naannootti fayyadamna.",
                heading3: 'Odeeffannoo walitti qabuun dirqama hintaane',
                para6:
                  "Fuulawwan salphaatti saaqaman irratti odeeffannoon walitti akka qabamuuf tole yoo jettan, yoo UKn ala taataniitti beeksiisawwan isin ilaallatan isiniitti mul'isuuf hayyamtan jechuudha.",
                para7: {
                  text: 'BBC fi shariikoonni beeksiisaa keenya, attamiin beeksiisa isin ilaallatu akka hojjatan irratti caalaa dubbisaa.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  "Beeksiisawwan isin ilaalatu diduuf ''Reject data collection and continue'' asiin gadiitti cuqaasuu dandeessu. Maaloo ammalleen beeksiisa akka agartan garuu kan isin qofaa ilaalu akka hintaane hubadhaa.",
                para9:
                  "Yeroo kamiittu jaantoo keessatti ''Ad Choices / Do not sell my info'' cuqaasuun qindaa'ina kana geedaruu dandeessu.",
              },
            },
          },
          canonical: {
            title: 'Kuus-yaadannoo waliin waliigalu kee haa beeknu',
            description: {
              uk: {
                first: 'Kan nuti ',
                linkText: 'kuus-yaadannoo fayyadamnu',
                last: ' muuxannoo hunda caaluu toora internetaarratti isiniif kennuuf. Kuus-yaadannoo kan hunda waliin walii galuu kee mee haa barru.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Kan nuti ',
                linkText: 'kuus-yaadannoo fayyadamnu',
                last: ' muuxannoo hunda caaluu toora internetaarratti isiniif kennuuf. Kuus-yaadannoo kan hunda waliin walii galuu kee mee haa barru.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Eyyee, walii nan gala.',
            reject: 'Lakki, gara bakka itti argamuutti na geessi',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: "Meeshaan kee Miidiyaa taphachiisuu hin danda'u",
        contentExpired: 'Qabiyyee kun hinjiraatu',
        contentNotYetAvailable:
          'Qabiyyeen kun taphachuu kan hin jire dha ammayyuu.',
        audio: 'Sagalee',
        photogallery: 'Kuusaa suuraa',
        video: 'Viidiyoo',
        listen: 'Dhaggeeffadhaa',
        watch: 'Daawwadhu',
        listenLive: 'Kallattiin caqasaa',
        listenNext: 'Kan ittaanu caqasi',
        liveLabel: 'KALLATTIIN',
        nextLabel: 'KAN ITTAANU',
        previousRadioShow: 'Sagantaa raadiyoo dabre',
        nextRadioShow: 'Sagantaa raadiyoo itti aanu',
        duration: 'Turtii',
        recentEpisodes: 'Sagantaawwan darban',
        closeVideo: 'Bahi',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: "Ibsa waa'ee viidiyoo, ",
          text: 'Hubachiisa: qabiyyeen qaama sadaffaa beeksisa qabaachuu malu',
          articleText:
            'Hubachiisa: Qabiyyee marsariitiiwwan alaatiif BBCn itti gaafatamummaa hin fudhatu.',
          articleAdditionalText: "%provider_name% beeksisa qabaachuu danda'a.",
        },
        fallback: {
          text: 'Qabiyyeen kun hin argamne',
          linkText: 'irratti dabalatan ilaali %provider_name%',
          linkTextSuffixVisuallyHidden: ', alaan',
          warningText:
            "Qabiyyeewwan maddawwan alaa irraa ta'aniif BBCn itti gaafatamaa miti.",
        },
        skipLink: {
          text: 'Maxxansa %provider_name% irra dabri',
          endTextVisuallyHidden: 'Xumura maxxansa %provider_name%',
        },
        consentBanner: {
          heading: 'Qabiyyee [social_media_site] hayyamtaa?',
          body: `Barreeffamni kun qabiyyee [social_media-site]n dhiyaatan qaba. Tarii 'cookies' fi teknolojiiwwan biraa fayyadamuu waan danda'aniif, osoo tokkoonsaa gadi hin buufamiin dura hayyama keessan gaafanna. Osoo hin simatin dura [social_media_site][link] imaammata cookies [/link] fi [link] imaammata mateenyaa [/link] dubbisuu barbaadda ta'a. Qabiyyee kana ilaaluuf 'waliigaluun itti fufi' filadhu.`,
        },
      },
      include: {
        errorMessage:
          'Dhiifama, odeessa kana keessaa kutaa kana, moobaayilarratti agarsiisuu hin dandeenyu',
        linkText: 'Guutuu qabiyyee ilaaluuf fuula cufa ilaali',
      },
      topStoriesTitle: 'Isin hin darbiin',
      featuresAnalysisTitle: `Maaltu haasa'ama?`,
      latestMediaTitle: 'Haaraa',
    },
    mostRead: {
      header: "Baay'ee kan dubbifame",
      lastUpdated: 'Yeroo dhuma kan haaromfame:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Dhaggeeffadhaa',
      durationLabel: 'Turtii %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/afaanoromoo/institutional-49281861',
        text: 'BBC News maaliif amanuu dandeessa',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Gara geessituu alaatti akkaataa itti hojjennu dubbisi.',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'Haala itti fayyadamaa',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: "Waa'ee BBC",
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'Imaammata mateenyaa',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Kuus-yaadannoo',
        },
        {
          href: 'https://www.bbc.co.uk/afaanoromoo/send/u50777768',
          text: 'BBC qunnami',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Afaanoota biroo',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. Qabiyyeewwan maddawwan alaa irraa ta'aniif BBCn itti gaafatamaa miti.",
    },
    navigation: [
      {
        title: 'Oduu',
        url: '/afaanoromoo',
      },
      {
        title: 'Itoophiyaa',
        url: '/afaanoromoo/topics/c2dwqdy81y1t',
      },
      {
        title: 'Ispoortii',
        url: '/afaanoromoo/topics/c06gq6440j8t',
      },
      {
        title: 'Viidiyoo',
        url: '/afaanoromoo/topics/ck0dg7dpjwwt',
      },
      {
        title: 'Siyaasa',
        url: '/afaanoromoo/topics/c2dwqdynwwrt',
      },
      {
        title: 'Dubartoota',
        url: '/afaanoromoo/topics/c8y94yq185dt',
      },
      {
        title: 'Baha Jidduugalaa',
        url: '/afaanoromoo/topics/c8y94yzd049t',
      },
      {
        title: 'Jajjaboo',
        url: '/afaanoromoo/popular/read',
      },
    ],
    timezone: 'Africa/Addis_Ababa',
    liveRadioOverrides: {
      masterBrand: { bbc_oromo_radio: 'bbc_afaanoromoo_radio' },
    },
  },
};

export default withContext(service);
