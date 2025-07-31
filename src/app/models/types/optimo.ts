import { ATIData } from '#app/components/ATIAnalytics/types';
import { Tag } from '#app/components/Metadata/types';
import { MostReadData } from '#app/components/MostRead/types';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { LatestMedia } from '#app/pages/MediaArticlePage/PagePromoSections/LatestMediaSection/types';
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
    width: number;
    height: number;
    copyrightHolder: string;
    suitableForSyndication: boolean;
  };
};

export type OptimoImageBlock = {
  type: 'image';
  model: {
    blocks: [OptimoRawImageBlock];
  };
};

export type OptimoAltTextBlock = {
  type: 'altText';
  model: {
    blocks: OptimoBlock[];
  };
};

export type OptimoBylineContributorMetadataBlock = {
  type: 'name' | 'role' | 'link' | 'location' | 'images';
  model: {
    blocks: OptimoBlock[];
  };
};

export type OptimoBylineContributorBlock = {
  type: 'contributor';
  model: {
    topicId?: string;
    topicUrl?: string;
    blocks: OptimoBylineContributorMetadataBlock[];
  };
};

export type OptimoBylineBlock = {
  type: 'byline';
  model: {
    blocks: OptimoBylineContributorBlock[];
  };
};

export type ArticleMetadata = {
  adCampaignKeyword: string;
  allowAdvertising: boolean;
  analyticsLabels?: {
    producer: string;
    contentId: string;
  };
  atiAnalytics: ATIData;
  consumableAsSFV: boolean;
  firstPublished: number;
  lastPublished: number;
  id: string;
  language: string;
  options?: {
    allowAdvertising?: boolean;
  };
  passport: {
    language: string;
    home: string;
    genre: string;
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
  images?: {
    defaultPromoImage: {
      blocks: [OptimoRawImageBlock | OptimoAltTextBlock];
    };
  };
  summary?:
    | string
    | {
        blocks: OptimoBlock[];
      };
};

export type SecondaryColumn = {
  topStories: TopStoryItem[];
  features: object[];
  latestMedia?: LatestMedia[];
};

export type Recommendation = {
  headlines: object;
  locators: object;
};

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
