import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import '#psammead/psammead-locales/moment/gu';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `gu`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'અપડેટેડ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-gujarati',
    atiAnalyticsProducerId: '50',
    atiAnalyticsProducerName: 'GUJARATI',
    useReverb: true,
    chartbeatDomain: 'gujarati.bbc.co.uk',
    brandName: 'BBC News ગુજરાતી',
    product: 'BBC News',
    serviceLocalizedName: 'ગુજરાતી',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/gujarati.png',
    defaultImageAltText: 'BBC News ગુજરાતી',
    dir: `ltr`,
    externalLinkText: ', બહારની',
    imageCaptionOffscreenText: 'ઇમેજ કૅપ્શન, ',
    videoCaptionOffscreenText: 'વીડિયો કૅપ્શન, ',
    audioCaptionOffscreenText: 'ઓડિયો કૅપ્શન, ',
    defaultCaptionOffscreenText: 'કૅપ્શન, ',
    imageCopyrightOffscreenText: 'ઇમેજ સ્રોત, ',
    locale: `gu-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'gu',
    datetimeLocale: `gu`,
    service: 'gujarati',
    serviceName: 'Gujarati',
    languageName: 'Gujarati',
    twitterCreator: '@bbcnewsgujarati',
    twitterSite: '@bbcnewsgujarati',
    noBylinesPolicy:
      'https://www.bbc.com/gujarati/institutional-50409883#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/gujarati/institutional-50409883',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/gujarati/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'સમાચાર',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'આ પહેલાં',
        nextPage: 'આ પછી',
        pageXOfY: 'Page {x} નું {y}',
      },
      ads: {
        advertisementLabel: 'જાહેરાત',
      },
      seeAll: 'વધુ વાંચો',
      home: 'સમાચાર',
      currentPage: 'વર્તમાન પેજ',
      skipLinkText: 'કન્ટેન્ટ પર જાવ',
      relatedContent: 'સંબંધિત સમાચાર',
      relatedTopics: 'સંબંધિત મુદ્દા',
      navMenuText: 'વિભાગો',
      mediaAssetPage: {
        mediaPlayer: 'મીડિયા પ્લેયર',
        audioPlayer: 'ઓડિયો પ્લેયર',
        videoPlayer: 'વીડિયો પ્લેયર',
      },
      liveExperiencePage: {
        liveLabel: 'લાઇવ',
        liveCoverage: 'લાઇવ કવરેજ',
        breaking: 'બ્રેકિંગ',
        postedAt: 'અહીં પોસ્ટ કર્યું',
        summary: 'સારાંશ',
        shareButtonText: 'શેર કરો',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'સારાંશ',
      error: {
        404: {
          statusCode: '404',
          title: 'પેજ મળ્યું નહીં',
          message:
            'માફ કરશો, તમે જે શોધી રહ્યા છો તે પેજ દેખાડી રહ્યું નથી, કૃપા કરીને ફરી કોશિશ કરો.',
          solutions: [
            'URLની  ફરી તપાસ કરો',
            'બ્રાઉઝરનું રિફ્રેશ બટન ફરી દબાવો',
            'આ પેજને બીબીસી સર્ચ બાર ખોલીને શોધવાની કોશિશ કરો',
          ],
          callToActionFirst: 'વિકલ્પના રૂપે અમારા હોમપેજ ',
          callToActionLinkText: 'BBC News ગુજરાતી',
          callToActionLast: ' પર જાઓ',
          callToActionLinkUrl: 'https://www.bbc.com/gujarati',
        },
        500: {
          statusCode: '500',
          title: 'ઇન્ટરનલ સર્વર એરર',
          message:
            'માફ કરશો, તમે શોધી રહ્યા છો એ પેજ દર્શાવાઈ રહ્યું નથી. કૃપા કરી ફરી કોશિશ કરો',
          solutions: [
            'બ્રાઉઝરનું રિફ્રેશ બટન દબાવો',
            'થોડા સમય બાદ પ્રયાસ કરો',
          ],
          callToActionFirst: 'વિકલ્પના રૂપે અમારા હોમપેજ ',
          callToActionLinkText: 'BBC News ગુજરાતી',
          callToActionLast: ' પર જાઓ',
          callToActionLinkUrl: 'https://www.bbc.com/gujarati',
        },
      },
      byline: {
        articleInformation: 'લેખની માહિતી',
        author: 'લેેખક',
        listItemImage: 'તસવીર',
        published: 'પ્રકાશિત',
        reportingFrom: 'દ્વારા રિપોર્ટિંગ',
        role: 'પદ',
      },
      consentBanner: {
        privacy: {
          title: 'અમે અમારી ગોપનીયતા અને કુકીઝની નીતિને અપડેટ કરી છે',
          description: {
            uk: {
              first:
                'અમે અમારી કુકીઝ અને ગોપનીયતાની નીતિમાં મહત્ત્વના ફેરફારો કર્યા છે, તમારે એ જાણવું જોઈએ કે તેનાથી તમારા પર અને તમારા ડેટા પર શું અસર પડશે.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'અમે અમારી કુકીઝ અને ગોપનીયતાની નીતિમાં મહત્ત્વના ફેરફારો કર્યા છે, તમારે એ જાણવું જોઈએ કે તેનાથી તમારા પર અને તમારા ડેટા પર શું અસર પડશે.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ઓકે',
          reject: 'જાણો, શું ફેરફારો થયા છે',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'ડેટા કલેક્શનની મંજૂરી આપો અને આગળ વધો.',
            reject: 'ડેટા કલેક્શન નાંમજૂર કરો અને આગળ વધો.',
            initial: {
              title:
                'તમે એએમપી ડેટા કલેક્શનની સહમતી આપી રહ્યા છો એવી અમને જાણ કરો.',
              description: {
                first:
                  'અમે અને અમારા પાર્ટનર આ પ્રકારની કેટલીક ટેકનિકનો ઉપયોગ કરીએ છીએ ',
                linkText: 'કુકીઝ',
                last: ' નો ઉપયોગ કરીને અમે બ્રાઉઝિંગ ડેટા દ્વારા તમને સારી અને ખાસ પ્રકારની સેવાઓ આપીએ છીએ. જેનાથી અમને તમારા માટે ખાસ કન્ટેન્ટ અને યોગ્ય જાહેરાત દર્શાવવામાં મદદ મળે છે. અમને જણાવો કે તમે આ અંગે સહમત છો.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'સેટિંગ્સ મૅનેજ કરો.',
            },
            manage: {
              title: 'એએમપી પેજની સેટિંગ્સમાં જઈને આપની મંજૂરીને મૅનેજ કરો.',
              description: {
                para1:
                  'આ સેટિંગ્સ એએમપી પેજ માટે છે. જો આપ એમએમપી વિનાના બીબીસી પેજ પર જાવ છો તો આપને આપની પસંદગી વિશે ફરીથી પણ પૂછવામાં આવી શકે છે.',
                para2:
                  'આ જે સામાન્ય મોબાઇલ પેજ આપ જોઈ રહ્યા છો તેને ગુગલ એએમપી ટેકનૉલૉજી થકી બનાવવામાં આવ્યું છે.',
                heading2: 'પૂર્ણ રીતે જરૂરી ડેટા કલેક્શન',
                para3:
                  'અમારી વેબસાઇટને યોગ્ય રીતે કાર્યરત રાખવા માટે સીમિત સ્તરે કેટલીક જાણકારીઓ સેવ કરવી પડે છે જેના માટે અમે આપની મંજૂરી નથી માગતા.',
                para4: {
                  text: 'એ જરૂરી જાણકારીઓ વિશે વધારે વાંચો જે અમે આપની ડિવાઇસ પર સ્ટોર કર્યું છે જેથી અમારું પેજ આપને યોગ્ય રીતે દેખાય.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'અમે આપની મંજૂરી અને પસંદગીઓને આપની ડિવાઇસના લોકલ સ્ટોરેજમાં સ્ટોર કરીએ છીએ.',
                heading3: 'વૈકલ્પિક ડેટા કલેક્શન',
                para6:
                  'જ્યારે તમે અમને એએમપી ડેટા કલેક્શનની મંજૂરી આપો છો તેનો અર્થ એ થાય છે કે તમે અમને આપની પસંદગીની જાહેરાત દર્શાવવાની મંજૂરી આપો છો. આવું ત્યારે જ થાય છે જ્યારે તમે બ્રિટનથી બહાર છો.',
                para7: {
                  text: 'બીબીસી આપની રૂચિ મુજબ જાહેરાતો અને જાહેરાતકર્તાઓ કેવી રીતે પસંદ કરે છે એ તે જાણવા માટે વધુ વાંચો.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'જો તમે ડેટા કલેક્શનને નામંજૂર કરી આગળ આગળ વધવાનો વિકલ્પ પસંદ કરો છો તો આપને રૂચિ મુજબ જાહેરાતો નહીં દર્શાવાય, જાહેરાતો તો તે છતાં દેખાડવામાં આવશે જ પરંતુ તે પર્સનલાઇઝ્ડ નહીં હોય.',
                para9:
                  'તમે ઍડ ચોઇસ બટન પર ક્લિક કરીને તમારી પસંદ બદલી શકો છો. તમે ડુ નોટ સેલ માટ ઇન્ફો બટન પર પણ ક્લિક કરી શકો છો.',
              },
            },
          },
          canonical: {
            title: 'અમને જણાવો કે તમે કુકીઝને લઈને સહમત છો',
            description: {
              uk: {
                first: 'તમને સારી ઑનલાઇન સેવાઓ આપવા માટે અમે ',
                linkText: 'કુકીઝ',
                last: ' નો ઉપયોગ કરીએ છીએ. અમને જણાવો કે તમે આ તમામ કુકીઝથી સહમત છો.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'તમને સારી ઑનલાઇન સેવાઓ આપવા માટે અમે ',
                linkText: 'કુકીઝ',
                last: ' નો ઉપયોગ કરીએ છીએ. અમને જણાવો કે તમે આ તમામ કુકીઝથી સહમત છો.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'હાં, હું સહમત છું',
            reject: 'ના, મને સેટિંગ્સમાં લઈ જાવ',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'તમારું ડિવાઇસ મીડિયા પ્લેબૅક સપોર્ટ નથી કરતું',
        contentExpired: 'આ સામગ્રી હવેથી ઉપલબ્ધ નથી.',
        contentNotYetAvailable: 'આ સામગ્રી ચલાવવા માટે હજી ઉપલબ્ધ નથી.',
        audio: 'ઓડિયો',
        photogallery: 'ફોટો ગૅલરી',
        video: 'વીડિયો',
        bbc_gujarati_tv: {
          title: 'સમાચાર',
          subtitle:
            'આંતરરાષ્ટ્રીય, પ્રાદેશિક ખબર અને વિશ્લેષણ માટે જુઓ બીબીસી ગુજરાતી સમાચાર.',
        },
        listen: 'સાંભળો',
        watch: 'જુઓ',
        watchMoments: 'વીડિયો જુઓ',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'આ પહેલાંનો રેડિયો શો',
        nextRadioShow: 'આગામી રેડિયો શો',
        duration: 'અવધિ',
        recentEpisodes: 'તાજેતરનાં એપિસોડ્સ',
        closeVideo: 'બહાર નીકળો',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'વીડિયો કૅપ્શન ',
          text: 'થર્ડ પાર્ટી કન્ટેટમાં જાહેરખબર હોય શકે છે',
          articleText: 'બીબીસી બહારની સાઇટ્સના કન્ટેન્ટ માટે જવાબદાર નથી.',
          articleAdditionalText:
            '%provider_name% કન્ટેન્ટમાં જાહેરાત હોઈ શકે છે. ',
        },
        fallback: {
          text: 'આ કન્ટેન્ટ ઉપલબ્ધ નથી',
          linkText: '%provider_name% પર વધુ મેળવો',
          linkTextSuffixVisuallyHidden: ' બહારની સામગ્રી',
          warningText: 'બહારની વેબસાઇટ્સની સામગ્રી માટે બીબીસી જવાબદાર નથી.',
        },
        skipLink: {
          text: 'બદલો %provider_name% કન્ટેન્ટ',
          endTextVisuallyHidden: '%provider_name% કન્ટેન્ટ પૂર્ણ',
        },
        consentBanner: {
          heading: '[social_media_site] કન્ટેન્ટને મંજૂરી આપીએ?',
          body: `આ લેખમાં [social_media_site] દ્વારા પૂરું પાડવામાં આવેલું કન્ટેન્ટ છે. કંઈ પણ લોડ થાય તે પહેલાં અમે તમારી મંજૂરી માટે પૂછીએ છીએ કારણ કે તેઓ કૂકીઝ અને અન્ય તકનીકોનો ઉપયોગ કરી શકે છે. તમે સ્વીકારતા પહેલાં [social_media_site] [link] કૂકીઝ નીતિ [/link] અને [link] ગોપનીયતાની નીતિ [/link] વાંચી શકો છો. આ સામગ્રી જોવા માટે 'સ્વીકારો અને ચાલુ રાખો'ના વિકલ્પને પસંદ કરો.`,
          button: 'સ્વિકારો અને આગળ વધો',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'નવાજૂની',
      featuresAnalysisTitle: 'બીબીસી વિશેષ',
      latestMediaTitle: 'લેટેસ્ટ',
    },
    mostRead: {
      header: 'સૌથી વધારે વંચાયેલા સમાચાર',
      lastUpdated: 'લાસ્ટ અપડેટ:',
      numberOfItems: 10,
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
        href: 'https://www.bbc.com/gujarati/institutional-50409883',
        text: 'બીબીસી વિશ્વાસપાત્ર કેમ?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'બહારની વેબસાઇટ્સની લિંક આપવા અંગેની અમારી નીતિ વિશે વાંચો',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'ઉપયોગની શરતો',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'બીબીસી વિશે',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'પ્રાઇવસી પૉલિસી',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'કુકીઝ',
        },
        {
          href: 'https://www.bbc.co.uk/gujarati/send/u50853313',
          text: 'BBC નો સંપર્ક કરો',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News અન્ય ભાષાઓમાં',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. બહારની વેબસાઇટ્સની સામગ્રી માટે બીબીસી જવાબદાર નથી.',
      collectiveNewsroomText: 'બીબીસી માટે કલેક્ટિવ ન્યૂઝરૂમનું પ્રકાશન',
    },
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'સમાચાર',
        url: '/gujarati',
      },
      {
        title: 'ગુજરાત',
        url: '/gujarati/topics/cz74kjn4j5wt',
      },
      {
        title: 'ભારત',
        url: '/gujarati/topics/c06gq3993v3t',
      },
      {
        title: 'વિદેશ',
        url: '/gujarati/topics/c83plvezd90t',
      },
      {
        title: 'હવામાન સમાચાર',
        url: '/gujarati/topics/cv2gk3nze31t',
      },
      {
        title: 'સ્પોર્ટ્સ',
        url: '/gujarati/topics/c404vn5qxq9t',
      },
      {
        title: 'વીડિયો',
        url: '/gujarati/topics/cpev7m0rry0t',
      },
      {
        title: 'મૅગેઝિન',
        url: '/gujarati/topics/c89lm5l6w4pt',
      },
      {
        title: 'લોકપ્રિય',
        url: '/gujarati/popular/read',
      },
    ],
  },
};

export default withContext(service);
