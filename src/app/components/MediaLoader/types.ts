import { PageTypes, Services, Variants } from '#app/models/types/global';
import { OptimoBlock } from '#app/models/types/optimo';
import { Translations } from '#app/models/types/translations';

export type PlayerConfig = {
  autoplay?: boolean;
  preload?: string;
  product?: string;
  enableToucan: boolean;
  counterName?: string;
  appType: 'amp' | 'responsive';
  appName: `news-${Services}` | 'news';
  insideIframe?: boolean;
  externalEmbedUrl?: string;
  statsObject: {
    clipPID?: string | null;
    episodePID?: string | null;
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
    embedRights?: 'allowed';
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
};

export type ConfigBuilderProps = {
  blocks: MediaBlock[];
  basePlayerConfig: PlayerConfig;
  pageType: PageTypes;
  translations?: Translations;
  adsEnabled?: boolean;
  showAdsBasedOnLocation?: boolean;
  embedUrl?: string;
  embedded?: boolean;
};

export type PlaceholderConfig = {
  mediaInfo: MediaInfo;
  placeholderSrc: string;
  placeholderSrcset: string;
  translatedNoJSMessage: string;
};

export type ConfigBuilderReturnProps = {
  mediaType: string;
  playerConfig: PlayerConfig;
  placeholderConfig: PlaceholderConfig;
  showAds: boolean;
};

export type MediaType = 'audio' | 'video';

export type MediaInfo = {
  title: string;
  datetime?: string;
  duration?: string;
  durationSpoken?: string;
  type?: MediaType;
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
    id: string;
    embedding: boolean;
    subType: string;
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
      id: string;
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

export type SyndicationAresMediaBlock = {
  type: 'aresMedia';
  model: {
    blocks: (
      | {
          type: 'aresMediaMetadata';
          model: {
            type: 'aresMediaMetadata';
            blockId?: string;
            model: {
              id: string;
              subType: 'clip' | 'episode';
              format?: 'audio_video' | 'video' | 'audio';
              title: string;
              synopses: {
                short?: string;
                medium?: string;
                long?: string;
              };
              imageUrl: string;
              imageCopyright?: string;
              embedding: boolean;
              advertising: boolean;
              versions: {
                versionId: string;
                types: string[];
                duration: number;
                durationISO8601: string;
                warnings: {
                  short?: string;
                  medium?: string;
                  long?: string;
                };
                availableTerritories: {
                  uk: boolean;
                  nonUk: boolean;
                };
                availableUntil?: number;
                availableFrom?: number;
              }[];
              syndication: {
                destinations: string[];
              };
              smpKind?: 'radioProgramme' | 'programme';
            };
          };
        }
      | {
          type: 'image';
          model: {
            blocks: OptimoBlock[];
          };
        }
      | {
          type: 'captionText';
          model: {
            caption: string;
          };
        }
    )[];
  };
};

export type MediaBlock =
  | AresMediaBlock
  | ClipMediaBlock
  | CaptionBlock
  | SyndicationAresMediaBlock;

export type BuildConfigProps = {
  blocks: MediaBlock[];
  counterName: string | null;
  statsDestination: string;
  producer: string | '';
  isAmp: boolean;
  lang: string;
  pageType: PageTypes;
  service: Services;
  variant: Variants | null;
  translations?: Translations;
  adsEnabled?: boolean;
  showAdsBasedOnLocation?: boolean;
  embedded?: boolean;
  pathname: string;
};
