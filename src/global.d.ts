import { ReverbClient } from '#models/types/eventTracking';
import { BumpType, Player } from '#app/components/MediaLoader/types';

declare global {
  interface Window {
    bbcpage:
      | {
          getName: () => Promise<string>;
          getLanguage: () => Promise<string>;
          getDestination: () => Promise<string>;
          getProducer: () => Promise<string>;
          getSection: () => Promise<string>;
          getContentId: () => Promise<string>;
          getContentType: () => Promise<string>;
          getEdition: () => Promise<string>;
          getReferrer: () => Promise<string>;
          getAdditionalProperties: () => Promise<Record<string, string>>;
          additionalProperties: {
            testDomain: string;
            trace: string;
            customVars: string;
          };
        }
      | object;
    bbcuser: {
      getHashedId: () => null;
      isSignedIn: () => Promise<boolean>;
    };
    __reverb: {
      __reverbLoadedPromise: Promise<ReverbClient>;
    };
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
    embeddedMedia: {
      api: {
        players: () => {
          bbcMediaPlayer0: Player;
        };
      };
    };
    mediaPlayers: Record<string, Player>;
    dotcom: {
      ads: {
        getAdTag: () => Promise<string>;
        resolves: { enabled: Promise[]; getAdTag: Promise[] };
      };
      bootstrap: () => void;
      cmd: { push: () => void };
    };
    sendStaticBeacon: (url: string, data?: BodyInit | null) => boolean;
    processClientDeviceAndSendStaticBeacon: (props: {
      atiUrl?: string;
      reverbUrl?: string;
      forwardingUrl?: string;
    }) => void;
  }
}

export {};
