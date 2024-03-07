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

export type AresMediaBlock = {
  type: string;
  model: Partial<{
    locator: string;
    text: string;
    title: string;
    blocks: AresMediaBlock[];
    imageUrl: string;
    versions: {
      versionId: string;
      duration: number;
      warnings?: { [key: string]: string };
    }[];
    smpKind: string;
  }>;
};

export type ClipMediaBlock = {
  type: string;
  model: Partial<{
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
        guidance: object | null;
      };
    };
  }>;
};

export type CaptionsBlock = {
  type: string;
  model: {
    blocks: {
      type: string;
      model: {
        text: string;
      };
    }[];
  };
};

export type BuildConfigProps = {
  id: string | null;
  pageType: PageTypes;
  blocks: ClipMediaBlock[] | AresMediaBlock[];
  translations?: Translations;
  counterName: string | null;
};
