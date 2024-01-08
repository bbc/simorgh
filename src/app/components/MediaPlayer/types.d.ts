export type PlayerConfig = {
  product: string;
  superResponsive: true;
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
  id: string;
  pageType: string;
  blocks: MediaBlock[];
  counterName?: string;
};

export type VideoPlayerProps = Props & { isVisible: boolean };

declare global {
  interface Window {
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
  }
}
