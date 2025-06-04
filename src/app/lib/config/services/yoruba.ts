import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/yo';
import '#psammead/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'yo',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Ìgbà tí a ṣe àfíkun gbẹ̀yìn',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-yoruba',
    atiAnalyticsProducerId: '107',
    atiAnalyticsProducerName: 'YORUBA',
    useReverb: true,
    chartbeatDomain: 'yoruba.bbc.co.uk',
    brandName: 'BBC News Yorùbá',
    product: 'BBC News',
    serviceLocalizedName: 'Yorùbá',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/yoruba.png',
    defaultImageAltText: 'BBC News Yorùbá',
    dir: 'ltr',
    externalLinkText: ', ìta',
    imageCaptionOffscreenText: 'Àkọlé àwòrán, ',
    videoCaptionOffscreenText: 'Àkọlé fídíò, ',
    audioCaptionOffscreenText: 'Àkọlé fọ́nrán ohùn, ',
    defaultCaptionOffscreenText: 'Àkọlé, ',
    imageCopyrightOffscreenText: 'Oríṣun àwòrán, ',
    locale: 'yo',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'yo',
    datetimeLocale: 'yo',
    service: 'yoruba',
    serviceName: 'Yoruba',
    languageName: 'Yoruba',
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    showAdPlaceholder: false,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'WhatsApp',
      brandTitle: 'Èyí ni ìkànnì Whatsapp wa',
      brandDescription: 'Àjáàbalẹ̀ ìròyìn BBC News Yorùbá lórí WhatsApp rẹ',
      image: {
        src: 'https://ichef.bbc.co.uk/images/ic/$recipe/p0kthb9n.jpg',
        alt: 'BBC News Yorùbá ti wà lórí WhatsApp',
      },
      linkLabel: {
        text: 'Darapọ̀ mọ́ wa nibì',
        href: 'https://bit.ly/3Xgfl35',
      },
    },
    noBylinesPolicy:
      'https://www.bbc.com/yoruba/institutional-48528718#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/yoruba/institutional-48528718',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/yoruba/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Àbáwọlé',
    translations: {
      pagination: {
        previousPage: 'Ìṣájú',
        nextPage: 'Tókàn',
        pageXOfY: 'Page {x} nínú {y}',
      },
      ads: {
        advertisementLabel: 'Advertisement',
      },
      seeAll: 'Wo gbogbo ẹ̀',
      home: 'Ìròyìn',
      currentPage: 'Ojú ewé to wà yìí',
      skipLinkText: 'Fò kọjá sí nnkan tí ó wà nínú rẹ̀',
      relatedContent: 'Àwọn afíkun lórí ìròyìn yìí',
      relatedTopics: 'Àwọn Àkórí Tójọra',
      navMenuText: 'Àwọn abala',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Lọ́wọ́lọ́wọ́',
        liveCoverage: 'Ìgbóhùnsáfẹ́fẹ́ tí ń lọ lọ́wọ́',
        breaking: 'Kókó',
        postedAt: 'Tí a fiṣọwọ́ ní',
        summary: 'Ìsọníṣókí',
        shareButtonText: 'Ṣe alábàápín',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Ìsọníṣókí',
      error: {
        404: {
          statusCode: '404',
          title: 'A kò rí ojú ewé náà',
          message:
            'Ẹ má bínú, a kò le è mú ojú ewé tí ẹ̀ ń wá, wá fún yín. Ẹ tún tiraka lẹẹkan sí i.',
          solutions: [
            'Ẹ tún ṣe àyẹ̀wò ojú òpó URL yìí lẹ́ẹ̀kan sí i',
            'Ẹ tẹ bọ́tíní tí yóò tún ojú ewé yìí gbé wá (Refresh) lẹ́ẹ̀kan sí i',
            'Ẹ má a wá ojú ewé yìí nípa lílo bọ́tìnì BBC tó ń ṣe àwárí nǹkan (BBC Search bar).',
          ],
          callToActionFirst: 'Lọ́nà míràn, ẹ le è kàn sí ojú òpó ìròyìn ',
          callToActionLinkText: 'BBC News Yorùbá',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/yoruba',
        },
        500: {
          statusCode: '500',
          title: 'Àṣìṣe láti ojú ìtàkùn àgbáyé wa',
          message:
            'Ẹ má bínú, a kò le è mú ojú ewé tí ẹ̀ ń wá, wá fún yín. Ẹ tún tiraka lẹẹkan sí i.',
          solutions: [
            'Ẹ tẹ bọ́tíní tí yóò tún ojú ewé yìí gbé wá (Refresh) lẹ́ẹ̀kan sí i',
            'A tún ń padà bọ̀',
          ],
          callToActionFirst: 'Lọ́nà míràn, ẹ le è kàn sí ojú òpó ìròyìn ',
          callToActionLinkText: 'BBC News Yorùbá',
          callToActionLast: '.',
          callToActionLinkUrl: 'https://www.bbc.com/yoruba',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Àgbéga ti bá ìlànà àgbékalẹ̀ ojú òpó ìdákọ́ńkọ́ àti ayélujára wa',
          description: {
            uk: {
              first:
                'A ṣe àwọn àyípadà pàtàkì sáwọn ìlànà àgbékalẹ̀ òpó ìdákọ́ńkọ́ àti ayélujára wa, a sì fẹ́ kẹ mọ̀ ipa tí èyí yóò ní lórí yín àti détà tẹ̀ ń lò.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'A ṣe àwọn àyípadà pàtàkì sáwọn ìlànà àgbékalẹ̀ òpó ìdákọ́ńkọ́ àti ayélujára wa, a sì fẹ́ kẹ mọ̀ ipa tí èyí yóò ní lórí yín àti détà tẹ̀ ń lò.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ó dára bẹ́ẹ̀',
          reject: 'Ẹ ṣe ìwádìí ohun tó yípadà',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Faramọ gbigba akọsilẹ rẹ, ki o si tẹsiwaju',
            reject: 'Kọ gbigba akọsilẹ rẹ, ki o si tẹsiwaju',
            initial: {
              title: 'Sọ fun wa, ti o ba faramọ gbigba akọsilẹ lori AMP',
              description: {
                first: 'Àwa àti àwọn alábàáṣiṣẹ́pọ̀ wa ń lo àwọn ìmọ̀ ẹ̀rọ, bíi ',
                linkText: 'ìlànà òpó ìtàkùn àgbáyé',
                last: ', láti mọ détà tí ẹ̀ ń lò, ká le è fun yín ní ìrírí lílo ojú òpó yélujára tó dára jùlọ, ká sì tún ri dájú pé ẹyin ìkan ló ń rí àwọn ohun ta kọ àti ìpolówó ọjà tí á ń fi hàn yín.Ẹ jọ̀wọ́, ẹ jẹ́ ká mọ̀ tẹ bá fara mọ́ ọ.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Mojuto eto mi',
            },
            manage: {
              title: 'Mojuto eto ifaramọ lori AMP',
              description: {
                para1:
                  'Awọn eto yii ni i ṣe pẹlu oju opo AMP nikan. O ṣe e ṣe ki o tun eto yii ṣe ti o ba lo oju opo bbc.com ti ko ni AMP.',
                para2:
                  'Imọ ẹrọ Google AMP ni a fi ṣe agbekalẹ ojuopo ayelujara ori foonu ti o ṣẹṣẹ wo tan.',
                heading2: 'Awọn akọsilẹ to ṣe dandan lati gba',
                para3:
                  'Ki oju opo wa ba a le ṣiṣẹ, a ma n fi awọn akọsilẹ kan pamọ lori foonu rẹ, lai gba aṣẹ lọwọ rẹ.',
                para4: {
                  text: 'Ka si nipa awọn akọsilẹ to sẹ koko ti a fi pamọ si ori foonu rẹ, ki oju opo wa le ṣiṣẹ.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'A n lo aaye labẹle, lati fi awsn nakn ti o fọwọ si, lori foonu rẹ.',
                heading3: 'Akọsilẹ ti o le yan',
                para6:
                  'Ti o ba faramọ gbigba akọsilẹ lori AMP, o tumọ si pe o gba lati faaye gba wa ki a ṣe afihan ipolowo to ba ọ mu, ti o ko ba si ni UK.',
                para7: {
                  text: 'Ka si nipa bi a ṣe n ṣeto iru ipolowo ti o n rini BBC ati lọdọ awọn onibaara wa',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'O le yan iru ipolowo ti o ba fẹ ẹ ma ri nipa titẹ “Reject data collection and continue” nisalẹ. Jẹ ko ye ọ pe wa a ma ri ipolowo, amọ ko ni jẹ eyi ti o yan.',
                para9:
                  'O le ṣe ayipada eto yii nipa titẹ “Ad Choices/Do not sell my info” si isalẹ nigbakuugba.',
              },
            },
          },
          canonical: {
            title: 'Ẹ jẹ́ ká mọ̀ pé ẹ faramọ́ ìlànà òpó ìtàkún àgbáyé wa',
            description: {
              uk: {
                first: 'À ń lo ',
                linkText: 'fún ìlànà òpó ìtàkùn àgbáyé',
                last: ' láti jẹ́ kẹ ní ìrírí tó dára jùlọ lójú òpó ìtàkùn àgbáyé. Ẹ jọ̀wọ́, ẹ jẹ́ ká mọ tẹ bá faramọ gbogbo àwọn ìlàná òpó ìtàkùn àgbáyé wọnyí.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'À ń lo ',
                linkText: 'fún ìlànà òpó ìtàkùn àgbáyé',
                last: ' láti jẹ́ kẹ ní ìrírí tó dára jùlọ lójú òpó ìtàkùn àgbáyé. Ẹ jọ̀wọ́, ẹ jẹ́ ká mọ tẹ bá faramọ gbogbo àwọn ìlàná òpó ìtàkùn àgbáyé wọnyí.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Bẹ́ẹ̀ni, mo fara mọ́ ọ',
            reject: 'Rárá, ẹ gbé mi padà sí ojú òpó àtúntò (setting)',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Àwọn àmúyẹ fun gbígbọ́ orin ko le ṣiṣẹ lori ẹ̀rọ rẹ',
        contentExpired: 'Nnkan yìí kò sí mọ́.',
        contentNotYetAvailable: 'Kò tíì sí nnkan náà nílẹ̀ láti gbọ́',
        audio: 'Orin',
        photogallery: 'Àtẹ Àwòrán',
        video: 'Fídíò',
        bbc_yoruba_radio: {
          title: 'Placeholder title',
          subtitle: 'Placeholder subtitle',
        },
        listen: 'Gbọ́',
        watch: 'Wò',
        liveLabel: 'NÍ YÀJÓYÀJÓ',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        closeVideo: 'Jáde',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Àkọlé fídíò, ',
          text: 'Warning: Third party content may contain adverts',
          articleText:
            'Warning: The BBC is not responsible for the content of external sites.',
          articleAdditionalText: '%provider_name% content may contain adverts.',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', Láti ìta',
          warningText:
            'BBC kò mọ̀ nípa àwọn ohun tí ó wà ní àwọn ojú òpó tí ó wà ní ìta.',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Ìròyìn tó ṣe kókó',
      featuresAnalysisTitle: 'Ìwádìí kíkún lóríi kókó ìròyìn ',
      latestMediaTitle: 'Èyí tí ó ṣẹ̀ṣẹ̀dé',
    },
    mostRead: {
      header: 'Èyítí A Ń Kà Jùlọ',
      lastUpdated: 'Tí a mú dójú ìwọ̀n gbẹ̀yìn ní:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      header: 'Èyítí A Ń Kà Jùlọ',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/yoruba/institutional-48528718',
        text: 'Ìdí tí ẹ fi le è nígbàagbọ́ nínú ìròyìn BBC',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Ọwọ́ tí a fi mú ìbáṣepọ̀ ti ìta.',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'Ìlànà Lílò',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'Nípa BBC',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'Òfin Àṣírí',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/yoruba/send/u50853973',
          text: 'Kàn sí BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Ka ìròyìn BBC l’èdè míràn nibi',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC kò mọ̀ nípa àwọn ohun tí ó wà ní àwọn ojú òpó tí ó wà ní ìta.',
    },
    timezone: 'Africa/Lagos',
    navigation: [
      {
        title: 'Ìròyìn',
        url: '/yoruba',
      },
      {
        title: 'Eré ìdárayá',
        url: '/yoruba/topics/c340q0y3p5kt',
      },
      {
        title: 'Fídíò',
        url: '/yoruba/topics/ck5rznlk6k3t',
      },
      {
        title: 'Èyí to gbajúmọ̀ jù',
        url: '/yoruba/popular/read',
      },
    ],
  },
};

export default withContext(service);
