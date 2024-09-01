import { ATIData } from '#app/components/ATIAnalytics/types';
import { Tag } from '#app/components/Metadata/types';
import { MostReadData } from '#app/components/MostRead/types';
import { PageTypes } from './global';
import { MetadataFormats, MetadataTaggings, MetadataTopics } from './metadata';

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

export type OptimoBylineBlock = {
  type: 'name' | 'role' | 'link' | 'location' | 'images';
  model: {
    blocks: object[];
  };
};

export type ArticleMetadata = {
  adCampaignKeyword: string;
  allowAdvertising: boolean;
  analyticsLabels?: {
    producer: string;
  };
  atiAnalytics: ATIData;
  passport: {
    language: string;
    home: string;
    category: {
      categoryName: string;
    };
    predicates: {
      infoClass: { value: string; type: string }[];
      primaryMediaType: { value: string; type: string }[];
      formats: MetadataFormats;
    };
    taggings: MetadataTaggings;
  };
  tags: {
    about: Tag[];
    mentions: Tag[];
  };
  topics: MetadataTopics;
  type: PageTypes;
};

export type ArticleContent = {
  model: {
    blocks: OptimoBlock[];
  };
};

export type ArticlePromo = {
  headlines: {
    headline?: string;
    seoHeadline: string;
  };
  images: {
    defaultPromoImage: {
      blocks: OptimoRawImageBlock[];
    };
  };
};

export type SecondaryColumn = {
  topStories: [];
  features: [];
};

export type Recommendation = object;

export type RelatedContent = {
  section: {
    name: string;
  };
};

export type Article = {
  content: ArticleContent;
  metadata: ArticleMetadata;
  mostRead: MostReadData;
  promo: ArticlePromo;
  secondaryColumn?: SecondaryColumn;
  recommendations?: Recommendation[];
  relatedContent?: RelatedContent;
};
