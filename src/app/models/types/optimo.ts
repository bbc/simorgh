import { ATIData } from '#app/components/ATIAnalytics/types';
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

export type ArticlePageProps = {
  content: {
    model: {
      blocks: OptimoBlock[];
    };
  };
  metadata: {
    adCampaignKeyword: string;
    allowAdvertising: boolean;
    analyticsLabels?: {
      producer: string;
    };
    atiAnalytics: ATIData;
    passport?: {
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
    topics: MetadataTopics;
    type: PageTypes;
  };
  mostRead: MostReadData;
  promo?: {
    images: {
      defaultPromoImage: {
        blocks: [];
      };
    };
  };
  secondaryColumn?: {
    topStories: [];
    features: [];
  };
  recommendations?: [];
  relatedContent?: {
    section?: {
      name: string;
    };
  };
};
