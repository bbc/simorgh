export type PlayerConfig = Partial<{
  product: string;
  superResponsive: boolean;
  counterName: string;
  playlistObject: {
    title: string;
    holdingImageURL: string;
    items: unknown[];
  };
  statsObject: { clipPID: string };
}>;

export type Player = {
  load: () => void;
};

export type BumpType = {
  player: (div: HTMLDivElement | null, config: PlayerConfig) => Player;
};

export type PropTypes = { holdingImageURL: string; title: string; pid: string };

declare global {
  interface Window {
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
  }
}
