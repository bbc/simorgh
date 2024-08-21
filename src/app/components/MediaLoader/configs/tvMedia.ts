import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  return {
    product: 'news',
    enableToucan: true,
    appName: 'news-hindi',
    superResponsive: true,
    insideIframe: true,
    counterName: 'hindi.bbc_hindi_tv.tv.w172zm8920nck2z.page',
    statsObject: {
      destination: 'WS_NEWS_LANGUAGES',
      producer: 'HINDI',
      episodePID: 'w172zm8920nck2z',
    },
    ui: {
      locale: {
        lang: 'hi',
      },
      subtitles: {
        defaultOn: true,
      },
    },
    playlistObject: {
      title: 'दुनिया',
      holdingImageURL:
        'https://ichef.bbci.co.uk/images/ic/$recipe/p0hfjjfk.png',
      items: [
        {
          versionID: 'w1mskyp8ybvqtc6',
          kind: 'programme',
          duration: 1192,
          vpid: 'w1mskyp8ybvqtc6',
        },
      ],
      summary:
        'ताज़ा अंतरराष्ट्रीय, क्षेत्रीय ख़बरों और विश्लेषण के लिए देखिए बीबीसी दुनिया',
    },
    container: {},
    domid: 'mediaPlayer',
  };
};
