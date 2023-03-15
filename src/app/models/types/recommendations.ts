export type RecommendationsPromo = {
  headlines: {
    headline: string;
    promoHeadline: {
      blocks: object[];
    };
  };
  locators: {
    assetUri: string;
    canonicalUrl: string;
  };
  indexImage?: {
    width: number;
    height: number;
    altText: string;
    copyrightHolder: string;
    originCode: string;
    locator: string;
  };
  images: {
    defaultPromoImage: {
      blocks: [
        {
          type: string;
        },
      ];
    };
  };
};
