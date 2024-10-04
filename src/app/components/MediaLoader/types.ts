import { PageTypes, Services } from '#app/models/types/global';
import {
  MediaType,
  OnDemandAudioBlock,
  OnDemandTVBlock,
  LiveRadioBlock,
  MediaOverrides,
} from '#app/models/types/media';
import { OptimoImageBlock } from '#app/models/types/optimo';
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
  embeddedOffsite?: boolean;
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
    holdingImageURL?: string;
    items: PlaylistItem[] | LegacyPlayListItem[];
    guidance?: string;
    embedRights?: 'allowed';
    liveRewind?: boolean;
    simulcast?: boolean;
  };
};

export type PlayerUiConfig = {
  skin?: 'audio' | 'classic';
  colour?: string;
  foreColour?: string;
  baseColour?: string;
  colourOnBaseColour?: string;
  fallbackBackgroundColour?: string;
  controls?: { enabled: boolean; volumeSlider?: boolean };
  locale?: { lang: string };
  subtitles?: { enabled: boolean; defaultOn: boolean };
  fullscreen?: { enabled: boolean };
};

export type PlaylistItem = {
  versionID?: string;
  kind: string;
  duration?: number;
  live?: boolean;
  embedRights?: 'allowed';
  vpid?: string;
  serviceID?: string;
};

export type LegacyPlayListItem = {
  href: string;
  kind: string;
};

export type ConfigBuilderProps = {
  id: string;
  blocks: MediaBlock[];
  basePlayerConfig: PlayerConfig;
  pageType: PageTypes;
  translations?: Translations;
  adsEnabled?: boolean;
  showAdsBasedOnLocation?: boolean;
  embedUrl?: string;
  embedded?: boolean;
  lang: string;
};

export type Orientations = 'landscape' | 'portrait';

export type PlaceholderConfig = {
  mediaInfo: MediaInfo;
  placeholderSrc: string;
  placeholderSrcset: string;
  translatedNoJSMessage: string;
};

export type ConfigBuilderReturnProps = {
  mediaType: MediaType;
  playerConfig: PlayerConfig;
  placeholderConfig?: PlaceholderConfig;
  showAds: boolean;
  ampIframeUrl?: string;
  orientation?: Orientations;
};

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
    blocks: [AresMediaMetadataBlock | OptimoImageBlock];
  };
};

export type AresMediaMetadataBlock = {
  type: 'aresMediaMetadata';
  model: {
    firstPublished?: string;
    live?: boolean;
    locator: string;
    originCode: string;
    text: string;
    title: string;
    synopses: {
      short: string;
    };
    imageUrl: string;
    format: MediaType;
    id: string;
    embedding: boolean;
    subType: string;
    versions: {
      availableFrom?: string;
      versionId: string;
      types: string[];
      duration: number;
      durationISO8601?: string;
      warnings?: { [key: string]: string };
    }[];
    webcastVersions: {
      versionId: string;
      duration: number;
      types: string[];
      durationISO8601?: string;
      warnings?: { [key: string]: string };
    }[];
    smpKind: string;
  };
};

export type ClipMediaBlock = {
  type: 'clipMedia';
  model: {
    type: MediaType;
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

export type LegacyMediaBlock = {
  type: 'legacyMedia';
  content: {
    id: string;
    subType: string;
    format: MediaType;
    image: {
      id: string;
      subType: string;
      href: string;
      path: string;
      height: number;
      width: number;
      altText: string;
      copyrightHolder: string;
    };
    aspectRatio: string;
    live: boolean;
    href: string;
    playlist: {
      format: string;
      url: string;
    }[];
  };
};

export type MediaBlock =
  | AresMediaBlock
  | ClipMediaBlock
  | LegacyMediaBlock
  | LiveRadioBlock
  | OnDemandTVBlock
  | OnDemandAudioBlock
  | CaptionBlock
  | MediaOverrides;

export type BuildConfigProps = {
  id: string;
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
  embedded?: boolean;
};
