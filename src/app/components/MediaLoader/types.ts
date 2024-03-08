import { PageTypes, Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';

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

// Settings that all media players should have
export type BasePlayerConfig = {
  autoplay?: boolean;
  preload?: string;
  product?: string;
  superResponsive: boolean;
  enableToucan: boolean;
  counterName?: string;
  appType: 'amp' | 'responsive';
  appName: string;
  externalEmbedUrl?: string;
  statsObject?: { clipPID?: string };
  mediator?: { host: string };
  ui: PlayerUiConfig;
};

// Settings that are specific to the page type
export type PlayerConfig = BasePlayerConfig & {
  playlistObject: {
    title: string;
    holdingImageURL: string;
    items: Item[];
  };
};

export type Item = {
  versionID: string;
  kind: string;
  duration: number;
  live?: boolean;
};

export type Player = {
  load: () => void;
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
    versions: {
      versionId: string;
      duration: number;
      warnings?: { [key: string]: string };
    }[];
    webcastVersions: {
      versionId: string;
      duration: number;
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
        guidance: { warnings?: { [key: string]: string } } | null;
      };
    };
  };
};

export type MediaBlock = AresMediaBlock | ClipMediaBlock | CaptionBlock;

export type BuildConfigProps = {
  id: string | null;
  pageType: PageTypes;
  blocks: MediaBlock[];
  translations?: Translations;
  counterName: string | null;
  isAmp: boolean;
  service: Services;
  lang: string;
};
