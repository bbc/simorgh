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

export type MediaBlock = {
  type: string;
  model: Partial<{
    locator: string;
    text: string;
    title: string;
    blocks: MediaBlock[];
    imageUrl: string;
    versions: {
      versionId: string;
      duration: number;
      warnings?: { [key: string]: string };
    }[];
    smpKind: string;
  }>;
};

export type Props = {
  className: string;
  blocks: MediaBlock[];
};

export type BuildConfigProps = {
  id: string | null;
  pageType: PageTypes;
  blocks: MediaBlock[];
  translations: Translations;
  counterName: string | null;
};
