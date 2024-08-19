import { PageTypes, Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';

export type PlayerConfig = {
  autoplay?: boolean;
  preload?: string;
  product?: string;
  enableToucan: boolean;
  counterName?: string;
  appType: 'amp' | 'responsive';
  appName: `news-${Services}` | 'news';
  externalEmbedUrl?: string;
  statsObject: {
    clipPID?: string;
    destination: string;
    producer: string | '';
  };
  mediator?: { host: string };
  ui: PlayerUiConfig;
  playlistObject?: {
    title: string;
    summary?: string;
    holdingImageURL: string;
    items: PlaylistItem[];
    guidance?: string;
  };
};

export type PlayerUiConfig = {
  skin?: string;
  colour?: string;
  foreColour?: string;
  baseColour?: string;
  colourOnBaseColour?: string;
  fallbackBackgroundColour?: string;
  controls: { enabled: boolean };
  locale: { lang: string };
  subtitles: { enabled: boolean; defaultOn: boolean };
  fullscreen: { enabled: boolean };
};

export type PlaylistItem = {
  versionID: string;
  kind: string;
  duration: number;
  live?: boolean;
  embedRights?: 'allowed';
};

export type ConfigBuilderProps = {
  blocks: MediaBlock[];
  basePlayerConfig: PlayerConfig;
  pageType: PageTypes;
  translations?: Translations;
  adsEnabled?: boolean;
  showAdsBasedOnLocation?: boolean;
};

export type ConfigBuilderReturnProps = {
  mediaType: string;
  playerConfig: PlayerConfig;
  placeholderConfig: {
    mediaInfo: MediaInfo;
    placeholderSrc: string;
    placeholderSrcset: string;
    translatedNoJSMessage: string;
  };
  showAds: boolean;
};

export type MediaInfo = {
  title: string;
  datetime?: string;
  duration?: string;
  durationSpoken?: string;
  type?: 'audio' | 'video';
  guidanceMessage?: string | null;
};

export type Player = {
  dispatchEvent(
    dispatchEvent: string,
    parameters: { updatedAdTag: string },
  ): void;
  load: () => void;
  bind: (event: string, callback: () => void) => void;
  loadPlugin: (
    pluginName: { [key: string]: string },
    parameters: {
      name: string;
      data: {
        adTag: string;
        debug: boolean;
      };
    },
  ) => void;
};

export type BumpType = {
  player: (div: HTMLDivElement | null, config: PlayerConfig) => Player;
};

export type CaptionBlock = {
  type: 'caption';
  model: {
    blocks: {
      type: string;
      model: {
        blocks: {
          type: string;
          model: {
            text: string;
          };
        }[];
      };
    }[];
  };
};

export type AresMediaBlock = {
  type: 'aresMedia';
  model: {
    locator: string;
    originCode: string;
    text: string;
    title: string;
    blocks: AresMediaBlock[];
    imageUrl: string;
    format: 'audio' | 'video';
    embedding: boolean;
    versions: {
      versionId: string;
      duration: number;
      durationISO8601?: string;

      warnings?: { [key: string]: string };
    }[];
    webcastVersions: {
      versionId: string;
      duration: number;
      durationISO8601?: string;
      warnings?: { [key: string]: string };
    }[];
    smpKind: string;
  };
};

export type ClipMediaBlock = {
  type: 'clipMedia';
  model: {
    type: 'audio' | 'video';
    images: {
      source: string;
      urlTemplate: string;
    }[];
    video: {
      title: string;
      version: {
        id: string;
        duration: string;
        kind: string;
        guidance: string | null;
      };
      isEmbeddingAllowed: boolean;
    };
  };
};

export type TvMediaBlock = {
  id: 'w172zm8920nck2z';
  subType: 'episode';
  format: 'Video';
  title: '16/08/2024 GMT';
  synopses: {
    short: 'ताज़ा अंतरराष्ट्रीय, क्षेत्रीय ख़बरों और विश्लेषण के लिए देखिए बीबीसी दुनिया';
    medium: 'ताज़ा अंतरराष्ट्रीय, क्षेत्रीय ख़बरों और विश्लेषण के लिए देखिए बीबीसी दुनिया';
  };
  imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p0hfjjfk.png';
  embedding: false;
  advertising: false;
  versions: [
    {
      versionId: 'w1mskyp8ybvqtc6';
      types: ['Original'];
      duration: 1192;
      durationISO8601: 'PT19M52S';
      warnings: {};
      availableTerritories: {
        uk: true;
        nonUk: true;
        world: false;
      };
      availableFrom: 1723826990000;
      availabilityStatus: 'available';
    },
  ];
  availability: 'available';
  smpKind: 'programme';
  episodeTitle: 'दुनिया';
  type: 'media';
};

export type MediaBlock =
  | AresMediaBlock
  | ClipMediaBlock
  | CaptionBlock
  | TvMediaBlock;

export type BuildConfigProps = {
  blocks: MediaBlock[];
  counterName: string | null;
  statsDestination: string;
  producer: string | '';
  isAmp: boolean;
  lang: string;
  pageType: PageTypes;
  service: Services;
  translations?: Translations;
  adsEnabled?: boolean;
  showAdsBasedOnLocation?: boolean;
};
