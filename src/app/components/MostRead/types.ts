import { OptimoBlock } from '#app/models/types/optimo';
import { Services, Direction } from '../../models/types/global';

export type Size = 'default' | 'small';

export type ColumnLayout = 'oneColumn' | 'twoColumn' | 'multiColumn';

export interface MostReadBaseProps {
  dir?: Direction;
  columnLayout?: ColumnLayout;
  numberOfItems: number;
}

export interface MostReadItemProps {
  dir?: Direction;
  columnLayout: ColumnLayout;
}

export interface MostReadRankProps extends MostReadBaseProps {
  service: Services;
  listIndex: number | string;
  size: Size;
  isAmp?: boolean;
}

export interface MostReadLinkProps {
  dir: Direction;
  service: Services;
  title: string;
  href: string;
  size: Size;
  eventTrackingData?: {
    componentName: string;
  };
}

type ArticleSource = 'cps' | 'optimo';

export interface CPSMostReadRecord {
  id: string;
  promo: {
    timestamp?: number;
    type?: ArticleSource | string;
    headlines?: {
      shortHeadline?: string;
      headline?: string;
    };
    locators?: {
      assetUri?: string;
      cpsUrn?: string;
      curie?: string;
    };
  };
}

export interface OptimoMostReadRecord {
  id: string;
  promo: {
    timestamp?: number;
    type?: ArticleSource | string;
    locators?: {
      canonicalUrl?: string;
      optimoUrn?: string;
    };
    headlines?: {
      seoHeadline?: string;
      promoHeadline?: {
        blocks: {
          model: {
            blocks: { model: { text: string } }[];
          };
        }[];
      };
    };
  };
}

export interface MostReadData {
  generated?: string;
  lastRecordTimeStamp: string;
  firstRecordTimeStamp?: string;
  items: {
    id: string;
    rank: number;
    href: string;
    title: string;
    timestamp: number | string;
    images?: {
      defaultPromoImage: OptimoBlock[];
    };
    indexImage?: {
      width: number;
      height: number;
      altText: string;
      originCode: string;
      locator: string;
    };
  }[];
}
