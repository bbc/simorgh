import { PageTypes } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';

export type PlayerConfig = {
  product?: string;
  superResponsive: boolean;
  enableToucan: boolean;
  counterName?: string;
  playlistObject: {
    title: string;
    holdingImageURL: string;
    items: Item[];
  };
  statsObject?: { clipPID?: string };
  mediator?: { host: string };
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
    format: string;
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
    type: string;
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
};
