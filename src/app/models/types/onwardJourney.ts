import { OptimoBlock } from './optimo';

export type OptimoRecommendation = {
  headlines: {
    seoHeadline?: string;
    promoHeadline: {
      blocks: OptimoBlock[];
    };
  };
  locators: {
    optimoUrn: string;
    canonicalUrl: string;
  };
  summary: {
    blocks: OptimoBlock[];
  };
  images: {
    defaultPromoImage: {
      blocks: OptimoBlock[];
    };
  };
  timestamp: number;
  suitableForSyndication?: boolean;
  language?: string;
  passport?: object;
  id?: string;
  type?: string;
};

export type CpsRecommendation = {
  headlines: {
    shortHeadline?: string;
    headline: string;
  };
  locators: {
    assetUri: string;
    cpsUrn?: string;
  };
  summary: string;
  timestamp: number;
  indexImage: IndexImage;
  cpsType?: string;
  id?: string;
  type?: string;
};

export type Recommendation = OptimoRecommendation | CpsRecommendation;

export type TopStoriesOnwardJourney = {
  headlines: Headlines;
  locators: Locators;
  summary: string;
  timestamp: number;
  language: string;
  byline: Byline;
  passport: Passport;
  cpsType: string;
  indexImage: IndexImage;
  options: {
    isBreakingNews: boolean;
    isFactCheck: boolean;
  };
  prominence: string;
  id: string;
  type: string;
};

export type FeaturesAnalysisOnwardJourney = {
  name: string;
  summary: string;
  indexImage: IndexImage;
  uri: string;
  aresUrl: string;
  contentType: string;
  assetTypeCode: string;
  timestamp: number;
  type: string;
};

export type Headlines = {
  headline: string;
};

export type Locators = {
  assetUri: string;
  curieCpsUrn: string;
  assetId: string;
  cpsUrn: string;
  curie: string;
};

export type Byline = {
  name: string;
  title: string;
  persons?:
    | {
        name: string;
        function: string;
      }[]
    | null;
};

export type Passport = {
  campaigns?:
    | {
        campaignId: string;
        campaignName: string;
      }[]
    | null;
  taggings?: null[] | null;
};

export type IndexImage = {
  id: string;
  subType: string;
  href: string;
  path: string;
  height: number;
  width: number;
  altText: string;
  copyrightHolder: string;
  originCode?: string;
  allowSyndication?: boolean;
  type: string;
  caption?: string;
};
