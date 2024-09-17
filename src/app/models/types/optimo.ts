import { ATIData } from '#components/ATIAnalytics/types';
import { MetadataTaggings } from './metadata';

export type OptimoBlock = {
  type: string;
  model: object;
  id?: string;
  position?: number[];
  blockGroupType?: string;
  blockGroupIndex?: number;
};

export type OptimoRawImageBlock = {
  type: 'rawImage';
  model: {
    locator: string;
    originCode: string;
  };
};

export type OptimoImageBlock = {
  type: 'image';
  model: {
    blocks: [OptimoRawImageBlock];
  };
};

export type ArticleMetadata = {
  passport: {
    language: string;
    home: string;
    taggings: MetadataTaggings;
    predicates: {
      infoClass: { value: string; type: string }[];
      primaryMediaType: { value: string; type: string }[];
    };
    category?: {
      categoryName: string;
    };
  };
  analyticsLabels?: {
    producer: string;
    contentId: string;
  };
  atiAnalytics: ATIData;
  type: string;
  allowAdvertising?: boolean;
};

export type ArticleContent = {
  model: {
    blocks: OptimoBlock[];
  };
};

export type Article = {
  metadata: ArticleMetadata;
  content: ArticleContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promo?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedContent?: any;
};
