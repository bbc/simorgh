import { Services } from '../../models/types/global';

export type Direction = 'rtl' | 'ltr';

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
    timestamp: number;
    type?: ArticleSource;
    headlines: {
      shortHeadline: string;
    };
    locators: {
      assetUri: string;
    };
  };
}

export interface OptimoMostReadRecord {
  id: string;
  promo: {
    timestamp: number;
    type?: ArticleSource;
    locators: {
      canonicalUrl: string;
    };
  };
  headlines: {
    promoHeadline: {
      blocks: {
        model: {
          blocks: { model: { text: string } }[];
        };
      }[];
    };
  };
}

export interface MostReadData {
  lastRecordTimeStamp: string;
  firstRecordTimeStamp?: string;
  generated?: string;
  totalRecords?: number;
  records: (OptimoMostReadRecord | CPSMostReadRecord)[];
}
