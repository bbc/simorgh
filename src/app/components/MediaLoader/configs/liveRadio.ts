import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  LiveRadioBlock,
  LiveRadioHeadingBlock,
  LiveRadioParagraphBlock,
  LiveRadioVersionBlock,
} from '../types';

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveRadioBlocks }: LiveRadioBlock = filterForBlockType(
    blocks,
    'liveRadio',
  );

  const headingBlock: LiveRadioHeadingBlock = filterForBlockType(
    liveRadioBlocks,
    'heading',
  );

  const paragraphBlock: LiveRadioParagraphBlock = filterForBlockType(
    liveRadioBlocks,
    'paragraph',
  );

  const liveRadioMetadataBlock: LiveRadioVersionBlock = filterForBlockType(
    liveRadioBlocks,
    'version',
  );

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      playlistObject: {
        title: headingBlock?.text ?? '',
        holdingImageURL: '',
        items: [
          {
            kind: 'radioProgramme',
            live: true,
            serviceID: liveRadioMetadataBlock?.externalId,
          },
        ],
        liveRewind: true,
        simulcast: true,
        summary: paragraphBlock?.text,
      },
      ui: {
        ...basePlayerConfig.ui,
        skin: 'audio',
        colour: '#b80000',
        foreColour: '#222222',
        baseColour: '#222222',
        colourOnBaseColour: '#ffffff',
        fallbackBackgroundColour: '#ffffff',
        controls: { enabled: true, volumeSlider: true },
      },
    },
    mediaType: 'liveRadio',
    showAds: false,
  };
};

// {
//   "product": "news",
//   "responsive": true,
//   "appName": "news-hausa",
//   "appType": "amp",
//   "counterName": "hausa.bbc_hausa_radio.liveradio.page",
//   "playlistObject": {
//       "items": [
//           {
//               "kind": "radioProgramme",
//               "live": true,
//               "serviceID": "bbc_hausa_radio"
//           }
//       ],
//       "liveRewind": true,
//       "simulcast": true,
//       "title": "BBC Hausa Rediyo",
//       "summary": "Labaran duniya da sharhi da kuma bayanai kan al'amuran yau da kullum daga sashin Hausa na BBC."
//   },
//   "statsObject": {
//       "destination": "WS_NEWS_LANGUAGES",
//       "producer": "HAUSA"
//   },
//   "ui": {
//       "skin": "audio",
//       "baseColour": "#222222",
//       "colour": "#b80000",
//       "colourOnBaseColour": "#ffffff",
//       "fallbackBackgroundColour": "#ffffff",
//       "foreColour": "#222222",
//       "controls": {
//           "enabled": true,
//           "volumeSlider": true
//       },
//       "fullscreen": {
//           "enabled": true
//       },
//       "locale": {
//           "lang": "ha"
//       },
//       "subtitles": {
//           "defaultOn": true,
//           "enabled": true
//       }
//   },
//   "container": {},
//   "domid": "mediaPlayer"
// }
