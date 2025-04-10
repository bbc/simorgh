import tamil from '../../../components/ThemeProvider/fontScripts/tamil';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ta';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ta`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'புதுப்பிக்கப்பட்டது',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-tamil',
    atiAnalyticsProducerId: '87',
    atiAnalyticsProducerName: 'TAMIL',
    useReverb: true,
    chartbeatDomain: 'tamil.bbc.co.uk',
    brandName: 'BBC News தமிழ்',
    product: 'BBC News',
    serviceLocalizedName: 'தமிழ்',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/tamil.png',
    defaultImageAltText: 'BBC News தமிழ்',
    dir: `ltr`,
    externalLinkText: ', வெளி',
    imageCaptionOffscreenText: 'படக்குறிப்பு, ',
    videoCaptionOffscreenText: 'காணொளிக் குறிப்பு, ',
    audioCaptionOffscreenText: 'கேட்பொலிக் குறிப்பு, ',
    defaultCaptionOffscreenText: 'குறிப்பு, ',
    imageCopyrightOffscreenText: 'பட மூலாதாரம், ',
    locale: `ta-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ta',
    datetimeLocale: `ta`,
    service: 'tamil',
    serviceName: 'Tamil',
    languageName: 'Tamil',
    twitterCreator: '@bbctamil',
    twitterSite: '@bbctamil',
    noBylinesPolicy:
      'https://www.bbc.com/tamil/institutional-50288575#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/tamil/institutional-50288575',
    isTrustProjectParticipant: true,
    script: tamil,
    manifestPath: '/tamil/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'முகப்பு',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'பக்கம்',
        previousPage: 'முந்தையது',
        nextPage: 'அடுத்தது',
        pageXOfY: 'பக்கம் {x} இல் {y}',
      },
      ads: {
        advertisementLabel: 'விளம்பரம்',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: 'அனைத்தும் பார்க்க',
      home: 'முகப்பு',
      currentPage: 'தற்போதுள்ள பக்கம்',
      skipLinkText: 'உள்ளடக்கத்துக்குத் தாண்டிச் செல்க',
      relatedContent: 'தொடர்புடைய உள்ளடக்கம்',
      relatedTopics: 'தொடர்புடைய தலைப்புகள்',
      navMenuText: 'பிரிவுகள்',
      mediaAssetPage: {
        mediaPlayer: 'ஊடக இயக்கி',
        audioPlayer: 'கேட்பொலி பிளேயர்',
        videoPlayer: 'காணொளி பிளேயர்',
      },
      liveExperiencePage: {
        liveLabel: 'நேரலை',
        liveCoverage: 'நேரடி செய்தி/ ஒலி/ஒளிபரப்பு',
        breaking: 'வந்துகொண்டிருக்கும் செய்தி',
        postedAt: 'பிரசுரிக்கப்பட்ட நேரம்',
        summary: 'முக்கிய சாராம்சம்',
        shareButtonText: 'பகிர்க',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'முக்கிய சாராம்சம்',
      error: {
        404: {
          statusCode: '404',
          title: 'பக்கம் காணவில்லை',
          message:
            'மன்னிக்கவும். நீங்கள் தேடும் பக்கத்தை எடுத்துத் தர இயலவில்லை. தயவு செய்து முயலுங்கள்:',
          solutions: [
            'யு.ஆர்.எல்.ஐ இரு முறை சோதிக்கப்படுகிறது',
            "உங்கள் உலாவியில் 'புதுப்பி' பொத்தானை அழுத்துதல்",
            'பிபிசி தேடு பட்டை மூலம் இந்த பக்கத்தை தேடுதல்',
          ],
          callToActionFirst: 'மாற்றாக, ',
          callToActionLinkText: 'பிபிசி தமிழின் முகப்பு பக்கம்',
          callToActionLast: ' செல்லுங்கள்.',
          callToActionLinkUrl: 'https://www.bbc.com/tamil',
        },
        500: {
          statusCode: '500',
          title: 'உள்ளமை சேவையகப் பிழை',
          message:
            'மன்னிக்கவும். நீங்கள் தேடும் பக்கத்தை தற்போது எடுத்துத் தர இயலவில்லை. தயவு செய்து முயலுங்கள்:',
          solutions: [
            "உங்கள் உலாவியில் 'புதுப்பி' பொத்தானை அழுத்துதல்",
            'பிறகு மீண்டும் திரும்பி வருதல்',
          ],
          callToActionFirst: 'மாற்றாக, ',
          callToActionLinkText: 'பிபிசி தமிழின் முகப்பு பக்கம்',
          callToActionLast: ' செல்லுங்கள்.',
          callToActionLinkUrl: 'https://www.bbc.com/tamil',
        },
      },
      byline: {
        articleInformation: 'கட்டுரை தகவல்',
        author: 'எழுதியவர்',
        listItemImage: 'பட்டியல், படம்',
        published: 'பிரசுரிக்கப்பட்டது',
        reportingFrom: 'இருந்து',
        role: 'பதவி',
      },
      consentBanner: {
        privacy: {
          title:
            'எமது தனியுரிமை மற்றும் குக்கி கொள்கைகளை நாங்கள் மேம்படுத்தியுள்ளோம்.',
          description: {
            uk: {
              first:
                'தனியுரிமை மற்றும் குக்கி கொள்கைகளில் சில முக்கிய மாற்றங்களை செய்துள்ளோம். இதனால் உங்களுக்கும், உங்கள் தரவுகளுக்கும் என்ன தாக்கம் ஏற்படும் என்று தெரிந்துகொள்ளுங்கள்.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'தனியுரிமை மற்றும் குக்கி கொள்கைகளில் சில முக்கிய மாற்றங்களை செய்துள்ளோம். இதனால் உங்களுக்கும், உங்கள் தரவுகளுக்கும் என்ன தாக்கம் ஏற்படும் என்று தெரிந்துகொள்ளுங்கள்.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'சரி',
          reject: 'என்ன மாறியுள்ளது என்பதைப் பாருங்கள்.',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'தரவுகள் சேகரிப்பை ஏற்றுக்கொண்டு தொடரவும்.',
            reject: 'தரவுகள் சேகரிப்பை ஏற்றுக்கொள்ளாமல் தொடரவும்.',
            initial: {
              title:
                'AMP பக்கம் வாயிலாக உங்கள் தரவுகளை சேகரிக்க ஒப்புக்கொள்கிறீர்களா எனத் தெரிவியுங்கள்.',
              description: {
                first:
                  'உங்களுக்கு ஏற்றவாறு விளம்பரங்களையும், உள்ளடக்கங்களையும் காட்டி உங்களுக்கு சிறந்த இணைய அனுபவத்தை வழங்க நாங்களும், எங்கள் கூட்டாளிகளும் ',
                linkText: 'குக்கிகள்',
                last: ' போன்ற தொழில் நுட்பங்களை பயன்படுத்துகிறோம்; உங்கள் உலாவல் (பிரௌசிங்) தரவுகளையும் திரட்டுகிறோம். இவற்றுக்கு நீங்கள்உடன்படுகிறீர்களா என்பதை எங்களுக்குத் தெரிவியுங்கள்.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'என் செட்டிங்ஸ்-ஐ நிர்வகி',
            },
            manage: {
              title: 'AMP பக்கத்தில் ஒப்புதல் அளிக்கும் செட்டிங்ஸ்-ஐ நிர்வகி',
              description: {
                para1:
                  'இவை AMP பக்கங்களுக்கு மட்டுமே பொருந்தும். AMP இல்லாத பிபிசி பக்கங்களுக்கு நீங்கள் சென்றால் உங்கள் தெரிவு மீண்டும் கேட்கப்படும்.',
                para2:
                  'நீங்கள் சென்ற லைட்வெய்ட் மொபைல் பக்கம் கூகுள் AMP தொழில்நுட்பம் கொண்டு உருவாக்கப்பட்டது.',
                heading2: 'தரவுகள் சேகரிப்பு  மிகவும் அவசியம்',
                para3:
                  'இணையப் பக்கங்கள் வேலை செய்வதற்காக உங்கள் ஒப்புதல் இல்லாமலேயே உங்கள் கருவியின் மிகச்சில தரவுகளை சேகரிப்போம்',
                para4: {
                  text: 'இணையப் பக்கம் வேலை செய்ய அவசியமான தரவுகள் சேகரிக்கப்படுவது பற்றி மேலும் படிக்கவும்.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'உங்கள் ஒப்புதலுடன் சேகரிக்கப்படும் தரவுகளுக்கு உங்கள் கருவியின் சேமிப்பகத்தை பயன்படுத்துவோம்',
                heading3: 'தரவுகள் சேகரிப்பது கட்டாயமல்ல',
                para6:
                  'AMP பக்கங்களில் தரவுகள் சேகரிப்புக்கு நீங்கள் ஒப்புக்கொண்டால் பிரிட்டனுக்கு வெளியே நீங்கள் இருக்கும்போது உங்களுக்கு ஏற்ற விளம்பரங்களை காட்ட நீங்கள் ஒப்புதல் தருகிறீர்கள்.',
                para7: {
                  text: 'தனிநபருக்கு ஏற்ற விளம்பரங்களை பிபிசி மற்றும் அதன் கூட்டு நிறுவங்கள் காட்டுவது எப்படி என்பதை இங்கே படிக்கலாம் .',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  '"தரவுகள் சேகரிப்பை ஏற்றுக்கொள்ளாமல் தொடரவும்" எனும் கீழுள்ள தெரிவை தேர்ந்தெடுத்து நீங்கள் தனிப்பட்ட விளம்பரங்களை வருவதை தவிர்க்கலாம். இருந்தாலும் விளம்பரங்கள் வரும் என்பதை தயவு செய்து மனதில் கொள்ளவும். அவை உங்களுக்கு ஏற்ப இருக்காது.',
                para9:
                  '"விளம்பர தெரிவுகள் / என் தரவுகளை விற்க வேண்டாம்" என்ற தெரிவின் மூலம் நீங்கள் எப்போது வேண்டுமானாலும் செட்டிங்ஸ்-ஐ மாற்றலாம்.',
              },
            },
          },
          canonical: {
            title: 'குக்கிகளை நீங்கள் ஏற்பதை எங்களுக்கு தெரிவியுங்கள்',
            description: {
              uk: {
                first: 'சிறந்த இணைய அனுபவத்தை உங்களுக்கு வழங்க நாங்கள் ',
                linkText: 'குக்கிகளை',
                last: ' பயன்படுத்துகிறோம். இந்த குக்கிகள் அனைத்தையும் நீங்கள் ஏற்கிறீர்களா என்பதை எங்களுக்குத் தெரியப்படுத்துங்கள். ',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'சிறந்த இணைய அனுபவத்தை உங்களுக்கு வழங்க நாங்கள் ',
                linkText: 'குக்கிகளை',
                last: ' பயன்படுத்துகிறோம். இந்த குக்கிகள் அனைத்தையும் நீங்கள் ஏற்கிறீர்களா என்பதை எங்களுக்குத் தெரியப்படுத்துங்கள். ',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'சரி. நான் ஏற்கிறேன்',
            reject: 'இல்லை. அமைப்புகள் பக்கத்துக்கு கொண்டு செல்',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'ஒலிபரப்பு மென்பொருள் உங்கள் கணினியில் இல்லை',
        contentExpired: 'இந்த நிகழ்ச்சி இனி கிடைக்காது.',
        contentNotYetAvailable:
          'இந்த நிகழ்ச்சி இன்னும் கேட்க தயாராக்கப்படவில்லை.',
        audio: 'ஒலி',
        photogallery: 'படத் தொகுப்பு',
        video: 'காணொளி',
        bbc_tamil_radio: {
          title: 'பிபிசி தமிழோசை',
          subtitle:
            'சர்வதேச, இந்திய, இலங்கை செய்திகள் மற்றும் நடப்புத் தகவல்களை வழங்கும் ஓர் நிகழ்ச்சி. அறிவியல், விளையாட்டு, கலை, கலாச்சாரம் மற்றும் பொழுதுபோக்கு தொடர்பான செய்திகளும் இதில் இடம்பெறும். சிற்றலை வானொலியிலும் பிபிசிதமிழ்.காம் இணையதளத்திலும் இதைக் கேட்கலாம்.',
        },
        bbc_tamil_tv: {
          title: 'கிளிக்',
          subtitle:
            'சமீபத்திய சர்வதேச மற்றும் இந்திய கண்டுபிடிப்புகள் குறித்த தொழில்நுட்ப நிகழ்ச்சி',
        },
        listen: 'கேட்க',
        watch: 'பார்க்க',
        watchMoments: 'ஷார்ட் வீடியோ',
        listenLive: 'நேரலையை கேட்க',
        liveLabel: 'நேரலை',
        nextLabel: 'NEXT',
        previousRadioShow: 'முந்தைய வானொலி நிகழ்ச்சி',
        nextRadioShow: 'அடுத்த வானொலி நிகழ்ச்சி',
        duration: 'கால அளவு',
        recentEpisodes: 'முந்தைய நிகழ்ச்சிகள்',
        closeVideo: 'மூடுக',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'காணொளிக் குறிப்பு ',
          text: 'எச்சரிக்கை: வெளியார் தகவல்களில் விளம்பரங்கள் இருக்கலாம்',
          articleText:
            'எச்சரிக்கை: வெளியார் தளங்களில் உள்ள பதிவுகளுக்கு பிபிசி பொறுப்பேற்காது',
          articleAdditionalText:
            '%provider_name%பதிவில் விளம்பரங்கள் இருக்கக்கூடும்',
        },
        fallback: {
          text: 'தகவல் இல்லை',
          linkText: 'மேலதிக விவரங்களைக் காண %provider_name%',
          linkTextSuffixVisuallyHidden: ', வெளி இணைப்பு',
          warningText:
            'வெளியார் இணைய தளங்களின் உள்ளடக்கத்துக்கு பிபிசி பொறுப்பாகாது.',
        },
        skipLink: {
          text: '%provider_name% பதிவை கடந்து செல்ல',
          endTextVisuallyHidden: '%provider_name% பதிவின் முடிவு',
        },
        consentBanner: {
          heading: `[social_media_site] பதிவை அனுமதிக்கலாமா?`,
          body: "இந்தக் கட்டுரையில் [social_media_site] வழங்கிய தகவல்கள் இடம் பெற்றுள்ளன. குக்கி மற்றும் பிற தொழில்நுட்பங்கள் பயன்படுத்தப்படக்கூடும் என்பதால்  எந்த ஒரு பதிவேற்றத்துக்கும் முன்னதாக உங்கள் அனுமதியைக் கோருகிறோம். அதை ஏற்றுக்கொள்வதற்கு முன்பாக, நீங்கள் [social_media_site] [link] குக்கி கொள்கை [/link] மற்றும் [link] தனியுரிமைக் கொள்கையை [/link] அறிந்துகொள்ள விரும்பலாம். இந்த தகவலைப் படிக்க, `ஏற்றுக்கொண்டு தொடரவும்' என்பதைத் தேர்வு செய்யவும்.",
          button: 'ஏற்பு மற்றும் தொடரவும்',
        },
      },
      include: {
        errorMessage:
          'மன்னிக்கவும், குறைந்த இணையத்தை பயன்படுத்தும் இந்த பக்கத்தில் கட்டுரையின் இந்த பகுதியை காணவியலாது. ',
        linkText:
          'முழு உள்ளடக்கத்தையும் காண இந்த பக்கத்தின் அசல் வடிவத்தை காணவும்.',
      },
      topStoriesTitle: 'முக்கிய செய்திகள்',
      featuresAnalysisTitle: 'சிறப்புச் செய்திகள்',
      latestMediaTitle: 'மிகச் சமீபத்தியது',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'நிரப்புவது கட்டாயமல்ல',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'நீங்கள் இதை பதிவேற்றுகிறீர்கள்...',
        fileUploadButton: 'கோப்பை தேர்வு செய்ய',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'அனுப்பு',

        // Validation
        validationRequired: 'ஏதோ விடுபடுகிறது',
        validationInvalidEmail: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'போதிய கோப்புகள் இல்லை. குறைந்தது {{minFiles}} கோப்புகள் சேர்க்கவும்.',
        validationFilesTooMany:
          'அதிக கோப்புகள் உள்ளன. நீங்கள் {{maxFiles}} கோப்புகள் சேர்க்கலாம்.',
        validationFilesInvalidType:
          'இந்த வகை கோப்புகளை நாங்கள் பயன்படுத்துவதில்லை. {{fileTypes}} சேர்க்கவும்.',
        validationFilesTooSmall:
          'இந்த கோப்பு சரியாக இல்லை. வேறு ஒன்றை முயற்சிக்கவும்.',
        validationFilesSizeExceeded:
          'கோப்பின் அளவு பெரிதாக உள்ளது. அதிகபட்சம் 2 ஜி.பி  பதிவேற்றலாம்',
        validationWordLimit: 'அதிகட்சம் {{wordLimit}} சொற்கள்',

        // Messaging
        retentionPeriodDays: undefined,
        referenceNumber: 'குறிப்பு எண்',
        submissionInfoSignedOutMessage:
          'இந்த விவரங்களை நீங்கள் குறிப்பெடுத்துக் கொள்ளலாம்',
        privacyInfoHtml:
          'கவலை வேண்டாம் உங்கள் தரவுகளை நாங்கள் பாதுகாப்போம். மேலதிக தகவல்களுக்கு அந்தரங்க {{privacyInfoLink}} படிக்கவும்',
        emailToHtml:
          'உங்கள் மனம் மாறி இதை பயன்படுத்த வேண்டாம் என நினைத்தால் குறிப்பு எண்ணை சுட்டி, {{emailLink}} என்ற மின்னஞ்சலை தொடர்புகொள்ளவும்.',
        removalGuidelineText:
          'ஒரு நிகழ்ச்சி அல்லது இணைய பயன்பாட்டுக்கு நீங்கள் சமர்ப்பித்ததை, நாங்கள் ஏற்கனவே பயன்படுத்தி இருந்தால் அதை நீக்க முடியாது.',

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'பதிவேற்றம் நடக்கிறது...',
        uploadingDescription: 'முடியும் வரை காத்திருக்கவும்.',

        // Success Screen
        successHeading: 'செய்தி அனுப்பப்பட்டது',
        successDescription: 'தொடர்பு கொண்டதற்கு நன்றி',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'செய்தி செல்லவில்லை',
        errorDescription: 'மீண்டும் முயற்சி',

        // Closed Screen
        closedHeading: 'இப்போது இது மூடப்பட்டுள்ளது.',
        closedDescription: 'அன்று இது நிறைவடையும் {{date}}.',
      },
    },
    mostRead: {
      header: 'அதிகம் படிக்கப்பட்டது',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/tamil/institutional-50288575',
        text: 'நீங்கள் ஏன் பிபிசி மீது நம்பிக்கை வைக்க முடியும்?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'வெளியார் இணைப்புகள் தொடர்பான எங்கள் அணுகுமுறையைப் பற்றி படிக்கவும்.',
      },
      links: [
        {
          href: 'https://www.bbc.com/tamil/institutional-37286680',
          text: 'பயன்பாட்டு விதி',
        },
        {
          href: 'https://www.bbc.com/tamil/institutional-37286682',
          text: 'பிபிசி பற்றி',
        },
        {
          href: 'https://www.bbc.com/tamil/institutional-37286684',
          text: 'தனியுரிமை கொள்கை',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'குக்கிகள்',
        },
        {
          href: 'https://www.bbc.co.uk/tamil/send/u50853753',
          text: 'பிபிசியுடன் தொடர்பு கொள்ள',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'பிபிசி நியூஸ் பிற மொழிகளில்',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'பிபிசி. வெளியார் இணைய தளங்களின் உள்ளடக்கத்துக்கு பிபிசி பொறுப்பாகாது.',
      collectiveNewsroomText: 'இது, பிபிசிக்காக கலெக்டிவ் நியூஸ்ரூம் வெளியீடு',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'முகப்பு',
        url: '/tamil',
      },
      {
        title: 'உலகம்',
        url: '/tamil/topics/c40379e2n2zt',
      },
      {
        title: 'இந்தியா',
        url: '/tamil/topics/c2dwqdn01v5t',
      },
      {
        title: 'இலங்கை',
        url: '/tamil/topics/cz74k7p3qw7t',
      },
      {
        title: 'உடல்நலம்',
        url: '/tamil/topics/cyx5kxzdn9dt',
      },
      {
        title: 'வரலாறு',
        url: '/tamil/topics/cxnyknvykxjt',
      },
      {
        title: 'விளையாட்டு',
        url: '/tamil/topics/cdr56rv4qwdt',
      },
      {
        title: 'அறிவியல்',
        url: '/tamil/topics/c9wpm0exkdpt',
      },
      {
        title: 'சினிமா',
        url: '/tamil/topics/cyx5kxz4wkgt',
      },
      {
        title: 'வீடியோ',
        url: '/tamil/topics/c1320722p81t',
      },
    ],
  },
};

export default withContext(service);
