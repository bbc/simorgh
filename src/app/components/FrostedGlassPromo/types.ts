import { EventTrackingBlock } from '../../models/types/eventTracking';

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
      defaultPromoImage?: {
        blocks?: {
          model: object;
        }[];
      };
    };
    indexImage?: ImageProps;
    type?: string;
    cpsType?: string;
    timestamp?: number;
    serviceDatetimeLocale?: string;
    uri?: string;
    name?: string;
    assetTypeCode?: string;
  };
  eventTrackingData?: EventTrackingBlock;
  minimumContrast?: number;
  paletteSize?: number;
  isAmp?: boolean;
};

export type FormattedPromo = {
  children?: string;
  image: object | null;
  url?: string;
  footer: JSX.Element;
  eventTrackingData?: EventTrackingBlock['block'];
};
