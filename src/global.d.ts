import { ReverbClient } from '#models/types/eventTracking';
import { BumpType } from '#app/components/MediaLoader/types';

declare global {
  interface Window {
    __reverb: {
      __reverbLoadedPromise: Promise<ReverbClient>;
    };
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
    mediaPlayers: Record<string, Player>;
    dotcom: {
      ads: {
        getAdTag: () => Promise<string>;
        resolves: { enabled: Promise[]; getAdTag: Promise[] };
      };
      bootstrap: () => void;
      cmd: { push: () => void };
    };
    sendBeaconLite: (url: string, data?: BodyInit | null) => boolean;
    processClientDeviceAndSendLite: (url: string) => void;
  }
}

export {};
