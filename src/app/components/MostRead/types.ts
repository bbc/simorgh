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
  listIndex: number;
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
