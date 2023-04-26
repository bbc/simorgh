export type ImageProps = {
  width: number;
  height: number;
  altText: string;
  path: string;
  locator?: string;
  originCode?: string;
  copyright?: string;
  copyrightHolder?: string;
};

export type PromoProps = {
  item: {
    headlines?: {
      promoHeadline?: object;
      headline?: string;
    };
    locators?: {
      assetUri?: string;
      canonicalUrl?: string;
    };
    images?: {
      defaultPromoImage?: object;
    };
    indexImage?: object;
    type?: string;
    cpsType?: string;
    timestamp?: number;
    serviceDatetimeLocale?: string;
  };
};

export type FormattedPromo = {
  children?: string;
  image: object | null;
  url?: string;
  footer: JSX.Element;
  eventTrackingData?: object;
};
