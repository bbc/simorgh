export type MediaType = 'audio_video' | 'audio' | 'video';

export type OnDemandMediaModel = {
  id: string;
  subType: 'episode';
  format: 'Video' | 'Audio';
  title: string;
  synopses: {
    short: string;
    medium: string;
  };
  imageUrl: string;
  embedding: boolean;
  advertising: boolean;
  versions: [
    {
      versionId: string;
      types: string[];
      duration: number;
      durationISO8601: string;
      warnings: Record<string, string>;
      availableTerritories: {
        uk: boolean;
        nonUk: boolean;
        world: boolean;
      };
      availableFrom: number;
      availabilityStatus: string;
    },
  ];
  availability: string;
  smpKind: string;
  episodeTitle: string;
  type: MediaType;
};

export type OnDemandTVBlock = {
  type: 'tv';
  model: OnDemandMediaModel;
};

export type OnDemandAudioBlock = {
  type: 'audio';
  model: OnDemandMediaModel;
};
