export type MetadataTaggings = { predicate: string; value: string }[];

export type MetadataFormats = {
  value: string;
  thingLabel: string;
  thingUri: string;
  thingId: string;
  thingType: string[];
  thingSameAs: string[];
  thingEnglishLabel: string;
  thingPreferredLabel: string;
  thingLabelLanguage: string;
  type: string;
}[];

export type MetadataTopics = {
  topicName: string;
  topicId: string;
  subjectList: {
    subjectId: string;
    subjectType: string;
  }[];
  curationList: {
    curationId: string;
    curationType: string;
    visualProminence: string;
  }[];
  types: string[];
  home: string;
  topicUrl: string;
}[];
