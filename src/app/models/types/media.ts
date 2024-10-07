export type MediaType = 'audio_video' | 'audio' | 'video' | 'liveRadio';

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

export type LiveRadioHeadingBlock = {
  type: 'heading';
  text: string;
};

export type LiveRadioParagraphBlock = {
  type: 'paragraph';
  text: string;
};

export type LiveRadioVersionBlock = {
  id: string;
  type: 'version';
  subType: string;
  format: string;
  externalId: string;
  duration: string;
  caption: string;
  embedding: boolean;
  available: boolean;
  live: boolean;
};

export type LiveRadioBlock = {
  type: 'liveRadio';
  model: [
    LiveRadioHeadingBlock,
    LiveRadioParagraphBlock,
    LiveRadioVersionBlock,
  ];
};

export type MediaOverrides = {
  model: {
    language?: string;
    pageIdentifierOverride?: string;
    pageTitleOverride?: string;
  };
  type: 'mediaOverrides';
};
