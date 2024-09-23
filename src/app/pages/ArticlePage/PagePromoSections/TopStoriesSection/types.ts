import { MetadataTaggings } from '#app/models/types/metadata';
import { OptimoBlock } from '#app/models/types/optimo';

export type TopStoryItem = {
  contentType?: string;
  uri?: string;
  name?: string;
  headline: string;
  destinationUrl: string;
  isLive: boolean;
  image: {
    id: string;
    subType: string;
    href: string;
    path: string;
    height: number;
    width: number;
    altText: string;
    copyrightHolder: string;
    originCode: string;
    type: string;
  };
  media: {
    format: string;
    duration: string;
  };
  serviceIdentifier: string;
  byline: {
    name: string;
    title: string;
    persons: {
      name: string;
      function: string;
      twitterName: string;
    }[];
  };
  passport: {
    category: {
      categoryId: string;
      categoryName: string;
    };
    taggings: MetadataTaggings;
  };
  cpsType: string;
  indexImage: {
    id: string;
    subType: string;
    href: string;
    path: string;
    height: number;
    width: number;
    altText: string;
    copyrightHolder: string;
    type: string;
  };
  options: {
    isBreakingNews: boolean;
    isFactCheck: boolean;
  };
  prominence: string;
  section: {
    subType: string;
    name: string;
    uri: string;
    type: string;
  };
  includeComments: boolean;
  id: string;
  locators: {
    optimoUrn: string;
    canonicalUrl: string;
    assetUri: string;
    cpsUrn: string;
    curie: string;
    assetId: string;
  };
  timestamp: number;
  suitableForSyndication: boolean;
  language: string;
  headlines: {
    overtyped: string;
    headline: string;
    seoHeadline: string;
    promoHeadline: {
      blocks: OptimoBlock[];
    };
  };
  images: object;
  summary: {
    blocks: OptimoBlock[];
  };
  type: 'optimo' | 'cps' | 'tipo-live' | 'link';
};
