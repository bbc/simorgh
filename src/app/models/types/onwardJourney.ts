export type Recommendation = {
  id: string;
  title: string;
  image: {
    width: number;
    height: number;
    altText: string;
    copyrightHolder: string;
    originCode: string;
    locator: string;
  };
  href: string;
};

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
