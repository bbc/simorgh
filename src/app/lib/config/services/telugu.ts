import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/te';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `te`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'అప్‌డేట్ అయ్యింది',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-telugu',
    atiAnalyticsProducerId: '89',
    atiAnalyticsProducerName: 'TELUGU',
    useReverb: true,
    chartbeatDomain: 'telugu.bbc.co.uk',
    brandName: 'BBC News తెలుగు',
    product: 'BBC News',
    serviceLocalizedName: 'తెలుగు',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/telugu.png',
    defaultImageAltText: 'BBC News తెలుగు',
    dir: `ltr`,
    externalLinkText: ', ఇతర',
    imageCaptionOffscreenText: 'ఫొటో క్యాప్షన్, ',
    videoCaptionOffscreenText: 'వీడియో క్యాప్షన్, ',
    audioCaptionOffscreenText: 'ఆడియో క్యాప్షన్, ',
    defaultCaptionOffscreenText: 'క్యాప్షన్, ',
    imageCopyrightOffscreenText: 'ఫొటో సోర్స్, ',
    locale: `te-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'te',
    datetimeLocale: `te-in`,
    service: 'telugu',
    serviceName: 'Telugu',
    languageName: 'Telugu',
    twitterCreator: '@bbcnewstelugu',
    twitterSite: '@bbcnewstelugu',
    noBylinesPolicy:
      'https://www.bbc.com/telugu/institutional-50420343#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/telugu/institutional-50420343',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/telugu/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'వార్తలు',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'మునుపటి',
        nextPage: 'తదుపరి',
        pageXOfY: 'Page {x} లో {y}',
      },
      ads: {
        advertisementLabel: 'వ్యాపార ప్రకటన',
      },
      seeAll: 'అన్నీ చూడండి',
      home: 'హోమ్',
      currentPage: 'ప్రస్తుత పేజీ',
      skipLinkText: 'కంటెంట్‌కు వెళ్లండి',
      relatedContent: 'సంబంధిత కథనాలు',
      relatedTopics: 'సంబంధిత అంశాలు',
      navMenuText: 'విభాగాలు',
      mediaAssetPage: {
        mediaPlayer: 'మీడియా ప్లేయర్',
        audioPlayer: 'ఆడియో ప్లేయర్',
        videoPlayer: 'వీడియో ప్లేయర్',
      },
      liveExperiencePage: {
        liveLabel: 'లైవ్',
        liveCoverage: 'లైవ్ కవరేజీ',
        breaking: 'బ్రేకింగ్ న్యూస్',
        postedAt: 'పోస్ట్ చేసిన సమయం',
        summary: 'సారాంశం',
        shareButtonText: 'షేర్ చేయండి',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'సారాంశం',
      error: {
        404: {
          statusCode: '404',
          title: 'మీరడిగిన సమాచారం అందుబాటులో లేదు',
          message:
            'క్షమించండి, మీరు చూడాలనుకున్న సమాచారం ఇవ్వలేకపోతున్నాం. మరోసారి ప్రయత్నించండి.',
          solutions: [
            'యూఆర్ఎల్ మరోసారి సరిచూసుకోండి',
            'మీ బ్రౌజర్‌లో ఉన్న రిఫ్రెష్ బటన్‌పై నొక్కండి',
            'బీబీసీ సెర్చ్ బార్ ఉపయోగించి ఈ పేజీని వెతకండి',
          ],
          callToActionFirst: 'ప్రత్యామ్నాయంగా',
          callToActionLinkText: 'BBC News తెలుగు',
          callToActionLast: ' హోమ్ పేజీని చూడండి.',
          callToActionLinkUrl: 'https://www.bbc.com/telugu',
        },
        500: {
          statusCode: '500',
          title: 'ఇంటర్నల్ సర్వర్ ఎర్రర్',
          message:
            'క్షమించండి, మీరు కోరుకున్న పేజీని ఇప్పుడు చూపించలేకపోతున్నాం. మరోసారి ప్రయత్నించండి.',
          solutions: [
            'మీ బ్రౌజర్‌లో ఉన్న రిఫ్రెష్ బటన్‌పై నొక్కండి',
            'కాసేపాగి మళ్లీ ప్రయత్నించండి',
          ],
          callToActionFirst: 'ప్రత్యామ్నాయంగా',
          callToActionLinkText: 'BBC News తెలుగు',
          callToActionLast: ' హోమ్ పేజీని చూడండి.',
          callToActionLinkUrl: 'https://www.bbc.com/telugu',
        },
      },
      byline: {
        articleInformation: 'కథనం',
        author: 'రచయిత',
        listItemImage: 'చిత్రం',
        published: 'ప్రచురణ',
        reportingFrom: 'నుంచి',
        role: 'హోదా',
      },
      consentBanner: {
        privacy: {
          title: 'మా ప్రైవసీ, కుకీస్ పాలసీ అప్‌డేట్ చేశాం',
          description: {
            uk: {
              first:
                'మా ప్రైవసీ, కుకీస్ పాలసీలో కొన్ని ముఖ్యమైన మార్పులు చేశాం. మీకు, మీ సమాచారానికి ఇది ఏ విధంగా ఉపయోగపడుతుందో మీరు తెలుసుకోవాలని మేం కోరుకుంటున్నాం.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'మా ప్రైవసీ, కుకీస్ పాలసీలో కొన్ని ముఖ్యమైన మార్పులు చేశాం. మీకు, మీ సమాచారానికి ఇది ఏ విధంగా ఉపయోగపడుతుందో మీరు తెలుసుకోవాలని మేం కోరుకుంటున్నాం.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ఓకే',
          reject: 'ఏం మార్పులు చేశామో తెలుసుకోండి',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'డేటా సేకరణకు అంగీకరించి, కొనసాగండి.',
            reject: 'డేటా సేకరణకు నిరాకరించి, కొనసాగండి.',
            initial: {
              title:
                'ఏఎంపీ (Accelerated Mobile Page)లో డేటా సేకరణకు మీ అంగీకారాన్ని మాకు తెలియజేయండి',
              description: {
                first:
                  'మీకు మంచి ఆన్‌లైన్ ఎక్స్‌పీరియన్స్ ఇవ్వడానికి, మీకు తగిన కంటెంట్‌ను, ప్రకటనలను అందించడానికి మేము, మా పార్ట్‌నర్లు ',
                linkText: 'వంటి టెక్నాలజీలు',
                last: ' కుకీలు ఉపయోగించి, బ్రౌజింగ్ వివరాలను సేకరిస్తాం. మీరు దీనికి అంగీకరిస్తే మాకు తెలియచేయండి.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'నా సెటింగ్స్‌ను మేనేజ్ చేయండి.',
            },
            manage: {
              title: 'AMP పేజీల్లో సమ్మతి సెటింగ్స్‌ను మేనేజ్ చేయండి.',
              description: {
                para1:
                  'ఈ సెటింగ్స్ AMP పేజీలకు మాత్రమే వర్తిస్తాయి. మీరు AMP కాని బీబీసీ పేజీలను సందర్శించినప్పుడు మరోసారి మీ ప్రాధాన్యాల్ని సెట్ చెయ్యమని అడగవచ్చు.',
                para2:
                  'మీరు చూసిన లైట్‌వెయిట్ మొబైల్ పేజీ గూగుల్ AMP టెక్నాలజీని ఉపయోగించి రూపొందించారు.',
                heading2: 'డేటా సేకరణ తప్పనిసరి',
                para3:
                  'మా వెబ్ పేజీ పని చేసేందుకు మీ అనుమతి లేకుండానే మీ డివైస్‌లో కొంత పరిమితిలో సమాచారాన్ని స్టోర్ చేస్తాం.',
                para4: {
                  text: 'మా వెబ్ పేజీలు పని చేసేందుకు మీ డివైస్‌లో స్టోర్ చేసిన అత్యవసర సమాచారం గురించి మరింత తెలుసుకోండి.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'మీరు అనుమతించిన మీ ప్రాధాన్యాలను మీ డివైస్‌లో స్టోర్ చేసేందుకు మేము లోకల్ స్టోరేజిని ఉపయోగిస్తాం.',
                heading3: 'ఐచ్ఛిక సమాచార సేకరణ',
                para6:
                  'మీరు AMP పేజీల్లో డేటా సేకరణకు అనుమతించారు అంటే.. మీరు బ్రిటన్‌ బయట నివసిస్తున్నప్పుడు కూడా మీకు మాత్రమే ప్రత్యేకమైన ప్రకటనల్ని చూపించేందుకు మాకు అనుమతినిచ్చినట్లే.',
                para7: {
                  text: 'బీబీసీ, బీబీసీ ప్రకటనల భాగస్వాములు మీ ఆసక్తి మేరకు ప్రత్యేకమైన ప్రకటనల్ని ఎలా రూపొందిస్తారో మరింత తెలుసుకోండి.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'కిందున్న “డేటా సేకరణకు తిరస్కరించి, కొనసాగండి”పై క్లిక్ చేసి మీకు మాత్రమే కనిపించే ప్రత్యేకమైన ప్రకటనలు కూడా రాకుండా చూసుకోవచ్చు. అయితే, ఇది క్లిక్ చేశాక కూడా ప్రకటనలు మీకు కనిపిస్తాయి కానీ అవి మీకు మాత్రమే ప్రత్యేకమైన ప్రకటనలు కాదని గమనించాలి.',
                para9:
                  'కిందున్న “ప్రకటన ఎంపిక/నా సమాచారాన్ని అమ్మొద్దు”పై క్లిక్ చేసి ఈ సెటింగ్‌లను మీరు ఎప్పుడైనా మార్చుకోవచ్చు.',
              },
            },
          },
          canonical: {
            title: 'మీరు కుకీస్‌ను అంగీకరిస్తే మాకు తెలియచేయండి',
            description: {
              uk: {
                first: 'మేం మీకు మంచి ఆన్‌లైన్ ఎక్స్‌పీరియన్స్ ఇవ్వడానికి ',
                linkText: 'కుకీలు',
                last: ' ఉపయోగిస్తాం. మీరు ఈ కుకీలన్నింటికి అంగీకరిస్తే మాకు తెలియచేయండి.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'మేం మీకు మంచి ఆన్‌లైన్ ఎక్స్‌పీరియన్స్ ఇవ్వడానికి ',
                linkText: 'కుకీలు',
                last: ' ఉపయోగిస్తాం. మీరు ఈ కుకీలన్నింటికి అంగీకరిస్తే మాకు తెలియచేయండి.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'అవును, అంగీకరిస్తున్నా',
            reject: 'లేదు, నన్ను సెట్టింగ్స్ పేజీకి తీసుకెళ్లండి',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'మీ పరికరంలో మీడియా ప్లేబ్యాక్ సదుపాయం లేదు.',
        contentExpired: 'ఈ కంటెంట్ ఇప్పుడు అందుబాటులో లేదు.',
        contentNotYetAvailable:
          'ఈ కంటెంట్ ఇంకా ప్లే చేయడానికి అందుబాటులో లేదు.',
        audio: 'ఆడియో',
        photogallery: 'ఫొటో గ్యాలరీ',
        video: 'వీడియో',
        bbc_telugu_tv: {
          title: 'ప్రపంచం',
          subtitle:
            'తాజా అంతర్జాతీయ జాతీయ వార్తా విశేషాలు, విశ్లేషణ కోసం బీబీసి ప్రపంచం చూస్తూ ఉండండి.',
        },
        listen: 'వినండి',
        watch: 'చూడండి',
        watchMoments: 'షార్ట్ వీడియో చూడండి',
        listenLive: 'లైవ్ వినండి',
        liveLabel: 'లైవ్',
        nextLabel: 'NEXT',
        previousRadioShow: 'ఇంతకు ముందు రేడియో షో',
        nextRadioShow: 'తర్వాత రేడియో షో',
        duration: 'వ్యవధి',
        recentEpisodes: 'ఇటీవలి ఎపిసోడ్లు',
        closeVideo: 'నిష్క్రమించు',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'వీడియో క్యాప్షన్, ',
          text: 'హెచ్చరిక: థర్డ్ పార్టీ కంటెంట్‌లో ప్రకటనలు ఉండొచ్చు',
          articleText:
            'హెచ్చరిక: బయటి సైట్‌ల కంటెంట్‌కు బీబీసీ బాధ్యత వహించదు.',
          articleAdditionalText:
            '%provider_name% ఈ సమాచారంలో ప్రకటనలు ఉండొచ్చు.',
        },
        fallback: {
          text: 'కంటెంట్ అందుబాటులో లేదు',
          linkText: 'మరింత సమాచారం కోసం %provider_name%',
          linkTextSuffixVisuallyHidden: ', ఇతర కథనాలు',
          warningText: 'ఇతర వెబ్‌సైట్లలో సమాచారానికి బీబీసీ బాధ్యత వహించదు.',
        },
        skipLink: {
          text: 'పోస్ట్‌ %provider_name% స్కిప్ చేయండి',
          endTextVisuallyHidden: 'పోస్ట్ of %provider_name% ముగిసింది',
        },
        consentBanner: {
          heading: `[social_media_site] ఈ సమాచారాన్ని చూడాలనుకుంటున్నారా?`,
          body: `ఈ కథనంలో [social_media_site] అందించిన సమాచారం కూడా ఉంది. వారు కుకీలు, ఇతర టెక్నాలజీలను ఉపయోగిస్తుండొచ్చు, అందుకే సమాచారం లోడ్ అయ్యే ముందే మేం మీ అనుమతి అడుగుతాం. మీరు మీ అనుమతి ఇచ్చేముందు [social_media_site] [link] కుకీ పాలసీని [/link] , [link] ప్రైవసీ పాలసీని [/link] చదవొచ్చు. ఈ సమాచారం చూడాలనుకుంటే ‘ఆమోదించు, కొనసాగించు’ను ఎంచుకోండి.`,
          button: 'యాక్సెప్ట్ అండ్ కంటిన్యూ',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'ముఖ్యమైన కథనాలు',
      featuresAnalysisTitle: 'ఫీచర్లు',
      latestMediaTitle: 'తాజా వార్తలు',
    },
    mostRead: {
      header: 'Popular Reads',
      lastUpdated: 'చివరిగా అప్‌డేట్ అయిన తేదీ:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      header: 'ఎక్కువమంది చదివినవి',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/telugu/institutional-50420343',
        text: 'మీరు బీబీసీని ఎందుకు నమ్ముతారు?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'ఇతర వెబ్‌సైట్లకు మా లింకింగ్ విధానం గురించి తెలుసుకోండి.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'వినియోగ నిబంధనలు',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc/',
          text: 'బీబీసీ గురించి',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'ప్రైవసీ పాలసీ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'కుకీలు',
        },
        {
          href: 'https://www.bbc.co.uk/telugu/send/u50853775',
          text: 'BBCని సంప్రదించండి',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'ఇతర భాషల్లో బీబీసీ వార్తలు',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        ' BBC. ఇతర వెబ్‌సైట్లలో సమాచారానికి బీబీసీ బాధ్యత వహించదు.',
      collectiveNewsroomText: 'బీబీసి కోసం కలెక్టివ్ న్యూస్‌రూమ్ ప్రచురణ',
    },
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'వార్తలు',
        url: '/telugu',
      },
      {
        title: 'వీడియో',
        url: '/telugu/topics/cl29j0e3e2dt',
      },
      {
        title: 'ఎక్కువ మంది చదివినవి',
        url: '/telugu/popular/read',
      },
      {
        title: 'జాతీయం',
        url: '/telugu/topics/c5qvp16w7dnt',
      },
      {
        title: 'అంతర్జాతీయం',
        url: '/telugu/topics/cvqxn2k1xvdt',
      },
    ],
  },
};

export default withContext(service);
